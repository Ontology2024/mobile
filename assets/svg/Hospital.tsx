import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Rect width={32} height={32} fill="#4876FF" rx={16} />
    <Path fill="#fff" d="M14.05 8h3.63v15.73h-3.63z" />
    <Path fill="#fff" d="M8 14.05h15.73v3.63H8z" />
  </Svg>
);
export default SvgComponent;
