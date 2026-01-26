import React from "react";
import MainLayout from "@/layouts/main";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  BotIcon, 
  UserRoundIcon, 
  BookOpenIcon, 
  CpuIcon, 
  UsersIcon,
  SparklesIcon,
  TrendingUpIcon,
  BarChart3Icon,
  BrainCircuitIcon
} from "lucide-react";

const PROFILES = [
  {
    name: "Charles Buffington",
    role: "Lead Developer",
    about: "Full-stack engineer with a passion for building intuitive financial tools."
  },
  {
    name: "Andrew Jandernoa",
    role: "Backend Engineer",
    about: "Specializes in high-performance data pipelines and API architecture."
  },
  {
    name: "Parker Buszka",
    role: "ML Engineer",
    about: "Machine learning specialist focused on predictive modeling for markets."
  },
  {
    name: "Brandon Amstutz",
    role: "Data Scientist",
    about: "Expert in quantitative analysis and statistical modeling."
  },
  {
    name: "Madison Connell",
    role: "Frontend Engineer",
    about: "Creates beautiful, accessible interfaces with attention to detail."
  },
  {
    name: "Lenny Bucks a Plenty",
    role: "AI Assistant",
    about: "Your friendly AI-powered broker bot, always ready to help analyze stocks!"
  }
]

const STEPS = [
  {
    number: "01",
    title: "Select a Portfolio",
    description: "Choose or create a portfolio to organize your stock selections and track your analysis."
  },
  {
    number: "02",
    title: "Add Stocks",
    description: "Search and add stocks from the S&P 500 to your portfolio for analysis."
  },
  {
    number: "03",
    title: "Get Insights",
    description: "Select a stock to view price history, technical indicators, and Lenny's AI recommendation."
  }
]

const FEATURES = [
  {
    icon: TrendingUpIcon,
    title: "Linear Regression",
    description: "Identifies price trends and projects future movement based on historical patterns."
  },
  {
    icon: BarChart3Icon,
    title: "Momentum Oscillator",
    description: "Measures rate of price change to identify overbought or oversold conditions."
  },
  {
    icon: BrainCircuitIcon,
    title: "Bollinger Bands",
    description: "Analyzes volatility and relative price levels using statistical bands."
  }
]

export default function AboutPage() {
  return (
    <MainLayout title="Lenny | About">
      {/* How to Use Section */}
      <section className="mx-auto mt-10 max-w-[900px] rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-muted)] p-8 shadow-card animate-fade-up">
        <div className="flex items-start gap-4 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-[var(--accent-soft)] to-[var(--surface)] border border-[var(--accent)]/20 shadow-glow-sm">
            <BookOpenIcon className="w-6 h-6 text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[var(--text)]">
              How to Use Lenny
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Get started with stock analysis in three simple steps.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, index) => (
            <div 
              key={step.number}
              className="relative rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 transition-all hover:border-[var(--border-strong)] hover:shadow-card animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="absolute -top-3 -left-2 text-5xl font-bold text-[var(--accent)]/10 font-mono">
                {step.number}
              </span>
              <div className="relative">
                <h3 className="text-base font-semibold text-[var(--text)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-8 mx-auto max-w-[900px]" />

      {/* How Lenny Works Section */}
      <section className="mx-auto max-w-[900px] rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-muted)] p-8 shadow-card animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-start gap-4 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface)] border border-[var(--border)] shadow-card">
            <CpuIcon className="w-6 h-6 text-[var(--text-muted)]" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[var(--text)]">
              How Lenny Works
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Powered by a combination of statistical and mathematical models.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <div 
              key={feature.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-deep)] p-5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] animate-fade-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent)]/20 mb-4">
                <feature.icon className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <h3 className="text-base font-semibold text-[var(--text)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-[var(--accent-soft)]/50 border border-[var(--accent)]/20">
          <div className="flex items-start gap-3">
            <SparklesIcon className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" />
            <p className="text-sm text-[var(--text-muted)]">
              Lenny combines these models to generate comprehensive buy, sell, or wait recommendations based on current market conditions and historical price patterns.
            </p>
          </div>
        </div>
      </section>

      <Separator className="my-8 mx-auto max-w-[900px]" />

      {/* Team Section */}
      <section className="mx-auto mb-12 max-w-[900px] rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-muted)] p-8 shadow-card animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-start gap-4 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface)] border border-[var(--border)] shadow-card">
            <UsersIcon className="w-6 h-6 text-[var(--text-muted)]" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[var(--text)]">
              Meet the Team
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              The people behind Lenny Bucks a Plenty.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILES.map((profile, index) => {
            const isLenny = profile.name === "Lenny Bucks a Plenty";
            return (
              <div 
                key={profile.name} 
                className={`flex flex-col items-center rounded-xl border p-5 text-center transition-all hover:shadow-card animate-fade-up ${
                  isLenny 
                    ? 'border-[var(--accent)]/30 bg-[var(--accent-soft)]' 
                    : 'border-[var(--border)] bg-[var(--surface-muted)] hover:border-[var(--border-strong)]'
                }`}
                style={{ animationDelay: `${(index + 6) * 75}ms` }}
              >
                <Avatar className={`w-14 h-14 ${isLenny ? 'ring-[var(--accent)]' : 'ring-[var(--border)]'}`}>
                  <AvatarFallback className={isLenny ? 'bg-[var(--accent)] text-[var(--bg-deep)]' : 'bg-[var(--surface-raised)]'}>
                    {isLenny 
                      ? <BotIcon className="w-6 h-6" />
                      : <UserRoundIcon className="w-6 h-6 text-[var(--text-muted)]" />
                    }
                  </AvatarFallback>
                </Avatar>

                <span className={`mt-3 text-sm font-semibold ${isLenny ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
                  {profile.name}
                </span>

                <span className="text-xs font-medium text-[var(--text-dim)] mt-0.5">
                  {profile.role}
                </span>

                <p className="mt-3 text-xs text-[var(--text-muted)]">
                  {profile.about}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </MainLayout>
  )
}
