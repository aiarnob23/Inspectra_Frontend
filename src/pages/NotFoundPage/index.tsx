"use client"

import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-md text-center space-y-6">
        {/* 404 */}
        <h1 className="text-7xl font-bold tracking-tight text-muted-foreground">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Button
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
