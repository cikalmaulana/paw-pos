import { I_Lang } from "@/services/api/other/api.language.int"
import { useMemo } from "react"

type LocaleObject = Record<"en" | "id", any>

export function useLocale<T extends LocaleObject>(lang: I_Lang, locales: T): T["en"] {
    console.log("USE LOCALE LANG: ", lang)
    return useMemo(() => {
        const key = lang.name.toLowerCase() as keyof T
        return locales[key]
    }, [lang, locales])
}
