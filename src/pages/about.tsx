import React from "react";
import MainLayout from "@/layouts/main";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BotIcon, UserRoundIcon } from "lucide-react";

const PROFILES = [
  {
    name: "Charles Buffington",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Andrew Jandernoa",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Parker Buszka",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Brandon Amstutz",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Madison Connell",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Lenny Bucks a Plenty",
    about: "QWNjb3JkaW5n dG8 YWxs a25vd24 bGF3cw b2Y YXZpYXRpb24s dGhlcmU aXM bm8 d2F5 YQ YmVl c2hvdWxk YmU YWJsZQ dG8 Zmx5LgpJdHM d2luZ3M YXJl dG9v c21hbGw dG8 Z2V0 aXRz ZmF0 Ym9keQ."
  }
]

export default function AboutPage() {
  return (
    <MainLayout title="Lenny | About">
      <section className="mt-10 ml-auto mr-auto max-w-[800px] pb-6">
        <h2 className="mb-4 text-3xl font-semibold">
          How to Use Lenny
        </h2>

        <ol type="1" className="list-decimal ml-10 flex flex-col gap-10 text-lg">
          <li>
            Select a portfolio to organize your selected stocks.
          </li>
          <li>
            Choose a number of stocks to add to your portfolio.
          </li>
          <li>
            Select stocks to see Lenny's take and additional details.
          </li>
        </ol>
      </section>

      <Separator className="my-10 ml-auto mr-auto max-w-[900px]" />

      <section className="mt-6 ml-auto mr-auto max-w-[800px] pb-6">
        <h2 className="mb-4 text-3xl font-semibold">
          How Lenny Works
        </h2>

        <p className="text-sm">
          Lenny works by using a combination of statistical, mathematical models...
        </p>
      </section>

      <Separator className="my-10 ml-auto mr-auto max-w-[900px]" />

      <section className="mt-6 ml-auto mr-auto max-w-[800px] pb-6">
        <h2 className="mb-6 text-3xl font-semibold">
          Who Are We
        </h2>
        <div className="grid grid-cols-2 border-8 border-double">
          {PROFILES.map((profile) => (
            <div key={profile.name} className="px-6 pt-6 pb-6 flex flex-col items-center border">
              <Avatar className="border-2 items-center justify-center">
                { profile.name === "Lenny Bucks a Plenty"
                  ? <BotIcon />
                  : <UserRoundIcon />
                }
              </Avatar>

              <span className="mt-1 text-sm font-semibold">
                {profile.name}
              </span>

              <p className="mt-3 text-xs font-normal">
                {profile.about}
              </p>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  )
}
