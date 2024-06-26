import Providers from "@/components/shared/Providers"
import { Toaster } from "@/components/ui/toaster"
import ClientThemeWrapper from "@/context/ClientThemeWrapper"
import { ThemeProvider } from "@/context/ThemeContext"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Easy Meal",
  description: "No more headaches for planning your meals",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={dmSans.className}>
            {/* <body> */}
            <ThemeProvider>
              <ClientThemeWrapper>
                {children}
                <Toaster />
              </ClientThemeWrapper>
            </ThemeProvider>
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  )
}
