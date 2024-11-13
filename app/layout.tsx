import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Components/Navbar"
import './globals.css'
import SessionProvider from "@/app/Components/SessionProvider";
import { NextUIProvider } from "@nextui-org/react";
import { getServerSession } from "next-auth";
export const metadata = {
  title: 'Expense Tracker',
  description: 'Expense Tracker App build by alemansrao',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="dark text-foreground bg-background min-h-dvh h-fit">
        <SessionProvider session={session}>
          <NextUIProvider>
              <Navbar />
              {children}
          </NextUIProvider>
        </SessionProvider>
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                theme="dark" />
      </body>
    </html>
  )
}
