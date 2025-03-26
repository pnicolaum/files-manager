import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Files Manager",
  description: "Customize and manipulate your files such as PDFs and images.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <div className="grid grid-cols-[1fr_4fr] p-2">
          {/* Sidebar fijo */}
          <aside className="bg-blue-500 text-white p-2 h-screen" >
            <ul className="space-y-2">
              <li>
                <Link href="/">HOME</Link>
              </li>
              <li>
                <Link href="/pdf-splitter">PDF Splitter</Link>
              </li>
              <li>
                <Link href="/pdf-binder">PDF Binder</Link>
              </li>
              <span>---------------------</span>
              <li>
                <Link href="/pdf-to-jpg">PDF to JPG</Link>
              </li>
              <li>
                <Link href="/jpg-to-pdf">JPG to PDF</Link>
              </li>
              <span>---------------------</span>
              <li>
                <Link href="/jpg-to-png">JPG TO PNG</Link>
              </li>
              <li>
                <Link href="/png-to-jpg">PNG TO JPG</Link>
              </li>
            </ul>
          </aside>
          {/* Contenido dinámico que variará según la página */}
          <main className="">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
