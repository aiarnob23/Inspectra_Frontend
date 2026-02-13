"use client"

import { Pricing } from "../ui/pricing"

const pricingPlans = [
    {
        id: "a5c7b8c0-0776-46d7-bee7-d521b3a86ad4",
        name: "Basic",
        price: "10",
        yearlyPrice: "9",
        period: "per month",
        description: "Best for individuals & small households",
        features: [
            "Limited Acccess",
            "Professional Home services",
            "Up to 12 service per month",
            "Standard response time",
        ],
        buttonText: "Get Started",
        isPopular: false,
    },
    {
        id: "e0057ec4-32ae-40f9-a859-24921a1d9fd8",
        name: "Pro",
        price: "100",
        yearlyPrice: "90",
        period: "per month",
        description: "Best for families & frequent service users",
        features: [
            "Unlimited Access",
            "Access to all service categories",
            "Faster provider response time",
            "Up to 100 service requests per month",
            "Service history & basic tracking",
            "Family account (multiple addresses)",
            "Discounted service charges",
            "Advanced service history & reports",
            "Onboarding: $499 onboarding & training package (waived with annual billing)",
        ],
        buttonText: "Get Pro",
        isPopular: true,
    },
    {
        id: "ab43db06-8057-49cc-af54-9f2b7ff2c1d5",
        name: "Enterprise",
        price: "200",
        yearlyPrice: "180",
        period: "per month",
        description: "Best for offices & property managers",
        features: [
            "Unlimited Access",
            "Access to all service categories",
            "Faster provider response time",
            "Up to 100 service requests per month",
            "Service history & basic tracking",
            "Family account (multiple addresses)",
            "Discounted service charges",
            "Advanced service history & reports",
            "Onboarding: $499 onboarding & training package (waived with annual billing)",
        ],
        buttonText: "Get Enterprise",
        isPopular: false,
    },
]

function MembershipPlans() {
    const handlePayment = async (planId: string) => {
        console.log(planId)
        try {

            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/payments/initiate`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        planId,
                        currency: "USD",
                        provider: "stripe",
                    }),
                }
            );

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Payment failed")
            }

            console.log("Payment response:", data)

            if (data.data?.checkoutUrl) {
                window.location.href = data.data.checkoutUrl
            }

        } catch (error: any) {
            console.error(error)
            alert(error.message)
        }
    }

    const plansWithAction = pricingPlans.map((plan) => ({
        ...plan,
        onClick: () => handlePayment(plan.id),
    }))

    return (
        <div className="rounded-lg" id="pricing-plans">
            <Pricing
                plans={plansWithAction}
                title="Simple, Transparent Pricing"
                description="Choose the plan that fits your needs."
            />
        </div>
    )
}

export { MembershipPlans }
