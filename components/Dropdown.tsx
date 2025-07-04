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
}

export function CE_Dropdown({ label, selected, options, onSelect }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <View>
            {label && <Text className="text-base text-primary font-semibold mb-1">{label}</Text>}

            <Pressable
                onPress={() => setOpen(true)}
                className="border border-primary rounded-2xl px-4 py-3 bg-white"
            >
                <Text className="text-gray-800">{selected || "Select..."}</Text>
            </Pressable>

            <Modal visible={open} transparent animationType="fade">
                <Pressable className="flex-1 bg-black/50 justify-center items-center" onPress={() => setOpen(false)}>
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
        </View>
    )
}
