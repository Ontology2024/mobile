import React, { useEffect, useState, useRef, useContext } from "react";
import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { APP_KEY } from "@/env"; // env.ts 파일에서 APP_KEY를 가져옴
import * as location from "expo-location";
import { MapSearchParams } from "@/constants/MapSearchParams";

export default function Tmap() {
  const webviewRef = useRef<WebView>(null);
  const [initalized, setInitalized] = useState(false);
  const { start, dest } = useContext(MapSearchParams);
  const startlocRef = useRef({ startlat: null, startlon: null });
  const destlocRef = useRef({ destlat: null, destlon: null });

  // 출발지 위도, 경도 가져오기
  useEffect(() => {
    const startPOIs = async () => {
      try {
        const response = await fetch(
          `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${start}&searchType=all&page=1&count=1&resCoordType=WGS84GEO&multiPoint=N&searchtypCd=A&reqCoordType=WGS84GEO&poiGroupYn=N`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              appKey: APP_KEY,
            },
          }
        );

        const data = await response.json();
        const loc = data.searchPoiInfo.pois.poi[0];

        startlocRef.current = { startlat: loc.noorLat, startlon: loc.noorLon };
        console.log("start: ", startlocRef.current);
      } catch (error) {
        console.error("Error fetching POIs:", error);
      }
    };
    if (start) startPOIs();
  }, [start]);

  // 목적지 위도,경도값 받아오기
  useEffect(() => {
    const destPOIs = async () => {
      try {
        const response = await fetch(
          `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${dest}&searchType=all&page=1&count=20&resCoordType=WGS84GEO&multiPoint=N&searchtypCd=A&reqCoordType=WGS84GEO&poiGroupYn=N`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              appKey: APP_KEY,
            },
          }
        );

        const data = await response.json();
        const loc = data.searchPoiInfo.pois.poi[0];

        destlocRef.current = { destlat: loc.noorLat, destlon: loc.noorLon };
        console.log("dest: ", destlocRef.current);
      } catch (error) {
        console.error("Error fetching POIs:", error);
      }
    };

    if (dest) destPOIs();
  }, [dest]);

  // 현재 위치 실시간 업데이트
  useEffect(() => {
    if (!initalized) return;
    let subscription: location.LocationSubscription | null = null;

    (async () => {
      const { granted } = await location.requestForegroundPermissionsAsync();
      if (granted) {
        subscription = await location.watchPositionAsync(
          {
            accuracy: location.Accuracy.High, // 높은 정확도
          },
          ({ coords: { latitude, longitude } }) => {
            if (webviewRef.current) {
              webviewRef.current.injectJavaScript(`updateMarkerPos(${latitude}, ${longitude});`);
            }
          }
        );
      }
    })();

    return () => subscription?.remove();
  }, [initalized]);

  // 방향 실시간 업데이트
  useEffect(() => {
    if (!initalized) return;
    let subscription: location.LocationSubscription | null = null;

    (async () => {
      const { granted } = await location.requestForegroundPermissionsAsync();
      if (granted) {
        subscription = await location.watchHeadingAsync((newHeading) => {
          const heading = newHeading.trueHeading || newHeading.magHeading;
          if (webviewRef.current) {
            webviewRef.current.injectJavaScript(`updateMarkerHeading(${heading});`);
          }
        });
      }
    })();

    return () => subscription?.remove();
  }, [initalized]);

  // 경로 가져오기
  useEffect(() => {
    if (startlocRef.current.startlat && destlocRef.current.destlat) {
      let resultData = [];
      fetch("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          appKey: "dpmSPcl4sB5hZ0p4GSfUI5hp2RO8ph5MQHBXFt68",
        },
        body: JSON.stringify({
          startX: startlocRef.current.startlon,
          startY: startlocRef.current.startlat,
          endX: destlocRef.current.destlon,
          endY: destlocRef.current.destlat,
          startName: "시작점",
          endName: "도착점",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          resultData = data.features;
        })
        .catch((error) => console.error("Error drawing route:", error));
    }

    if (webviewRef.current) {
      webviewRef.current.injectJavaScript(`
          drawLine(${startlocRef.current.startlat}, ${startlocRef.current.startlon}, ${destlocRef.current.destlat}, ${destlocRef.current.destlon});
        `);
    }
  }, [startlocRef.current.startlat, destlocRef.current.destlat]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={["*"]}
        source={{ html: TMAP_VIEW }}
        javaScriptEnabled
        domStorageEnabled
        style={styles.webview}
        contentInset={{ top: -5, right: 0, bottom: 0, left: 0 }}
        scrollEnabled={false}
        onLoad={async () => {
          if (webviewRef.current === null) return;

          const { granted } = await location.requestForegroundPermissionsAsync();

          if (granted) {
            const {
              coords: { latitude, longitude, heading },
            } = await location.getCurrentPositionAsync();

            webviewRef.current.injectJavaScript(`init(${latitude}, ${longitude}, ${heading ?? 0});`);
            setInitalized(true);
          }
        }}
      />
    </View>
  );
}

const TMAP_VIEW = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Tmap</title>
    <script src="https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=${APP_KEY}"></script>
    <script type="text/javascript">
      var map;
      var currentLocationMarker;

      var currentLat = 37.566481622437934;
      var currentLong = 126.98502302169841;

      // 지도 및 마커 초기화 (한 번만 실행)
      function init(lat, long, heading) {
        currentLat = lat;
        currentLong = long;
        map = new Tmapv3.Map("map_div", {
          center: new Tmapv3.LatLng(lat, long),
          width: "100vw",
          height: "100vh",
          zoom: 18,
        });
        // 마커 생성
        currentLocationMarker = new Tmapv3.Marker({
          position: new Tmapv3.LatLng(lat, long),
          iconHTML: \`
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 18 40" fill="none" id="user-marker">
              <g clip-path="url(#clip0_1127_936)">
                <path d="M0 0H26L14.383 22H11.8936L0 0Z" fill="url(#paint0_linear_1127_936)" fill-opacity="0.35"/>
                <path d="M21.5 27C21.5 22.3056 17.6944 18.5 13 18.5C8.30558 18.5 4.5 22.3056 4.5 27C4.5 31.6944 8.30558 35.5 13 35.5C17.6944 35.5 21.5 31.6944 21.5 27Z" fill="white"/>
                <path d="M21.5 27C21.5 22.3056 17.6944 18.5 13 18.5C8.30558 18.5 4.5 22.3056 4.5 27C4.5 31.6944 8.30558 35.5 13 35.5C17.6944 35.5 21.5 31.6944 21.5 27Z" stroke="#D9D9D9"/>
                <path d="M21.5 27C21.5 22.3056 17.6944 18.5 13 18.5C8.30558 18.5 4.5 22.3056 4.5 27C4.5 31.6944 8.30558 35.5 13 35.5C17.6944 35.5 21.5 31.6944 21.5 27Z" stroke="black" stroke-opacity="0.2"/>
                <path d="M21.5 27C21.5 22.3056 17.6944 18.5 13 18.5C8.30558 18.5 4.5 22.3056 4.5 27C4.5 31.6944 8.30558 35.5 13 35.5C17.6944 35.5 21.5 31.6944 21.5 27Z" stroke="#6028FF"/>
                <path d="M13 33.5455C16.615 33.5455 19.5455 30.615 19.5455 27C19.5455 23.3851 16.615 20.4546 13 20.4546C9.38509 20.4546 6.45459 23.3851 6.45459 27C6.45459 30.615 9.38509 33.5455 13 33.5455Z" fill="#D9D9D9"/>
                <path d="M13 33.5455C16.615 33.5455 19.5455 30.615 19.5455 27C19.5455 23.3851 16.615 20.4546 13 20.4546C9.38509 20.4546 6.45459 23.3851 6.45459 27C6.45459 30.615 9.38509 33.5455 13 33.5455Z" fill="black" fill-opacity="0.2"/>
                <path d="M13 33.5455C16.615 33.5455 19.5455 30.615 19.5455 27C19.5455 23.3851 16.615 20.4546 13 20.4546C9.38509 20.4546 6.45459 23.3851 6.45459 27C6.45459 30.615 9.38509 33.5455 13 33.5455Z" fill="#6028FF"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_1127_936" x1="13" y1="0" x2="13" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#6028FF" stop-opacity="0"/>
                  <stop offset="1" stop-color="#6028FF"/>
                </linearGradient>
                <clipPath id="clip0_1127_936">
                  <rect width="26" height="36" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          \`,
          iconSize: new Tmapv3.Size(60, 80),
          anchorPoint: new Tmapv3.Point(30, 40),
          map,
        });
      }

      // 마커 위치 및 방향 업데이트 함수
      function updateMarkerPos(latitude, longitude) {
        currentLat = latitude;
        currentLong = longitude;

        var newPosition = new Tmapv3.LatLng(latitude, longitude);
      
        // 마커가 존재할 때만 위치 및 방향 업데이트
        if (currentLocationMarker) {
          currentLocationMarker.setPosition(newPosition);
        }
        // 맵의 중앙을 새 좌표로 이동
        if (map) {
          map.setCenter(newPosition);
        }
      }

      function updateMarkerHeading(heading) {
        // 마커가 존재할 때만 방향 업데이트
        if (currentLocationMarker) {
          document.getElementById("user-marker").style.transform = 'rotate(' + heading + 'deg)';
        }
      }
      
      function Move() {
        var lonlat = new Tmapv3.LatLng(currentLat, currentLong);
        map.setCenter(lonlat);
        map.setZoom(19);
      }
      
      function drawLine(startlat, startlon, destlat, destlon) {
        // 출발 마커
        marker_s = new Tmapv3.Marker({
          position: new Tmapv3.LatLng(startlat, startlon),
          iconSize: new Tmapv3.Size(24, 38),
          map: map,
        });

        // 도착 마커
        marker_e = new Tmapv3.Marker({
          position: new Tmapv3.LatLng(destlat, destlon),
          iconSize: new Tmapv3.Size(24, 38),
          map: map,
        });

        var drawInfoArr = [];

        resultData.forEach(item => {
          var geometry = item.geometry;
          if (geometry.type === "LineString") {
            geometry.coordinates.forEach(coord => {
              var latlng = new Tmapv3.LatLng(coord[1], coord[0]);
              drawInfoArr.push(latlng);
            });
          }
        });

        var polyline = new Tmapv3.Polyline({
          path: drawInfoArr,
          strokeColor: "#FF0000",
          strokeWeight: 6,
          map: map
        });
        resultdrawArr.push(polyline_);
      }
    </script>
    <style>
      button {
        position: absolute;
        bottom: 110px;
        right: 30px;
        background-color: white;
        padding: 20px;
        border: none;
        outline: none;
        border-radius: 100%;
        box-shadow: 2px 4px 20px 0px rgba(0, 0, 0, 0.15);
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
        -webkit-user-select: none;
      }
      svg {
        pointer-events: none;
        user-drag: none;
      }
    </style>
    </head>
    <body>
      <div id="map_div" style="width:100%;height:100%;"></div>
      <button onclick="Move()">
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3.28169C16.9842 3.64113 20.3589 7.01581 20.7183 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20.7183C20.3589 16.9842 16.9842 20.3589 12.75 20.7183V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20.7183C7.01581 20.3589 3.64113 16.9842 3.28169 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3.28169C3.64113 7.01581 7.01581 3.64113 11.25 3.28169V2C11.25 1.58579 11.5858 1.25 12 1.25ZM11.25 4.78832C7.84488 5.13828 5.13828 7.84488 4.78832 11.25H5.5C5.91421 11.25 6.25 11.5858 6.25 12C6.25 12.4142 5.91421 12.75 5.5 12.75H4.78832C5.13828 16.1551 7.84488 18.8617 11.25 19.2117V18.5C11.25 18.0858 11.5858 17.75 12 17.75C12.4142 17.75 12.75 18.0858 12.75 18.5V19.2117C16.1551 18.8617 18.8617 16.1551 19.2117 12.75H18.5C18.0858 12.75 17.75 12.4142 17.75 12C17.75 11.5858 18.0858 11.25 18.5 11.25H19.2117C18.8617 7.84488 16.1551 5.13828 12.75 4.78832V5.5C12.75 5.91421 12.4142 6.25 12 6.25C11.5858 6.25 11.25 5.91421 11.25 5.5V4.78832Z" fill="#767985"/>
        </svg>
      </button>
    </body>
  </html>
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
