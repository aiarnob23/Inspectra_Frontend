import OpenModal from "@/components/Modal/openModal";
import { Button } from "@/components/ui/button";


export default function Clients() {
  return (
    <>
      <h1>Clients</h1>

      <OpenModal
        modals={[
          {
            modalId: "modal",
            openId: "add-client",
          },
        ]}
      >
        <Button
         className="cursor-pointer active:scale-98"
         >Add Clients</Button>
      </OpenModal>

    </>
  )
}
