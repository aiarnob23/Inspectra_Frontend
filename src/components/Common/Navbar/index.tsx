"use client"

import { useState, useRef } from "react"
import { Menu, X } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/theme/mode-toggle"
import OpenModal from "@/components/Modal/openModal"
import { useAuth } from "@/hooks/useAuth"
import { useLogout } from "@/hooks/useLogout"
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { user } = useAuth()
    const logout = useLogout()

    const drawerRef = useRef<HTMLDivElement | null>(null)
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

    const navLinks = [
        { name: "How It Works", path: "/main/rent" },
        { name: "Pricing", path: "#pricing-plans" },
        { name: "Testimonials", path: "/main/find-service/Home Shifter" },
        { name: "FAQ", path: "/main/find-service/Plumber" },
    ]


    const toggleMenu = () => setIsMenuOpen((prev) => !prev)

    const handleHover = (el: HTMLAnchorElement) => {
        const underline = el.querySelector(".underline")

        gsap.to(el, {
            y: -3,
            duration: 0.25,
            ease: "power2.out",
        })

        gsap.to(underline, {
            width: "100%",
            duration: 0.25,
            ease: "power2.out",
        })
    }

    const handleLeave = (el: HTMLAnchorElement) => {
        const underline = el.querySelector(".underline")

        gsap.to(el, {
            y: 0,
            duration: 0.25,
            ease: "power2.out",
        })

        gsap.to(underline, {
            width: "0%",
            duration: 0.25,
            ease: "power2.out",
        })
    }

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                if (isMenuOpen) {
                    gsap.to(overlayRef.current, {
                        autoAlpha: 1,
                        duration: 0.4,
                    })

                    gsap.fromTo(
                        drawerRef.current,
                        { x: "-100%" },
                        { x: "0%", duration: 0.5 }
                    )

                    gsap.fromTo(
                        linkRefs.current,
                        { y: 20, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            stagger: 0.1,
                            duration: 0.4,
                        }
                    )
                } else {
                    gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 })
                    gsap.to(drawerRef.current, { x: "-100%", duration: 0.3 })
                }
            })

            return () => ctx.revert()
        },
        [isMenuOpen]
    )

    return (
        <>
            <nav>
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <span className="text-2xl text-gray-200 font-bold">Inspectra</span>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center gap-12">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onMouseEnter={(e) => handleHover(e.currentTarget)}
                                    onMouseLeave={(e) => handleLeave(e.currentTarget)}
                                    className="relative text-gray-200 font-semibold text-lg"
                                >
                                    {link.name}

                                    {/* Theme aware underline */}
                                    <span className="underline absolute left-0 -bottom-1 h-0.5 w-0 bg-primary" />
                                </a>
                            ))}
                        </div>

                        {/* Desktop Right Section */}
                        <div className="hidden lg:flex items-center gap-3">

                            {user ? (
                                <>
                                    {/* Avatar */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                                            {user.firstName?.charAt(0)}
                                        </div>
                                        <span className="text-sm font-medium">
                                            {user.firstName}
                                        </span>
                                    </div>

                                    <Button
                                        variant="outline"
                                        onClick={logout}
                                        className="cursor-pointer"
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <OpenModal
                                        modals={[{ modalId: "modal", openId: "login-user" }]}
                                    >
                                        <Button variant="outline" className="cursor-pointer textgr">Login</Button>
                                    </OpenModal>

                                    <OpenModal
                                        modals={[{ modalId: "modal", openId: "register-user" }]}
                                    >
                                        <Button className="text-gray-100 cursor-pointer">Sign Up</Button>
                                    </OpenModal>
                                </>
                            )}

                            <ModeToggle />
                        </div>

                        {/* Mobile Button */}
                        <div className="lg:hidden">
                            <button
                                aria-label="Open menu"
                                onClick={toggleMenu}
                            >
                                <Menu />
                            </button>
                        </div>

                    </div>
                </div>
            </nav>

            {/* Overlay */}
            <div
                ref={overlayRef}
                onClick={toggleMenu}
                className="fixed inset-0 bg-black/40 invisible opacity-0 z-40 lg:hidden"
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className="fixed top-0 left-0 w-80 h-full bg-white z-50 -translate-x-full lg:hidden"
            >
                <div className="flex justify-between p-6 border-b">
                    <span>Menu</span>
                    <button aria-label="Close menu" onClick={toggleMenu}>
                        <X />
                    </button>
                </div>

                <div className="py-6 flex flex-col">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.path}
                            ref={(el) => {
                                linkRefs.current[i] = el
                            }}
                            onClick={toggleMenu}
                            className="px-6 py-4"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t">

                    {user ? (
                        <>
                            <p className="mb-3">Logged in as {user.firstName}</p>
                            <Button onClick={logout} className="w-full">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <OpenModal
                            modals={[{ modalId: "modal", openId: "login-user" }]}
                        >
                            <Button className="w-full">Login</Button>
                        </OpenModal>
                    )}

                </div>
            </div>
        </>
    )
}

export default Navbar