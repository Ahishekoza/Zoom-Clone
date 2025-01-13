import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import { Toaster } from "@/components/ui/toaster";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "YOOM",
  description: "Video Calling app",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: { logoImageUrl: "/icons/yoom-logo.svg" },
          variables: {
            colorPrimary: "#3b82f6",
            colorBackground: "#1a202c",
            colorInputBackground: "#2D3748",
            colorInputText: "#F3F4F6",
            colorText: "#fff",
          },
        }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-2`}
        >
          {children}
          <Toaster/>
        </body>
      </ClerkProvider>
    </html>
  );
}
