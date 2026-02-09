import Banner from "@/components/Common/Home/Banner";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme/mode-toggle";

export default function Home() {
  return (
    <>
    <Banner/>
      <div>Home page</div>
      <Button className="text-foreground">Button</Button>
      <ModeToggle/>
      </>
  )
}
