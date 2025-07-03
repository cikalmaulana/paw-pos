import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const isLargeDevice = width > 768;
export const TAB_HEIGHT = isLargeDevice ? 80 : 64;