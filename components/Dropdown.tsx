import { useState } from "react"
import { FlatList, Modal, Pressable, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"

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
                className={`border rounded-2xl px-4 py-3 flex-row justify-between items-center ${
                    disabled ? "border-gray-300 bg-deact" : "border-primary bg-white"
                }`}
            >
                <Text className={`${disabled ? "text-gray-400" : "text-gray-800"}`}>
                    {selected || "Select..."}
                </Text>
                <Icon
                    name="chevron-down"
                    size={20}
                    color={disabled ? "#A0A0A0" : "#000"}
                />
            </Pressable>

            {!disabled && (
                <Modal visible={open} transparent animationType="fade">
                    <Pressable
                        className="flex-1 bg-black/50 justify-center items-center"
                        onPress={() => setOpen(false)}
                    >
                        <View className="bg-white rounded-xl w-5/6 max-h-[300px] p-4">
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item, index }) => (
                                    <Pressable
                                        onPress={() => {
                                            onSelect(item.value)
                                            setOpen(false)
                                        }}
                                        className="py-3 px-2 rounded-md"
                                        style={({ pressed }) => ({
                                            backgroundColor: pressed ? "#F0F0F0" : "transparent"
                                        })}
                                    >
                                        <Text className="text-base">{item.label}</Text>
                                        {index < options.length - 1 && (
                                            <View
                                                className="self-stretch mt-3"
                                                style={{
                                                    height: 1,
                                                    backgroundColor: "#E0E0E0",
                                                    opacity: 0.5
                                                }}
                                            />
                                        )}
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
