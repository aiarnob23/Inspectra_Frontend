import { Button } from "../ui/button";
import useModal from "./useModal";

export default function OpenModal({
    modals,
    children,
    ...props
}: {
    children: React.ReactNode;
    modals: {
        modalId: string;
        openId: string;
    }[];
}) {
    const { open } = useModal();

    const handleOpen = () => {
        open(modals);
    };

    return (
        <Button onClick={handleOpen} {...props}>
            {children}
        </Button>
    )
}