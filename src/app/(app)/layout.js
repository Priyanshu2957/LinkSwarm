import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Toaster } from "react-hot-toast";
import mongoose from "mongoose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faLink } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "next/navigation";
import { Page } from "@/models/Page";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LinkSwarm",
  description: "LinkTree clone",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/');
  }
mongoose.connect(process.env.MONGO_URI);
const page = await Page.findOne({owner: session.user?.email})
  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <main className="md:flex min-h-screen">
        <label htmlFor="navCb" className="md:hidden ml-6 mt-4 p-3 rounded-md bg-white shadow inline-flex items-center gap-2 cursor-pointer">
          <FontAwesomeIcon icon={faBars} />
          <span>Menu</span>
        </label>
        <input id="navCb" type="checkbox" className="hidden" />
        <label htmlFor="navCb" className="hidden backdrop fixed inset-0 bg-black/60 z-10"></label>
          <aside className="bg-white w-48 p-4 pt-2 shadow fixed md:static -left-48 top-0 bottom-0 z-20 transition-all">
          <div className=" sticky top-0 pt-4">
          <div className="w-[90px] h-[90px] mx-auto">
                <div className="overflow-hidden h-full border-gray-400 border-2 rounded-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={session.user?.image}
                    alt={'avatar'}
                    width={128} height={128} />
                </div>
            </div>
            {page &&(
                  <Link
                    target="_blank"
                    href={'/'+page.uri}
                  className=" text-center mt-4 flex gap-1 items-center justify-center">
                    <FontAwesomeIcon icon={faLink} size="lg" className=" text-blue-500" />
                    /
                    <span>
                      {page.uri}
                    </span>
                  </Link>
                )}

            <div className="text-center">
              <Sidebar />
            </div>
          </div>
          
          </aside>
          <div className=" grow">
          {children}</div>
      </main>
        
      </body>
    </html>
  );
}
