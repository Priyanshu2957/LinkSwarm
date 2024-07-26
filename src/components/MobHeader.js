import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogOut from "./buttons/LogOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHive } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";

const MobHeader = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);
  return (
    <header className=" bg-white border-b py-4 ">
      <div className=" max-w-4xl flex mx-auto justify-between px-6 sm:flex-wrap">
        <div className="flex items-center gap-6">
          <Link className=" font-bold flex items-center gap-2" href={"/"}>
            <FontAwesomeIcon className=" text-yellow-400 w-4 h-4" icon={faHive} />
            <span>LinkSwarm</span>
          </Link>
        </div>
          <nav className="flex items-center gap-4 text-sm text-slate-500 ">
            {!!session && (
              <>
                <Link className="flex items-center gap-2" href={"/account"}>
                  <img
                    className=" size-7 rounded-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                    src={session.user.image}
                    alt="ERROR"
                  />
                </Link>
                <LogOut />
              </>
            )}
            {!session && (
              <>
                <Link href={"/login"}>Sign-In</Link>
              </>
            )}
          </nav>
        
      </div>
    </header>
  );
};

export default MobHeader;
