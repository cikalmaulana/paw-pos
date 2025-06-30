import AsyncStorage from "@react-native-async-storage/async-storage";

export interface I_LoginRequest{
    phone: string,
    password: string
}

export interface I_LoginResponse{
    success: boolean,
    message: string,
    login_data?: I_LoginData
}

export interface I_LoginData{
    token: string,
    user: {
        id: string,
        name: string,
        phone: string
    }
}

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN";

export const doLogin = async (phone: string, password: string): Promise<I_LoginResponse> => {
    try {
        const result = true // nanti ini manggil API_Login()
        if(result) {
            const loginData = {
                token: "ThIsIstOKEnForvserLogin",
                user: {
                    id: "user_123",
                    name: "John Doe",
                    phone,
                },
            };
    
            await AsyncStorage.setItem(KEY_LOGIN, JSON.stringify(loginData));
    
            return {
                success: true,
                message: "Login successfully",
                login_data: loginData
            };
        }
        return {
            success: false,
            message: "Failed to login. Please try again later.",
        }; 
    } catch (error) {
        return {
            success: false,
            message: "Failed to login. Please try again later.",
        };
    }
};
