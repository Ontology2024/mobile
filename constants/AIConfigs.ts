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
  characterImg: ImageSourcePropType;
  backgroundImg: ImageSourcePropType;
  backgroundFilpImg: ImageSourcePropType;
  desc: string;
}

export const DEFAULT_AI_CONFIG: AI[] = [
  {
    name: "나만의 세이피",
    character: require("@/app/safe-call/images/character1.png"),
    profile: "10대 (여)",
    bio: "저랑 같이 걸으면\n어둠도 눈치 보고 물러날걸요!",
    keywords: ["재치있는", "활발한", "친근한"],
    friendly: 6,
    energetic: 6,
    tone: 5,
    honorific: false,
    bgColors: ["#FFF4F8", "#FFF", "#FFF"],
    outline: "#FFB2CB",

    characterImg: require("@/app/safe-call/images/character1.png"),
    backgroundImg: require("@/app/safe-call/images/bg1.png"),
    backgroundFilpImg: require("@/app/safe-call/images/bbg1.png"),
    desc: `저랑 같이 걸으면\n어둠도 눈치 보고 물러날걸요!`,
  },
  {
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
    characterImg: require("@/app/safe-call/images/character2.png"),
    backgroundImg: require("@/app/safe-call/images/bg2.png"),
    backgroundFilpImg: require("@/app/safe-call/images/bbg2.png"),
    desc: `한번 전화하면 나의 매력에서 \n헤어나올 수 없을 거예요~`,
    name: "해피해피 잔망루피",
  },
  {
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
    characterImg: require("@/app/safe-call/images/character3.png"),
    backgroundImg: require("@/app/safe-call/images/bg3.png"),
    backgroundFilpImg: require("@/app/safe-call/images/bbg3.png"),
    desc: `미니언즈는 인류보다 훨씬\n오래 전부터 지구 상에 존재했죠`,
    name: "노래하는 미니언즈",
  },
];

export const AIConfigs = createContext<{
  configs: AI[];
  setConfigs: (update: Partial<AI> & { name: string }) => void;
}>({ configs: [], setConfigs: () => {} });
