import React from "react";
import dayjs from "dayjs";
import MainLayout from "@/layouts/main";
import { useProfileStore } from "@/stores/profile";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { roboto, robotoMono } from "@/fonts";

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
      <section className="mt-10 ml-auto mr-auto max-w-[800px] pb-6 border-b">
        <div>
          <div className="mt-2 w-full grid items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input 
              className="max-w-96"
              type="text" 
              id="name" 
              defaultValue={profileStore.name.trim()}
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <div className="mt-4">
            <Button onClick={onUpdateName}>
              Save
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-6 ml-auto mr-auto max-w-[800px] pb-6">
        <h3 className="text-2xl font-semibold">
          Analysis History
        </h3>
        <ScrollArea className="mt-2 h-[400px] border rounded-md">
          <div className="mt-3 flex flex-col gap-2">
            {profileStore.analysisLogs.map((log) => (
              <>
                <div className="flex flex-col gap-0.5 px-4 py-1" suppressHydrationWarning>
                  <span className={`font-base text-sm ${robotoMono.className}`}>
                    {dayjs(log.timestamp).format('YYYY-MM-DD HH:mm:ssA')}
                  </span>

                  <span className="mt-1 font-light text-sm">
                    {log.content}
                  </span>
                </div>

                <Separator className="mt-1" />
              </>
            ))}
          </div>
        </ScrollArea>
      </section>
    </MainLayout>
  )
}
