import { ModalState } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "./ui/dialog";
import React from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useProfileStore } from "@/stores/profile";

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
      <DialogContent>
        <DialogHeader className="mx-1 pb-4 border-b">
          <DialogTitle className="text-center text-xl">Profile Information</DialogTitle>
        </DialogHeader>

        <div className="mt-2 w-full grid items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input 
            type="text" 
            id="name" 
            defaultValue={profileStore.name.trim()}
            onChange={(e) => setName(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClick()
              }
            }}
          />
        </div>

        <DialogFooter className="mt-2">
          <Button className="w-full" onClick={onClick}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
