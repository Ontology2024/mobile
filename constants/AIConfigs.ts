import { createContext } from "react";
import { ImageSourcePropType } from "react-native";

export interface AI {
  name: string;
  character: ImageSourcePropType;
  profile: string;
  bio: string;
  keywords: string[];
  friendly: number;
  energetic: number;
  tone: number;
  honorific: boolean;
  bgColors: string[];
  outline: string;
}

export const DEFAULT_AI_CONFIG: AI[] = [
  {
    name: "한지우",
    character: require("@/assets/images/jiwoo.png"),
    profile: "10대 (여)",
    bio: "저랑 같이 걸으면\n어둠도 눈치 보고 물러날걸요!",
    keywords: ["재치있는", "활발한", "친근한"],
    friendly: 6,
    energetic: 6,
    tone: 5,
    honorific: false,
    bgColors: ["#FFF4F8", "#FFF", "#FFF"],
    outline: "#FFB2CB",
  },
  {
    name: "안재우",
    character: require("@/assets/images/jaewoo.png"),
    profile: "30대 (남)",
    bio: "뉴스: 인공지능이 곧 코미디언도 대체할 수 있을 거래요!",
    keywords: ["똑똑한", "지식전달", "차분한"],
    friendly: 2,
    energetic: 2,
    tone: 2,
    honorific: false,
    bgColors: ["#F0F7FF", "#FFF", "#FFF"],
    outline: "#7495FF",
  },
  {
    name: "김한수",
    character: require("@/assets/images/hansoo.png"),
    profile: "50대 (남)",
    bio: "생활꿀팁 전문가\n인생경력자입니다~",
    keywords: ["유용한", "신기한", "친근한"],
    friendly: 2,
    energetic: 2,
    tone: 2,
    honorific: false,
    bgColors: ["#ECFFF9", "#FFF", "#FFF"],
    outline: "#42E277",
  },
];

export const AIConfigs = createContext<{ configs: AI[], setConfigs: (update: Partial<AI> & { name: string }) => void }>({ configs: [], setConfigs: () => {}})
