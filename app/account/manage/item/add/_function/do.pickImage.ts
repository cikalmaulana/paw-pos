import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const pickImage = async (
    onSuccess: (uri: string) => void
) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.status !== "granted") {
        alert("Permission to access camera is required!");
        return;
    }

    Alert.alert("Change Image", "Select image source", [
        {
            text: "Camera",
            onPress: async () => {
                const result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    quality: 1,
                });

                if (!result.canceled) {
                    const asset = result.assets[0];
                    onSuccess(asset.uri);
                }
            },
        },
        {
            text: "Gallery",
            onPress: async () => {
                const result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    quality: 1,
                });

                if (!result.canceled) {
                    const asset = result.assets[0];
                    onSuccess(asset.uri);
                }
            },
        },
        { text: "Cancel", style: "cancel" },
    ]);
};
