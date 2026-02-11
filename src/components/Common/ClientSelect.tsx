"use client"

import { useState, useEffect } from "react"
import { useGetClientsQuery } from "@/features/clients/clientApi"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function ClientSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const { data, isLoading } = useGetClientsQuery({
    search: debouncedSearch,
    page: 1,
    limit: 10,
  })
 
 
  const clients = data?.data ?? []
   

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {value
            ? clients.find((c) => c.id === value)?.name ?? "Select Client"
            : "Select Client"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-75 space-y-3">
        <Input
          placeholder="Search client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="max-h-60 overflow-y-auto space-y-1">
          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin" />
            </div>
          )}

          {!isLoading && clients.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-4">
              No clients found
            </div>
          )}

          {clients.map((client) => (
            <Button
              key={client.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                onChange(client.id)
                setOpen(false)
              }}
            >
              <div>
                <div className="font-medium">{client.name}</div>
                <div className="text-xs text-muted-foreground">
                  {client.company ?? "No Company"}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
