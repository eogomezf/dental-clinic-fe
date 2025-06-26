<<<<<<< HEAD
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth/context";
import PageLoader from "./components/Loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
=======
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './auth/context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a
});

export const metadata: Metadata = {
  title: "Dentora Pro",
  description:
<<<<<<< HEAD
    "Dentora Pro is a powerful and flexible dental clinics appointments web applications",
=======
    'Dentora Pro is a powerful and flexible dental clinics appointments web applications'
>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
<<<<<<< HEAD
        <AuthProvider>
          <PageLoader />
          {children}
        </AuthProvider>
=======
        <AuthProvider>{children}</AuthProvider>
>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a
      </body>
    </html>
  );
}