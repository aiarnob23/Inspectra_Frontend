import AddClientModal from "../Dashboard/Clients/AddClientModal";
import Modal from "./modal";


export default function Modals() {
    return (
        <>
            <Modal
                modalId="modal"
                openId="add-client"
                closeModals={["tab"]}
                className="sm:w-[45dvw]">
                <AddClientModal/>
            </Modal>
        </>
    )
}
