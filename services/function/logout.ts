import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN";

export const doLogout = async (): Promise<{ success: boolean; message: string }> => {
    try {
        await AsyncStorage.removeItem(KEY_LOGIN);
        return {
            success: true,
            message: "Logout successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to logout. Please try again.",
        };
    }
};
