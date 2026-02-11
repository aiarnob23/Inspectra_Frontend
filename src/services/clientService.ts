import { api } from "@/lib/api"

// -------------------------
// Types (MATCH PRISMA)
// -------------------------

export interface CreateClientPayload {
  name: string
  email: string
  company?: string
  phone?: string
  address?: string
}

export interface Client {
  id: string
  name: string
  email: string
  company?: string | null
  phone?: string | null
  status?: "active" | "inactive"
  address?: string | null
  subscriberId: string
  createdAt: string
  updatedAt: string
}

// -------------------------
// Client Service
// -------------------------

export const clientService = {
  // -------------------------
  // Create Client
  // -------------------------
  createClient: async (
    data: CreateClientPayload
  ): Promise<Client> => {
    const res = await api.post("/clients", data)
    return res.data.data
  },

  // -------------------------
  // Get All Clients
  // -------------------------
  getClients: async (params?: { page?: number; limit?: number }) => {
    const res = await api.get("/clients", { params })
    return res.data
  },

  // -------------------------
  // Get Client by ID
  // -------------------------
  getClientById: async (id: string): Promise<Client> => {
    const res = await api.get(`/clients/${id}`)
    return res.data.data
  },

  // -------------------------
  // Update Client
  // -------------------------
  updateClient: async (
    id: string,
    data: Partial<CreateClientPayload>
  ): Promise<Client> => {
    const res = await api.patch(`/clients/${id}`, data)
    return res.data.data
  },

  // -------------------------
  // Delete Client (soft delete)
  // -------------------------
  deleteClient: async (id: string): Promise<void> => {
    await api.delete(`/clients/${id}`)
  },
}
