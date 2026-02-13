import { type RootState } from "@/store"
import { useSelector } from "react-redux"

export const useAuth = () => {
    return useSelector((state: RootState) => state.auth);
}