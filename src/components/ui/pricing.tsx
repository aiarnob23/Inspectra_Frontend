import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import { Check, Star } from "lucide-react";

// 🧩 Simple utility (replaces Next.js cn)
function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

// 🧩 Simple button variant utility (replaces buttonVariants)
function buttonVariants({ variant }: { variant?: "outline" | "solid" }) {
    const base =
        "inline-flex justify-center items-center rounded-md border font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
    if (variant === "outline") {
        return `${base} border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 hover:border-gray-400`;
    }
    return `${base} bg-blue-600 text-white hover:bg-blue-700`;
}

// 🧩 Simple Switch component with forwarded ref
interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
    ({ checked, onCheckedChange }, ref) => {
        return (
            <button
                ref={ref}
                onClick={() => onCheckedChange(!checked)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? "bg-primary" : "bg-gray-300"
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${checked ? "translate-x-6" : "translate-x-1"
                        }`}
                />
            </button>
        );
    }
);

Switch.displayName = "Switch";

// 🧩 Hook for media query
function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(
        () => window.matchMedia(query).matches
    );
    React.useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);
    return matches;
}

// 🧩 Types
interface PricingPlan {
    id: string
    name: string;
    price: string;
    yearlyPrice: string;
    period: string;
    features: string[];
    description: string;
    buttonText: string;
    href?: string;
    isPopular: boolean;
    onClick?: () => void;
}

interface PricingProps {
    plans: PricingPlan[];
    title?: string;
    description?: string;
}

// 🧩 Main Component
export const Pricing: React.FC<PricingProps> = ({ plans }) => {
    const [isMonthly, setIsMonthly] = useState(true);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const switchRef = useRef<HTMLButtonElement>(null);

    const handleToggle = (checked: boolean) => {
        setIsMonthly(!checked);

        if (checked && switchRef.current) {
            const rect = switchRef.current.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            confetti({
                particleCount: 50,
                spread: 60,
                origin: {
                    x: x / window.innerWidth,
                    y: y / window.innerHeight,
                },
                colors: ["#3b82f6", "#10b981", "#facc15", "#f87171"],
                ticks: 200,
                gravity: 1.2,
                decay: 0.94,
                startVelocity: 30,
                shapes: ["circle"],
            });
        }
    };

    return (
        <div className="container mx-auto py-5 px-12">
            <div className="flex justify-center mb-10">
                <label className="flex items-center gap-3 cursor-pointer">
                    <Switch ref={switchRef} checked={!isMonthly} onCheckedChange={handleToggle} />
                    <span className="font-semibold">
                        Annual billing <span className="text-primary">(Save 10%)</span>
                    </span>
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 1 }}
                        whileInView={
                            isDesktop
                                ? {
                                    y: plan.isPopular ? -20 : 0,
                                    opacity: 1,
                                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                                }
                                : {}
                        }
                        viewport={{ once: true }}
                        transition={{
                            duration: 1.6,
                            type: "spring",
                            stiffness: 100,
                            damping: 30,
                            delay: 0.4,
                        }}
                        className={cn(
                            "rounded-2xl border p-6 text-center relative shadow-sm flex flex-col justify-between",
                            plan.isPopular
                                ? "border-none  p-6 lg:p-7 bg-linear-to-b from-primary/80 to-primary/30 shadow-[0_50px_100px_0_rgba(0,0,0,0.04),0_8.148px_6.519px_0_rgba(0,0,0,0.01)] border-2"
                                : "border-primary/40 bg-primary/10 text-card-foreground"
                        )}
                    >
                        {plan.isPopular && (
                            <div className="absolute top-2 right-2 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                                <Star className="text-white h-4 w-4 fill-current" />
                                <span className="text-white ml-1 font-semibold">Popular</span>
                            </div>
                        )}

                        <div className="mb-12">
                            {/* Plan Name */}
                            <p
                                className={cn(
                                    "text-base font-semibold text-foreground"
                                )}
                            >
                                {plan.name}
                            </p>

                            {/* Price */}
                            <div className="mt-6 flex items-center justify-center gap-x-2">
                                <span
                                    className={cn(
                                        "text-5xl font-bold tracking-tight text-foreground"
                                    )}
                                >
                                    <NumberFlow
                                        value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                                        format={{
                                            style: "currency",
                                            currency: "USD",
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }}
                                    />
                                </span>
                                <span
                                    className={cn(
                                        "text-sm font-semibold leading-6 tracking-wide text-foreground"
                                    )}
                                >
                                    / {plan.period}
                                </span>
                            </div>

                            {/* Billing info */}
                            <p
                                className={cn(
                                    "text-xs mt-1 text-foreground"
                                )}
                            >
                                {isMonthly ? "Billed monthly" : "Billed annually"}
                            </p>

                            {/* Features */}
                            <ul className="mt-5 flex flex-col gap-4">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <Check
                                            className={cn(
                                                "h-4 w-4 mt-1 shrink-0 text-blue-600"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "text-left text-foreground"
                                            )}
                                        >
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {plan.onClick ? (
                            <button
                                onClick={plan.onClick}
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "w-full py-2 text-lg font-semibold",
                                    plan.isPopular
                                        ? "text-primary bg-white"
                                        : "border-primary/70 text-primary"
                                )}
                            >
                                {plan.buttonText}
                            </button>
                        ) : (
                            <a
                                href={plan.href}
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "w-full py-2 text-lg font-semibold",
                                    plan.isPopular
                                        ? "text-primary bg-white"
                                        : "border-primary/70 text-primary"
                                )}
                            >
                                {plan.buttonText}
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
