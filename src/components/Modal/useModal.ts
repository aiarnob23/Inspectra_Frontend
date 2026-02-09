import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router";
import Modal from "./modal";

export default function useModal() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const close = (modalIds: string[]) => {
        const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: modalIds,
        })
        //replace URL without scrolling
        navigate(newUrl || "/dashboard", { replace: true })
    }

    const open = (
        modals: {
            modalId: string,
            openId: string
        }[]
    ) => {
        let params = searchParams.toString();

        modals.forEach(({ modalId, openId }) => {
            params = new URLSearchParams(
                formUrlQuery({
                    params,
                    key: modalId,
                    value: openId,
                }).split("?")[1] || ""
            ).toString()
        })
        const newUrl = `?${params}`
        navigate(newUrl || "/dashboard", { replace: true })
    }

    return { close, open, Modal };
}