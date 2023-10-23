'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { signIn } from "next-auth/react"
const Login = () => {
   const router = useRouter();
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
   const searchParams = useSearchParams();
   const callBackUrl = searchParams.get("callbackUrl") || "/"; // use to redirect page after login 
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         setLoading(true);
         const result= await signIn("credentials", {
            redirect: false,
            email, password
         })
         if(result?.error){
            toast.error(result.error)
            setLoading(false);
         }else {
            console.log(result)
            toast.success("Login successfully")
            router.push(callBackUrl)
         }
      } catch (error) {
         console.log(error)
         setLoading(false);
      }
   }
   return (
      <main>
         <div className="container">
            <div className="row d-flex justify-content-center align-items-center vh-100">
               <div className="col-lg-5 shadow bg-light-5 p-5" >
                  <h2 className='mb-4 text-center'>Login</h2>
                  <form action="" onSubmit={handleSubmit}>

                     <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                        className='form-control mb-4' placeholder='Enter your email' />
                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className='form-control mb-4' placeholder='Enter your password' />
                     <button className='btn btn-primary btn-raised' disabled={loading || !email || !password}>
                        {loading ? "Loading..." : "Login"}
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </main>
   )
}

export default Login