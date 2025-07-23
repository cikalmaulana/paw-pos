import CE_ModalConfirmation from "@/components/ModalConfirmation"
import { I_User } from "@/services/api/user/api.user.get.int"
import { locales } from "../locales"

interface I_Props {
    language: typeof locales["id"]
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
                title={props.language.modal.delete.title}
                description={props.language.modal.delete.hint}
                setIsOpen={props.setIsOpen}
                onConfirm={doDeleteAdmin}
                cancelText={props.language.button.cancel}
                confirmText={props.language.button.confirm}
                danger={true}
            />
        </>
    )
}
