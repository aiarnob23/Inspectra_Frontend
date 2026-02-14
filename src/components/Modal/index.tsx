
import ForgotPasswordDialog from "../Auth/ForgotPassword/ForgotPasswordDialog";
import LoginFormDialog from "../Auth/Login/LoginFormDialog";
import OTPInputDigalog from "../Auth/OTP/EmailOTPVerifyDialog";
import RegisterFormDialog from "../Auth/Register/RegisterFormDialog";
import ResetPasswordDialog from "../Auth/ResetPassword/ResetPasswordDialog";
import VerifyResetOTPPage from "../Auth/VerifyResetPassOTP/VerifyResetPassOTPDialog";
import { AddAssetFormDialog } from "../Dashboard/Asset/AddAssetFormDialog";
import { AddClientFormDialog } from "../Dashboard/Clients/AddClientFormDialog";
import { AddEmployeeFormDialog } from "../Dashboard/Employee/AddEmployeeFormDialog";
import { AddInspectionFormDialog } from "../Dashboard/Inspection/AddInspectionFormDialog";
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
            <Modal
                modalId="modal"
                openId="forgot-password"
                closeModals={["tab"]}
                className="sm:w-[45dvw]"
            >
                <ForgotPasswordDialog />
            </Modal>
             <Modal
                modalId="modal"
                openId="verify-reset-otp"
                closeModals={["tab"]}
                className="sm:w-[45dvw]"
            >
                <VerifyResetOTPPage />
            </Modal>
               <Modal
                modalId="modal"
                openId="reset-password"
                closeModals={["tab"]}
                className="sm:w-[45dvw]"
            >
                <ResetPasswordDialog />
            </Modal>
            <Modal
                modalId="modal"
                openId="add-asset"
                closeModals={["tab"]}
                className="sm:w-[45dvw]"
            >
                <AddAssetFormDialog />
            </Modal>
            <Modal
                modalId="modal"
                openId="add-employee"
                closeModals={["tab"]}
                className="sm:w-[45dvw]"
            >
                <AddEmployeeFormDialog />
            </Modal>
            <Modal
                modalId="modal"
                openId="add-inspection"
                closeModals={["tab"]}
                className="sm:w-[45dvw]"
            >
                <AddInspectionFormDialog />
            </Modal>
        </>
    )
}
