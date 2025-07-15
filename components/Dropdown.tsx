import { useState } from "react"
import { FlatList, Modal, Pressable, Text, View } from "react-native"

interface Option {
    label: string
    value: string
}

interface Props {
    label?: string
    selected: string
    options: Option[]
    onSelect: (value: string) => void
    disabled?: boolean
}

export function CE_Dropdown({ label, selected, options, onSelect, disabled = false }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <View className={disabled ? "opacity-60" : ""}>
            {label && (
                <Text className="text-base text-primary font-semibold mb-1">{label}</Text>
            )}

            <Pressable
                onPress={() => !disabled && setOpen(true)}
                className={`border rounded-2xl px-4 py-3 ${
                    disabled ? "border-gray-300 bg-deact" : "border-primary bg-white"
                }`}
            >
                <Text className={`${disabled ? "text-gray-400" : "text-gray-800"}`}>
                    {selected || "Select..."}
                </Text>
            </Pressable>

            {!disabled && (
                <Modal visible={open} transparent animationType="fade">
                    <Pressable
                        className="flex-1 bg-black/50 justify-center items-center"
                        onPress={() => setOpen(false)}
                    >
                        <View className="bg-white rounded-xl w-3/4 max-h-[300px] p-4">
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() => {
                                            onSelect(item.value)
                                            setOpen(false)
                                        }}
                                        className="py-3"
                                    >
                                        <Text className="text-base">{item.label}</Text>
                                    </Pressable>
                                )}
                            />
                        </View>
                    </Pressable>
                </Modal>
            )}
        </View>
    )
}

