"use client"

import { clearUser } from "@/features/auth/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"


export const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(clearUser())
    // localStorage.removeItem("auth_token")
    navigate('/')
  }

  return logout
}