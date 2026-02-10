import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/store/hooks"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isChecking } = useAppSelector(
    (state) => state.auth  
  )

  if (isChecking) {
    return (
      <div className="h-screen grid place-items-center">
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}
