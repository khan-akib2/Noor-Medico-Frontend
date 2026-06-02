import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: "NOOR MEDICO | Premium Pharmacy, Chemist & Druggist in Mumbra, Thane",
  description: "NOOR MEDICO is a trusted Medical Store providing 100% genuine prescription medicines, OTC drugs, health essentials, insulin cold storage, and daily wellness products with professional care in Mumbra, Thane. Phone: 8828081398.",
  keywords: ["Noor Medico", "Chemist in Mumbra", "Medical Store Thane", "Pharmacy Mumbra", "Genuine Medicines Thane", "Insulin Storage Chemist"],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "NOOR MEDICO | Premium Pharmacy, Chemist & Druggist",
    description: "Your trusted pharmacy partner for authentic health essentials and prescription drugs in Mumbra, Thane.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Noor Medico Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOOR MEDICO | Premium Pharmacy, Chemist & Druggist",
    description: "Your trusted pharmacy partner for authentic health essentials and prescription drugs in Mumbra, Thane.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-teal-500/10 selection:text-teal-800">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
