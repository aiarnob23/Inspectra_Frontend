import AssetsTable from "@/components/Dashboard/Asset/AssetsTable"
import OpenModal from "@/components/Modal/openModal"
import { Button } from "@/components/ui/button"

export default function Assets() {
  return (
    <div className="px-12">
      {/* Header */}
      <section className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Assets</h1>

        <OpenModal
          modals={[
            {
              modalId: "modal",
              openId: "add-asset",
            },
          ]}
        >
          <Button className="active:scale-98">
            + Add Asset
          </Button>
        </OpenModal>
      </section>

      {/* Table */}
      <section className="mt-8">
        <AssetsTable />
      </section>
    </div>
  )
}
