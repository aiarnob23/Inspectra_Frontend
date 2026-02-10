import axios from "axios"

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data

    // ✅ ensure string only
    if (typeof data === "string") return data
    if (typeof data?.message === "string") return data.message
    if (typeof data?.error === "string") return data.error
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Something went wrong"
}
