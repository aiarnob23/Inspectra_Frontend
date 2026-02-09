import Navbar from "@/components/Common/Navbar";
import Modals from "@/components/Modal";
import { Outlet } from "react-router";


export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Modals/>
    </>
  )
}
