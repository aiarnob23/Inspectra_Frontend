"use client"

import heroVideo from "@/assets/videos/banner1.mp4";
import Navbar from "@/components/Common/Navbar";
import { Button } from "@/components/ui/button";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Banner() {

  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const paraRef = useRef<HTMLParagraphElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const statsRef = useRef<HTMLUListElement | null>(null)

  useGSAP(() => {

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // 🔥 h1 animation
    tl.fromTo(
      headingRef.current,
      { y: 100, opacity: 0, filter: "blur(12px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
      }
    )

      // 🔥 p animation
      .fromTo(
        paraRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
        "-=0.6"
      )

      // 🔥 button entrance animation
      .fromTo(
        buttonRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )

    // Counter animation (unchanged)
    const numbers = statsRef.current?.querySelectorAll(".stat-number")

    numbers?.forEach((el) => {
      const value = el.getAttribute("data-value")
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: value,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out",
        }
      )
    })

  }, [])

  // 🔥 Button micro interaction
  const handleButtonEnter = () => {
    gsap.to(buttonRef.current, {
      y: -4,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleButtonLeave = () => {
    gsap.to(buttonRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">

        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute top-0 left-0 right-0 bg-gray-200/10 backdrop-blur-sm z-20 mx-12 rounded-2xl mt-2">
          <Navbar />
        </div>

        <div className="relative z-10 mt-12 flex h-full items-center justify-center text-center text-white/70 px-4">
          <div>

            <h1
              ref={headingRef}
              className="text-4xl md:text-7xl font-bold"
            >
              Never Miss an Inspection
            </h1>

            <p
              ref={paraRef}
              className="mt-8 text-lg text-slate-200/70 w-2/4 mx-auto"
            >
              Inspection automation, standardized compliance reports, and asset monitoring — purpose-built for elevators, AC units, scaffolding, and safety-sensitive equipment. No spreadsheets.
            </p>

            <Button
              ref={buttonRef}
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
              className="mt-12 cursor-pointer px-8 py-2 text-lg text-gray-200/90"
            >
              Start Basic
            </Button>

            <section className="mt-20 hero-stats">
              <ul
                ref={statsRef}
                className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto"
              >
                <li className="stat-card group rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <strong className="stat-number text-3xl font-bold text-white" data-value="500">0</strong>
                  <span className="block mt-2 text-sm uppercase tracking-widest text-white/60">
                    Companies Trust Us
                  </span>
                </li>

                <li className="stat-card group  rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <strong className="stat-number text-3xl font-bold text-white" data-value="99">0</strong>
                  <span className="block mt-2 text-sm uppercase tracking-widest text-white/60">
                    Subscriber Satisfaction (%)
                  </span>
                </li>

                <li className="stat-card group rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <strong className="stat-number text-3xl font-bold text-white" data-value="5000">0</strong>
                  <span className="block mt-2 text-sm uppercase tracking-widest text-white/60">
                    Inspections Automated
                  </span>
                </li>
              </ul>
            </section>

          </div>
        </div>

      </section>
    </>
  )
}