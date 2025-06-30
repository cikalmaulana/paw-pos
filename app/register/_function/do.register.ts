export interface I_RegisterForm{
    name: string,
    password: string,
    phone: string
}

export interface I_Response {
    success: boolean
    message: string
}

export const doRegister = (props: I_RegisterForm): I_Response => {
    return {
        success: true,
        message: "Registered successfully"
    }
    // return {
    //     success: false,
    //     message: "Register Failed. Please try again later."
    // }
}