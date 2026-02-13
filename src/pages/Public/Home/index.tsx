import Banner from "@/components/Common/Home/Banner";
import Features from "@/components/Common/Home/Features";
import { MembershipPlans } from "@/components/Common/MembershipPlans";
import Modals from "@/components/Modal";

export default function Home() {
  return (
    <>
      <Banner />
      <Features/>
      <MembershipPlans/>
      <Modals/>
    </>
  )
}
