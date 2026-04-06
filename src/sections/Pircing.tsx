import { motion } from "framer-motion";
import { useState } from "react";

const plans = [
  {
    name: "Explorer",
    price: { monthly: 0, yearly: 0 },
    desc: "Perfect to get started",
    features: [
      "5 mock interviews/month",
      "Basic AI feedback",
      "2 question tracks",
      "Score tracking",
    ],
    cta: "Start Free",
    highlight: false,
    badge: null,
  },
  {
    name: "Pro",
    price: { monthly: 19, yearly: 12 },
    desc: "For serious job seekers",
    features: [
      "Unlimited mock interviews",
      "Deep AI analysis & scoring",
      "All 10+ question tracks",
      "Company-specific questions",
      "Performance dashboard",
      "AI Thinking Mode",
      "Priority support",
    ],
    cta: "Get Pro →",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Team",
    price: { monthly: 49, yearly: 35 },
    desc: "For bootcamps & teams",
    features: [
      "Everything in Pro",
      "Up to 10 seats",
      "Team analytics",
      "Custom question sets",
      "Dedicated onboarding",
    ],
    cta: "Contact Sales",
    highlight: false,
    badge: null,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-28 px-6 bg-galaxy-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-mono text-galaxy-cyan tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full border border-galaxy-cyan/30 bg-galaxy-cyan/10">
            Pricing
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4">
            Invest in your{" "}
            <span className="text-gradient">career.</span>
          </h2>
          <p className="text-galaxy-subtext mb-8">Simple, transparent pricing. No surprises.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 glass rounded-full px-2 py-2">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !yearly ? "bg-galaxy-purple text-white shadow-glow" : "text-galaxy-subtext"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                yearly ? "bg-galaxy-purple text-white shadow-glow" : "text-galaxy-subtext"
              }`}
            >
              Yearly
              <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded-full">
                -35%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative glass rounded-2xl p-7 flex flex-col ${
                plan.highlight
                  ? "border-2 border-galaxy-purple/60 shadow-glowStrong"
                  : "border border-galaxy-border/30"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-galaxy-purple to-galaxy-indigo text-white text-xs font-mono shadow-glow">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display font-bold text-xl text-white mb-1">{plan.name}</h3>
                <p className="text-galaxy-subtext text-sm">{plan.desc}</p>
              </div>

              <div className="mb-7">
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-extrabold text-4xl text-white">
                    ${yearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-galaxy-muted text-sm font-mono">/mo</span>
                  )}
                </div>
                {plan.price.monthly === 0 && (
                  <span className="text-galaxy-muted text-sm">Forever free</span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-galaxy-subtext">
                    <span className="text-galaxy-cyan mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlight
                    ? "bg-linear-to-r from-galaxy-purple to-galaxy-indigo text-white shadow-glow hover:shadow-glowStrong"
                    : "glass text-galaxy-text hover:border-galaxy-purple/40"
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-galaxy-muted text-xs font-mono mt-8"
        >
          All plans include 14-day money-back guarantee · No credit card for free plan
        </motion.p>
      </div>
    </section>
  );
}