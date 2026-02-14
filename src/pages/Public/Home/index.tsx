
import { MembershipPlans } from "@/components/Common/MembershipPlans";
import Banner from "@/components/Home/Banner";
import Features from "@/components/Home/Features";
import HowItWorks from "@/components/Home/HowItWorks";
import Modals from "@/components/Modal";

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      <HowItWorks />
      <section>
        <div className="flex justify-center items-center flex-col gap-4 mb-12">
          <h1 className="text-5xl font-bold ">Our Exclusive Plans</h1>
          <p className="text-xl font-normal text-muted-foreground">Choose your perfect plan and start managing your asset inspection business</p>
        </div>
        <MembershipPlans />
      </section>

      <Modals />
    </>
  )
}
