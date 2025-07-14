import { CE_Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { useState } from "react"
import { Modal, View } from "react-native"

interface I_Props{
    balance: string
    setBalance: (balance: string) => void
    onClose: () => void
    setUpAlert:(msg: string, isSuccess: boolean)=>void
}

export default function StoreBalance(props: I_Props){
    const [balanceInput, setBalanceINput] = useState(props.balance)

    const doUpdateBalance = () => {
        // do api thing
        // after success, do: 
        props.setBalance(balanceInput)
        props.setUpAlert("Update balance success!", true)
        props.onClose()

    }

    return (
        <Modal
            visible={true}
            transparent
            animationType="fade"
            onRequestClose={() => props.onClose()}
        >
            <View className="flex-1 bg-black/50 justify-center items-center px-6">
                <View className="bg-white p-5 rounded-xl w-full">
                    <Input 
                        label="Adjust Balance"
                        value={balanceInput}
                        onChangeText={setBalanceINput}
                    />
                    
                    <View className="flex flex-row justify-between gap-3 mt-3">
                        <CE_Button 
                            title="Cancel" 
                            onPress={() => props.onClose()} 
                            className="flex-1" 
                        />
                        <CE_Button
                            title="Save"
                            bgColor="bg-secondary"
                            onPress={() => doUpdateBalance()}
                            className="flex-1"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}