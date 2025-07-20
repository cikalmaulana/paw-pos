import CE_ModalConfirmation from "@/components/ModalConfirmation"
import { I_User } from "@/services/api/user/api.user.get.int"

interface I_Props {
    isOpen: boolean
    adminData: I_User | undefined
    setIsOpen: (open: boolean) => void
    deleteAdmin: (id: string) => void
}

export default function ViewAdminDelete(props: I_Props) {
    if (!props.isOpen || !props.adminData) return null
    const adminData = props.adminData

    const doDeleteAdmin = () => {
        props.deleteAdmin(adminData.id)
    }

    return (
        <>
            <CE_ModalConfirmation 
                isOpen={props.isOpen}
                title="Delete Admin"
                description="This action is permanent and cannot be undone.
                            Are you sure you want to delete this admin?"
                setIsOpen={props.setIsOpen}
                onConfirm={doDeleteAdmin}
                danger={true}
            />
        </>
    )
}
