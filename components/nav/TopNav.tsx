'use client'
import Link from "next/link"
import Image from "next/image"
import logo from "../../public/favicon.ico"
import { useSession, signOut } from "next-auth/react";
import { Loading } from "../Loading";
import { UserType } from "@/types/user.type";
export const TopNav = () => {

   const { data, status } = useSession();
   return (
      <nav className="nav shadow p-2 justify-content-between mb-3">
         <Link href="/">
            <Image src={logo} alt="logo" width={50} height={50} />
            NEXTECOM
         </Link>
         {status === "authenticated" ? (
            <div className="d-flex">
               <Link href={`/dashboard/${(data.user as UserType).role === "admin" ? "admin" : "user"}`} className="nav-link cursor-pointer">{data.user?.name}</Link>
               <a className="nav-link cursor-pointer" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</a>
            </div>
         ) : status === 'loading' ? (
            <Loading />
         ) : <div className="d-flex">
            <Link href={"/login"} className="nav-link cursor-pointer">Login</Link>
            <Link href={"/register"} className="nav-link cursor-pointer">Register</Link>
         </div>
         }
      </nav >
   )
}
