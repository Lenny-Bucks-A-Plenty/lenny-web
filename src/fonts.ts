import { Lexend, JetBrains_Mono } from "next/font/google";

export const lexend = Lexend({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const jetbrainsMono = JetBrains_Mono({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-mono',
});
