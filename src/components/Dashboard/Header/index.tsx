import {  useAppSelector } from "@/store/hooks";


export default function DashboardHeader() {
  const user = useAppSelector((state)=>state.auth.user);
  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-2xl font-semibold">Welcome Back, {user?.firstName}!</h1>
    </div>
  )
}
