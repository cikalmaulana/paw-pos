export const isPhoneValid = (phoneNumber: string) => {
        const trimmed = phoneNumber.trim()
        const onlyDigits = /^[0-9]+$/.test(trimmed)
        const validLength = trimmed.length >= 10 && trimmed.length <= 13
        const startsWith08 = trimmed.startsWith('08')

        return onlyDigits && validLength && startsWith08
    }