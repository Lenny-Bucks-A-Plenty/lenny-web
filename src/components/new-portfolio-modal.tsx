import React from "react";
import { PlusCircleIcon, FolderPlusIcon } from "lucide-react";
import type { ModalState } from "@/lib/utils"
import { usePortfolios } from "@/stores/portfolio";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  state: ModalState;
}

export default function NewPortfolioModal({
  state
}: Props) {

  const [title, setTitle] = React.useState<string>("");
  const { createPortfolio } = usePortfolios();

  function onCreate() {
    if (title.trim().length !== 0) {
      createPortfolio(title);
      setTitle('');
      state.set('closed');
    }
  }

  return (
    <Dialog open={state.state === "open" ? true : false} onOpenChange={(open) => !open && state.set("closed")}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)]/20">
              <FolderPlusIcon className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <div>
              <DialogTitle className="text-lg">New Portfolio</DialogTitle>
              <DialogDescription>Create a new portfolio to organize your stock picks.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Portfolio Name</Label>
            <Input 
              type="text" 
              id="title"
              placeholder="e.g., Tech Growth, Dividend Stocks..."
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onCreate()
                }
              }}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button 
            variant="secondary" 
            onClick={() => state.set("closed")}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button 
            onClick={onCreate}
            disabled={title.trim().length === 0}
            className="flex-1 sm:flex-none"
          >
            <PlusCircleIcon className="mr-2 w-4 h-4" />
            Create Portfolio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
