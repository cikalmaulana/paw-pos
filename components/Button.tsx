import { useState } from "react"
import { ActivityIndicator, Pressable, PressableProps, Text } from "react-native"

interface Props extends PressableProps {
    title: string
    className?: string
    bgColor?: string 
    isLoading?: boolean
}

export function CE_Button({ 
    title, 
    className = '', 
    bgColor, 
    disabled, 
    isLoading = false, 
    ...props 
}: Props) {
    const [isPressed, setIsPressed] = useState(false)

    const baseBg = disabled ? 'bg-deact' : (bgColor || 'bg-primary')

    let dynamicBg = baseBg
    if (!disabled) {
        if (baseBg === 'bg-primary') {
            dynamicBg = isPressed ? 'bg-primary_press' : 'bg-primary'
        } else if (baseBg === 'bg-secondary') {
            dynamicBg = isPressed ? 'bg-secondary_press' : 'bg-secondary'
        }
    }

    return (
        <Pressable
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            className={`rounded-2xl py-3 px-6 items-center ${dynamicBg} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text className="text-white text-base font-semibold uppercase">{title}</Text>
            )}
        </Pressable>
    )
}
