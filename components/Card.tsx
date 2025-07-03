import React from "react"
import { Pressable, PressableProps, ViewStyle } from "react-native"

interface I_Props extends PressableProps {
    children: React.ReactNode
    className?: string
}

export function CE_Card({ children, className = '', style, ...rest }: I_Props) {
    return (
        <Pressable
            className={`rounded-xl shadow-md ${className}`}
            style={[
                {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                    elevation: 5
                } as ViewStyle
            ]}
            {...rest}
        >
            {children}
        </Pressable>
    )
}
