// LangContext.tsx
import { I_Lang } from "@/services/api/other/api.language.int"
import React, { createContext, useContext, useEffect, useState } from "react"
import { API_GetLanguage, API_UpdateLanguage } from "../api/other/api.language"

type LangContextType = {
  lang: I_Lang
  setLang: (lang: I_Lang) => void
}

export const LangContext = createContext<LangContextType | undefined>(undefined)

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, _setLang] = useState<I_Lang>({ name: "ID" })

  useEffect(() => {
    const fetchLang = async () => {
      const storedLang = await API_GetLanguage()
      if (storedLang) _setLang(storedLang)
    }
    fetchLang()
  }, [])

  const setLang = (newLang: I_Lang) => {
    _setLang(newLang)
    API_UpdateLanguage(newLang) // update juga di storage
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => {
  const context = useContext(LangContext)
  if (!context) throw new Error("useLang must be used within a LangProvider")
  return context
}
