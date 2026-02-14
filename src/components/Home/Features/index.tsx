import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  CalendarCheck,
  BellRing,
  FileCheck2,
  BarChart3,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll(".feature-card")

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    )
  }, [])

  const features = [
    {
      icon: CalendarCheck,
      color: "text-blue-600",
      bg: "bg-blue-100",
      title: "Asset-Based Scheduling",
      description:
        "Automate recurring inspections based on equipment type and compliance rules.",
    },
    {
      icon: BellRing,
      color: "text-orange-500",
      bg: "bg-orange-100",
      title: "Smart Reminders",
      description:
        "Get notified before deadlines to eliminate missed inspections.",
    },
    {
      icon: FileCheck2,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      title: "Digital Records",
      description:
        "Securely store inspection history and certification documents.",
    },
    {
      icon: BarChart3,
      color: "text-purple-600",
      bg: "bg-purple-100",
      title: "Compliance Insights",
      description:
        "Monitor inspection status with real-time reporting dashboards.",
    },
  ]

  return (
    <div ref={sectionRef} className="my-32 px-24">
      {/* Heading */}
      <section className="flex flex-col items-center text-center gap-4 mb-20">
        <h1 className="text-5xl font-bold">
          Compliance Automation for Safety-Critical Infrastructure
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Streamline inspections for elevators, HVAC systems, cranes, and
          critical equipment with centralized scheduling and monitoring.
        </p>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon

          return (
            <div
              key={index}
              className="feature-card group rounded-2xl border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-3"
            >
              {/* Icon Container */}
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-xl mb-6 ${feature.bg} transition-all duration-300 group-hover:scale-110`}
              >
                <Icon className={`w-7 h-7 ${feature.color}`} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          )
        })}
      </section>
    </div>
  )
}