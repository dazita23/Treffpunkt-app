import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { Shell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Treffpunkt – Gemeinsam statt allein zum Event",
  description: "Entdecke Events in Köln/Bonn und verbinde dich mit Menschen, bevor du hingehst.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5229A5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="font-sans antialiased">
        <AppProvider>
          <Shell>{children}</Shell>
        </AppProvider>
      </body>
    </html>
  );
}
