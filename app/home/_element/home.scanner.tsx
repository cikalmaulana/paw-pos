import { CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View
} from "react-native";

interface I_Props {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

export default function HomeScanner({ visible, onClose, onScan }: I_Props) {
  const [scanned, setScanned] = useState(false);

  const handleScan = ({ data }: { data: string }) => {
    if (!scanned && data) {
      setScanned(true);
      onScan(data);
      onClose();
    }
  };

  useEffect(() => {
    if (visible) setScanned(false);
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black">
        <CameraView
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          facing="back"
          onBarcodeScanned={handleScan}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "code128", "code39", "qr"],
          }}
        />

        {Platform.OS === "android" && <StatusBar hidden />}

        <Overlay />

        <Pressable
          onPress={onClose}
          className="absolute top-12 right-5 bg-black/60 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold text-sm">Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
}


const Overlay = () => {
  const translateY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 200,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateY]);

  return (
    <View className="absolute inset-0">
      <View className="flex-1 bg-black/60" />

      <View className="h-[250px] flex-row">
        <View className="flex-1 bg-black/60" />

        <View className="w-[250px] h-[250px] items-center justify-center">
          <View className="absolute inset-0 rounded-xl border-[6px] border-primary" />
          <Animated.View
            className="w-[220px] h-[3px] bg-red-500 rounded-full mb-52"
            style={{ transform: [{ translateY }] }}
          />
        </View>
        <View className="flex-1 bg-black/60" />
      </View>

      <View className="flex-1 bg-black/60 items-center pt-4">
        <Text className="text-white text-sm font-medium">
          Align barcode inside the box
        </Text>
      </View>
    </View>
  );
};
