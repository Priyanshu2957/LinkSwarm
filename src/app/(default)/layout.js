import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import MobHeader from "@/components/MobHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LinkSwarm",
  description: "LinkTree clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=" overflow-hidden">
      <body className={inter.className}>
      <main>
      <nav className=" hidden md:block">
        <Header />
      </nav>
      <nav className=" block md:hidden">
        <MobHeader />
      </nav>
        
     
        {children}
      </main>
        
      </body>
    </html>
  );
}
