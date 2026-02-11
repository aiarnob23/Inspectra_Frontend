import { toast } from "sonner"
import { downloadFile } from "@/lib/utils"

export function useExport(
  exportFn: () => Promise<Blob>,
  filename: string
) {
  const handleExport = async () => {
    try {
      const blob = await exportFn()

      if (!(blob instanceof Blob)) {
        throw new Error("Invalid file data")
      }

      downloadFile(blob, filename)
      toast.success("Export successful")
    } catch (error) {
      console.error(error)
      toast.error("Export failed")
    }
  }

  return { handleExport }
}
