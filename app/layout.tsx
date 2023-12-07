import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neo team',
  description: 'Generated by create next app'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/datepicker.min.js" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
