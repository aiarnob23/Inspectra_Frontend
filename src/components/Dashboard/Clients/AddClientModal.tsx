import useModal from "@/components/Modal/useModal";
import { Button } from "@/components/ui/button";


export default function AddClientModal() {

    const { close } = useModal();
    return (
        <div className="">Add Client Modal
            <Button onClick={() => close(["modal"])}>
                close
            </Button>
        </div>
    )
}
