
import { useContext } from "react"
import { AuthContextProvider } from '../context/AuthContext'


export function useAuth() {
    return useContext(AuthContextProvider)
}