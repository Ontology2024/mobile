import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { COLORS } from "@/constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { AIConfigs } from "@/constants/AIConfigs";
import { router, useLocalSearchParams } from "expo-router";
import { Audio } from 'expo-av';
import { IOSAudioQuality, IOSOutputFormat, Recording } from "expo-av/build/Audio";
import { OPENAI_API_KEY } from "@/env";
import WavEncoder from 'wav-encoder';
import base64 from 'base64-js';
import * as FileSystem from 'expo-file-system';

const callbottomImg = require("@/assets/images/callbottom.png");

const convertToBase64 = async (fileUri: string): Promise<string> => {
  // Fetch the file as a blob
  const response = await fetch(fileUri);
  const blob = await response.blob();

  // Convert the blob to base64 string
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = (reader.result as string).split(',')[1]; // Remove the data URL prefix
      resolve(base64data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob); // Read the blob as a Data URL
  });
};

async function playPcmAudio(base64PcmData): Promise<void> {
  try {
    // Decode base64 PCM data
    const pcmData = base64.toByteArray(base64PcmData);

    // Convert PCM data to Float32Array
    const samples = new Float32Array(pcmData.length / 2);
    for (let i = 0; i < samples.length; i++) {
      const low = pcmData[i * 2];
      const high = pcmData[i * 2 + 1];
      const val = (high << 8) | low;
      samples[i] = (val >= 32768 ? val - 65536 : val) / 32768;
    }

    // Encode to WAV format
    const wavData = await WavEncoder.encode({
      sampleRate: 24000,
      channelData: [samples],
    });

    // Convert WAV data to base64
    const wavBase64 = base64.fromByteArray(new Uint8Array(wavData));

    // Write WAV data to a temporary file
    const fileUri = FileSystem.cacheDirectory + 'temp.wav';
    await FileSystem.writeAsStringAsync(fileUri, wavBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Load and play the audio
    const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
    const result = new Promise<undefined>(resolve => sound.setOnPlaybackStatusUpdate(status => {
      if ('didJustFinish' in status && status.didJustFinish) resolve(undefined);
    }))
    await sound.playAsync();

    return result;
  } catch (error) {
    console.error('Error playing PCM audio:', error);
  }
}

export default function call() {
  const { configs } = useContext(AIConfigs);
  const { callee } = useLocalSearchParams<{ callee: string }>();
  const selected = configs.find(({ name }) => name === callee)!;
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const idleStartTime = useRef<number | null>(null);
  const socket = useRef<WebSocket | null>(null);
  const audioWaiter = useRef<() => void>(() => {});

  async function startRecording(isCancelled: () => boolean): Promise<Recording> {
    if (permissionResponse === null || permissionResponse.status !== 'granted') {
      await requestPermission();
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync({
      ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
      ios: {
        audioQuality: IOSAudioQuality.HIGH,
        bitDepthHint: 16,
        bitRate: 384000,
        extension: ".raw",
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        numberOfChannels: 1,
        sampleRate: 24000,
        outputFormat: IOSOutputFormat.LINEARPCM
      }
    }, async status => {

      if (status.isDoneRecording) return;
      if (!status.isRecording) return;
      if (!recording) return;

      if (status.isRecording && isCancelled()) {
        await recording.stopAndUnloadAsync();
      }

      if (typeof status.metering === 'number') {
        if (status.metering < -25) {
          if (idleStartTime.current === null) idleStartTime.current = Date.now();
          if (Date.now() - idleStartTime.current > 2000) {
            await recording.stopAndUnloadAsync()

            if (socket.current) {
              socket.current.send(JSON.stringify({
                type: "input_audio_buffer.append",
                audio: await convertToBase64(recording.getURI()!)
              }))

              socket.current.send(JSON.stringify({
                type: "input_audio_buffer.commit"
              }))

              socket.current.send(JSON.stringify({
                type: 'response.create',
              }));
            }

            audioWaiter.current = () => { audioWaiter.current = () => {}; startRecording(isCancelled); }
          }
        }
      }
    })
    idleStartTime.current = null;

    return recording;
  }

  useEffect(() => {
    let cancelled = false;

    setTimeout(() => startRecording(() => cancelled), 1500);

    return () => { cancelled = true };
  }, []);

  useEffect(() => {
    //@ts-ignore
    const ws: WebSocket = new WebSocket("wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01", null, {
      headers: {
        "Authorization": "Bearer " + OPENAI_API_KEY,
        "OpenAI-Beta": "realtime=v1",
      },
    });

    ws.onopen = () => {
      console.log("Connected to server.");

      ws.send(JSON.stringify({
        type: "session.update",
        session: {
          instructions: `
            당신은 AI 상담사입니다. 당신의 임무는 당신과 지금 통화하고 있는 상대방이 목적지까지 편안하게 갈 수 있게끔 대화를 이끌어주고 평정심을 찾아주는 데에 있습니다.
            친절하고 부드럽게, 일상적인 편안한 이야기를 이어나가며 상대방이 목적지에 도착하기 전까지 즐겁게 걸을 수 있도록 도와주세요. 가볍고 사소한 것들을 물으며 주도적으로 대화를 진행해주세요.
          `,
          voice: "alloy",
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
          input_audio_transcription: null,
          turn_detection: null,
        }
      }))

      socket.current = ws;
    }

    let delta = "";

    ws.onmessage = async ({ data }) => {
      try {
        const event = JSON.parse(data);

        if (event.type === "error") console.error(event);

        if (event.type === "response.audio.delta") { 
          delta += event.delta;
         }

        if (event.type === "response.audio.done") { 
           const temp = delta;
           delta = "";
           await playPcmAudio(temp);
           audioWaiter.current();
         }

      } catch (error) {
        console.log(error);
      }
    };
  }, [])

  return (
    <View style={Styles.container}>
      <View style={{ marginTop: 29, marginLeft: -100, gap: 18 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
          <Text style={{ color: COLORS.PURPLE, fontSize: 26, fontWeight: "700" }}>{selected.name}</Text>
        </View>
        <Text style={{ color: "#939393", fontSize: 14, fontWeight: "400" }}>
          {selected.keywords.map(keyword => `#${keyword}`).join(' ')}
        </Text>
      </View>

      <View style={{ position: "absolute", width: "100%", height: "100%", alignItems: "center", top: 150 }}>
        <Image source={selected.character} style={{ width: "80%", height: "50%" }} />
      </View>

      <TouchableOpacity activeOpacity={0.9} style={Styles.callBtn} onPress={() => { router.navigate("/main") }}>
        <MaterialIcons name="call-end" size={36} color="white" />
      </TouchableOpacity>

      <View style={Styles.footer}>
        <TouchableOpacity activeOpacity={0.9} style={Styles.msgBtn}>
          <MaterialCommunityIcons name="message-processing" size={24} color={COLORS.PURPLE} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={Styles.settingBtn}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Image source={callbottomImg} style={Styles.bottombar} />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  callBtn: {
    position: "relative",
    top: 480,
    width: 86,
    height: 86,
    borderRadius: 100,
    backgroundColor: "#FF566A",
    justifyContent: "center",
    alignItems: "center",
    padding: 13,
  },
  msgBtn: {
    width: 56,
    height: 56,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
  },
  settingBtn: {
    width: 56,
    height: 56,
    backgroundColor: "#9B77FF",
    borderRadius: 20,
    padding: 16,
  },
  footer: {
    position: "relative",
    top: 460,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  bottombar: {
    width: "100%",
    height: "18%",
    position: "absolute",
    bottom: 0,
    marginBottom: -35,
  },
});
