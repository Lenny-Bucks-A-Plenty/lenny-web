import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useProfileStore } from '@/stores/profile';

type Props = {
  children: React.ReactNode;
  title?: string;
}

export default function MainLayout({
  children,
  title
}: Props) {

  const profileStore = useProfileStore();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Lenny Bucks a Plenty" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <div className="border-b">
        <section className="ml-auto mr-auto h-24 max-w-[1000px] flex flex-row items-center pl-4 pr-6">
          <div className="flex flex-row gap-4">
            <div>
              <Link href={'/'}>
                <Image
                  alt="logo"
                  height={96}
                  width={96}
                  className="object-fit scale-125"
                  src="/logo.png"
                />
              </Link>
            </div>

            <div className="flex flex-col justify-center gap-[1px]">
              <h1 className="text-3xl font-semibold">
                Lenny Bucks a Plenty
              </h1>
              <span className="text-sm font-medium">
                The Friendly Broker Bot
              </span>
            </div>
          </div>

          <div className="flex-1"></div>

          <div className="ml-8">
            <Link href={'/profile'}>
              <div className="flex flex-col items-center justify-center gap-2 p-2 rounded-xl hover:bg-gray-100">
                <Avatar className="border border-[#2D2A32] size-9">
                  <AvatarImage 
                    src={`https://source.boringavatars.com/marble/120/${encodeURIComponent(profileStore.name)}`} 
                    className="scale-125"
                  />
                </Avatar>

                <span className="text-xs font-medium text-center">
                  {profileStore.name}
                </span>
              </div>
            </Link>
          </div>
        </section>
      </div>

      <main>
        {children}
      </main>
    </>
  )
}
