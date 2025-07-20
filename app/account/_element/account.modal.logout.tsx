import CE_ModalConfirmation from "@/components/ModalConfirmation"
import { locales } from "../locales"

interface I_Props{
    isModalOpen: boolean
    setIsModalOpen:(open: boolean)=>void
    logout:()=>void
    language: typeof locales["en"]
}

export function LogoutModal(props: I_Props){
    return (
        <>
            <CE_ModalConfirmation 
                isOpen={props.isModalOpen}
                title={props.language.logout.title}
                description={props.language.logout.description}
                setIsOpen={props.setIsModalOpen}
                onConfirm={props.logout}
                onCancel={() =>  props.setIsModalOpen(false)}
                cancelText={props.language.logout.buttonCancel}
                confirmText={props.language.logout.buttonLogout}
                danger={true}
            />
        </>
    )
}