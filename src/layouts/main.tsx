import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon } from 'lucide-react';
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
        <meta name="description" content="Lenny Bucks a Plenty - The Friendly Broker Bot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl animate-fade-down">
        <section className="mx-auto flex h-20 max-w-[1000px] items-center gap-6 px-6">
          {/* Back button + Logo */}
          <div className="flex flex-row items-center gap-4">
            <Link 
              href="/"
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-glow-sm"
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </Link>

            <div className="flex flex-row items-center gap-4">
              <div className="rounded-xl bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface)] p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_10px_30px_-15px_rgba(0,0,0,0.5)]">
                <Link href={'/'}>
                  <Image
                    alt="Lenny logo"
                    height={48}
                    width={48}
                    className="object-contain drop-shadow-[0_4px_12px_rgba(229,163,77,0.2)]"
                    src="/logo.png"
                  />
                </Link>
              </div>

              <div className="flex flex-col justify-center">
                <h1 className="text-xl font-semibold tracking-tight text-[var(--text)]">
                  Lenny Bucks a Plenty
                </h1>
                <span className="text-xs font-medium text-[var(--text-dim)]">
                  The Friendly Broker Bot
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1"></div>

          {/* User avatar */}
          <Link href={'/profile'}>
            <div className="flex items-center gap-3 rounded-md border border-transparent px-3 py-2 transition-all hover:border-[var(--border)] hover:bg-[var(--surface-muted)]">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-[var(--text)]">
                  {profileStore.name}
                </span>
                <span className="text-xs text-[var(--text-dim)]">
                  View Profile
                </span>
              </div>
              <Avatar className="h-9 w-9 ring-[var(--accent)]/50 rounded-md">
                <AvatarImage 
                  src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Aidan"
                  className="scale-125"
                />
              </Avatar>
            </div>
          </Link>
        </section>
      </header>

      <main className="pb-12 animate-fade-up" style={{ animationDelay: '100ms' }}>
        {children}
      </main>
    </>
  )
}
