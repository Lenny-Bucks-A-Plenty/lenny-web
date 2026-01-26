import React from "react";
import dayjs from "dayjs";
import MainLayout from "@/layouts/main";
import { useProfileStore } from "@/stores/profile";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserCircleIcon, HistoryIcon, SaveIcon } from "lucide-react";

export default function ProfilePage() {

  const profileStore = useProfileStore();
  const [name, setName] = React.useState<string>("");
  
  function onUpdateName() {
    if (name.trim().length !== 0) {
      profileStore.setName(name.trim());
    }
  }

  return (
    <MainLayout title="Lenny | Profile">
      {/* Profile Settings Card */}
      <section className="mx-auto mt-10 max-w-[800px] rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-muted)] p-6 shadow-card animate-fade-up">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-[var(--accent-soft)] to-[var(--surface)] border border-[var(--accent)]/20 shadow-glow-sm">
            <UserCircleIcon className="w-6 h-6 text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[var(--text)]">Profile Settings</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Update your display name for portfolios and analysis history.
            </p>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input 
              className="max-w-md"
              type="text" 
              id="name"
              placeholder="Enter your name..."
              defaultValue={profileStore.name.trim()}
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <Button onClick={onUpdateName} disabled={name.trim().length === 0}>
            <SaveIcon className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </section>

      {/* Analysis History Card */}
      <section className="mx-auto mt-6 max-w-[800px] rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-muted)] p-6 shadow-card animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface)] border border-[var(--border)] shadow-card">
            <HistoryIcon className="w-6 h-6 text-[var(--text-muted)]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--text)]">
              Analysis History
            </h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Recent AI-powered stock analyses and recommendations.
            </p>
          </div>
        </div>

        <Separator className="mb-4" />

        <ScrollArea className="h-[420px] rounded-xl border border-[var(--border)] bg-[var(--bg-deep)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
          <div className="flex flex-col">
            {profileStore.analysisLogs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--surface-raised)] flex items-center justify-center mb-3">
                  <HistoryIcon className="w-6 h-6 text-[var(--text-dim)]" />
                </div>
                <p className="text-sm text-[var(--text-muted)]">No analysis history yet</p>
                <p className="text-xs text-[var(--text-dim)] mt-1">Start analyzing stocks to see history here</p>
              </div>
            )}
            {profileStore.analysisLogs.map((log, index) => (
              <React.Fragment key={log.timestamp.toString()}>
                <div 
                  className="flex flex-col gap-1.5 px-5 py-4 hover:bg-[var(--surface-muted)]/30 transition-colors" 
                  suppressHydrationWarning
                >
                  <span className="text-xs font-mono font-medium text-[var(--accent)] tabular-nums">
                    {dayjs(log.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                  <span className="text-sm text-[var(--text)]">
                    {log.content}
                  </span>
                </div>
                {index < profileStore.analysisLogs.length - 1 && (
                  <Separator />
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </section>
    </MainLayout>
  )
}
