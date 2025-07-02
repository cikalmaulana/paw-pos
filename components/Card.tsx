import React from "react"
import { View, ViewProps } from "react-native"

interface I_Props extends ViewProps {
    children: React.ReactNode
    className?: string
}

export function CE_Card({ children, className = '', style, ...rest }: I_Props) {
    return (
        <View
            className={`bg-white rounded-xl shadow-md ${className}`}
            style={[
                {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 5
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </View>
    )
}
