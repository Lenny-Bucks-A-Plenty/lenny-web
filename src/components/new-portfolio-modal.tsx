import React from "react";
import { PlusCircleIcon } from "lucide-react";
import { ModalState } from "@/lib/utils"
import { useStore } from "@/stores";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
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
  const { createPortfolio } = useStore();

  function onCreate() {
    if (title.trim().length !== 0) {
      createPortfolio(title);
      setTitle('');
      state.set('closed');
    }
  }

  return (
    <Dialog open={state.state === "open" ? true : false} onOpenChange={(open) => !open && state.set("closed")}>
      <DialogContent>
        <DialogHeader className="mx-1 pb-4 border-b">
          <DialogTitle className="text-center text-xl">New Portfolio</DialogTitle>
        </DialogHeader>

        <div className="mt-2 w-full grid items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input 
            type="text" 
            id="title" 
            onChange={(e) => setTitle(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onCreate()
              }
            }}
          />
        </div>

        <DialogFooter className="mt-2">
          <Button className="w-full" onClick={onCreate}>
            <PlusCircleIcon className="mr-2 size-4" />
            Create Portfolio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
