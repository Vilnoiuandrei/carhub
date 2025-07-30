import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Navigation from "@/app/_components/Navigation";
import ReactQueryProvider from "./_lib/providers";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "CarHub",
  description:
    "Explore the world of cars with CarHub, your ultimate destination for car enthusiasts.",
  icons: {
    icon: "/car.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${inter.className}  min-h-screen bg-gray-950 text-white`}
        >
          <ReactQueryProvider>
            <Suspense>
              <Navigation />
              <main>{children}</main>
            </Suspense>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
