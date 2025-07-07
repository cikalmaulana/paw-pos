import { Pressable, Text, View } from "react-native";

interface I_Props{
    setManageOpen:(manage: string) => void
}

export default function AccountSettingList(props: I_Props){
    return (
        <View className="flex flex-col gap-3">
            <Pressable className="flex flex-col" onPress={() => props.setManageOpen('profile')}>
                <Text className="text-primary font-bold text-2xl">Profile Details</Text>
                <Text className="text-description text-lg">View your information</Text>
            </Pressable>
            <Pressable className="flex flex-col" onPress={() => props.setManageOpen('store')}>
                <Text className="text-primary font-bold text-2xl">Manage Store</Text>
                <Text className="text-description text-lg">Edit store information and adjust balance</Text>
            </Pressable>
            <Pressable className="flex flex-col" onPress={() => props.setManageOpen('item')}>
                <Text className="text-primary font-bold text-2xl">Manage Items</Text>
                <Text className="text-description text-lg">Add / edit item and item stock</Text>
            </Pressable>
            <Pressable className="flex flex-col" onPress={() => props.setManageOpen('admin')}>
                <Text className="text-primary font-bold text-2xl">Manage Admins</Text>
                <Text className="text-description text-lg">Add / edit item and admin</Text>
            </Pressable>
            <Pressable className="flex flex-col" onPress={() => props.setManageOpen('report')}>
                <Text className="text-primary font-bold text-2xl">Report</Text>
                <Text className="text-description text-lg">Your daily, weekly, and monthly store report</Text>
            </Pressable>
        </View>
    )
}