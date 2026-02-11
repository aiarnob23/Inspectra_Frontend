import ClientsTable from "@/components/Dashboard/Clients/Clients";
import OpenModal from "@/components/Modal/openModal";
import { Button } from "@/components/ui/button";
import { useExportClientCSVMutation } from "@/features/clients/clientApi";
import { useExport } from "@/hooks/useExport";
import { Download, File } from "lucide-react";

export default function Clients() {
  const [exportCSV, { isLoading }] = useExportClientCSVMutation();
  const { handleExport } = useExport(
    () => exportCSV().unwrap(),
    "clients.csv"
  )

  return (
    <>

      <div className="px-12">
        {/* heading */}
        <section className="flex justify-between items-center ">
          <h1 className="text-3xl font-bold">Clients</h1>
          <div className="buttons flex  items-center gap-4">
            <Button className="cursor-pointer text-muted-foreground" variant={'outline'}><File /> CSV upload</Button>
            <Button className="cursor-pointer text-muted-foreground"
              onClick={handleExport} variant={'outline'}><Download /> {isLoading ? "Exporting..." : "Export"}</Button>
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
              >+ Add Clients</Button>
            </OpenModal>
          </div>
        </section>

        {/* table */}
        <section className="mt-8">
          <ClientsTable />
        </section>
      </div>

    </>
  )
}
