import { useLocalSearchParams, usePathname, useRouter } from "expo-router"

export const useReloadPage = () => {
    const router = useRouter()
    const params = useLocalSearchParams()
    const pathname = usePathname()

    const reloadPage = () => {
        router.replace(pathname as any)
    }

    return reloadPage
}
