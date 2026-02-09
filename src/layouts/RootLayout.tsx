import Navbar from "@/components/Common/Navbar";
import { Outlet } from "react-router";


export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
