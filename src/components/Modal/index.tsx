
import LoginFormDialog from "../Auth/Login/LoginFormDialog";
import OTPInputDigalog from "../Auth/OTP/EmailOTPVerifyDialog";
import RegisterFormDialog from "../Auth/Register/RegisterFormDialog";
import { AddClientFormDialog } from "../Dashboard/Clients/AddClientFormDialog";
import Modal from "./modal";


export default function Modals() {
    return (
        <>
            <Modal
                modalId="modal"
                openId="add-client"
                closeModals={["tab"]}
                className="sm:w-[45dvw]">
                <AddClientFormDialog />
            </Modal>
            <Modal
                modalId="modal"
                openId="register-user"
                closeModals={["tab"]}
                className="sm:w-[45dvw]">
                <RegisterFormDialog />
            </Modal>
            <Modal
                modalId="modal"
                openId="verify-otp"
                closeModals={["tab"]}
                className="sm:w-[45dvw]"
            >
                <OTPInputDigalog />
            </Modal>
             <Modal
                modalId="modal"
                openId="login-user"
                closeModals={["tab"]}
                className="sm:w-[45dvw]"
            >
                <LoginFormDialog />
            </Modal>
        </>
    )
}
