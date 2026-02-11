import ClientsTable from "@/components/Dashboard/Clients/Clients";
import OpenModal from "@/components/Modal/openModal";
import { Button } from "@/components/ui/button";


export default function Clients() {
  return (
    <>
     
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

     <ClientsTable/>
    
    </>
  )
}
