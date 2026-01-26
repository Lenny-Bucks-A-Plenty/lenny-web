import type { ModalState } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "./ui/dialog";
import React from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useProfileStore } from "@/stores/profile";
import { UserCircleIcon, SparklesIcon } from "lucide-react";

type Props = {
  state: ModalState;
}

export default function ProfileInfoModal({
  state
}: Props) {

  const [name, setName] = React.useState<string>("");

  const profileStore = useProfileStore();

  function onClick() {
    if (name.trim().length !== 0) {
      profileStore.setName(name.trim());
      state.set('closed');
    }
  }

  return (
    <Dialog open={state.state === "open" ? true : false}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pb-4 border-b border-[var(--border)]">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-[var(--accent-soft)] to-[var(--surface)] border border-[var(--accent)]/20 shadow-glow-sm">
                <UserCircleIcon className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <div className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--accent)] shadow-glow-sm">
                <SparklesIcon className="w-3 h-3 text-[var(--bg-deep)]" />
              </div>
            </div>
            <div>
              <DialogTitle className="text-xl">Welcome to Lenny</DialogTitle>
              <DialogDescription className="mt-1">
                Enter your name to personalize your experience and get started.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input 
              type="text" 
              id="name"
              placeholder="Enter your name..."
              defaultValue={profileStore.name.trim()}
              onChange={(e) => setName(e.target.value)} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onClick()
                }
              }}
              autoFocus
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button 
            className="w-full" 
            onClick={onClick}
            disabled={name.trim().length === 0}
          >
            Get Started
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
