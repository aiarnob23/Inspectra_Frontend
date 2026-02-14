import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Upload,
  Building2,
  Users,
  ClipboardCheck,
  BellRing,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll(".step-card")

    // Horizontal reveal animation
    gsap.fromTo(
      cards,
      { opacity: 0, x: -60, scale: 0.90, filter: "blur(6px)" },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    )


  }, [])

  const steps = [
    {
      icon: Upload,
      title: "Upload Clients",
      description:
        "Import client records quickly via CSV or manual entry.",
    },
    {
      icon: Building2,
      title: "Add Client Assets",
      description:
        "Register elevators, HVAC, cranes and other regulated equipment.",
    },
    {
      icon: Users,
      title: "Upload Employees",
      description:
        "Assign inspectors and responsible team members.",
    },
    {
      icon: ClipboardCheck,
      title: "Create Inspections",
      description:
        "Set inspection frequency based on compliance standards.",
    },
    {
      icon: BellRing,
      title: "Automatic Reminders",
      description:
        "System sends timely alerts before inspection deadlines.",
    },
  ]

  return (
    <section ref={sectionRef} className="my-40 px-24 relative">

      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold mb-4">
          How It Works
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A structured workflow that keeps your inspection process automated and compliant.
        </p>
      </div>


      {/* Steps */}
      <div className="grid grid-cols-5 gap-10">
        {steps.map((step, index) => {
          const Icon = step.icon

          return (
            <div
              key={index}
              className="step-card group rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-6 w-14 h-14 rounded-xl bg-muted flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                <Icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-lg font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}