/* eslint-disable react/no-unescaped-entities */
import UserForm from "@/components/form/UserForm";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" bg-hero-patt bg-cover bg-center bg-fixed h-screen">
      <main className=" backdrop-blur-[8px] bg-black/20 h-screen w-full ">
        <section className=" p-6 pt-40 max-w-4xl mx-auto">
          <div className="max-w-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <h1 className="text-4xl sm:text-6xl font-bold text-white">
              One Page Infinite Connections
            </h1>
            <h2 className="mt-6 text-lg sm:text-xl text-gray-200">
              Many users already joined, So what you're waiting for
              <span className="font-bold text-sky-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {" "}
                JOIN NOW!!
              </span>
            </h2>
          </div>

          <UserForm user={session?.user} />
        </section>
      </main>
    </div>
  );
};

export default Home;
