import heroVideo from "@/assets/videos/banner1.mp4";
import { Button } from "@/components/ui/button";
import Navbar from "../../Navbar";
export default function Banner() {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Navbar */}
        <div className="absolute top-0 left-0 right-0 bg-gray-200/10 backdrop-blur-sm z-20 mx-12 rounded-2xl mt-2">
          <Navbar />
        </div>

        {/* Content */}
        <div className=" relative z-10 flex h-full items-center justify-center text-center text-white/70 px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Never Miss an Inspection
            </h1>
            <p className="mt-4 text-lg text-white/80 w-2/4 mx-auto">
              Inspection automation, standardized compliance reports, and asset monitoring — purpose-built for elevators, AC units, scaffolding, cranes, and safety-sensitive equipment. No spreadsheets.
            </p>
            <Button className="mt-5">Start Basic </Button>
            <section className="mt-8">
              <ul className="flex justify-between items-center">
                <li className="flex flex-col gap-1 items-center justify-center">
                  <strong>500+</strong>
                  <span>Companies Trust Us</span>
                </li>
                <li className="flex flex-col gap-1 items-center justify-center">
                  <strong>99.9%</strong>
                  <span>Subscriber Satisfaction</span>
                </li>
                <li className="flex flex-col gap-1 items-center justify-center">
                  <strong>5k+</strong>
                  <span>Inspection Automated</span>
                </li>
              </ul>
            </section>
          </div>
        </div>

      </section>
    </>
  )
}
