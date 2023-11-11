'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Register = () => {
   const router = useRouter();
   const [name, setName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         setLoading(true);
         const response = await fetch(`${process.env.API}/register`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name, email, password
            })
         })
         const data = await response.json();
         if (!response.ok) {
            toast.error(data.error)
            setLoading(false);
         }
         else {
            toast.success(data.message)
            router.push("/login")
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
                  <h2 className='mb-4 text-center'>Register</h2>
                  <form action="" onSubmit={handleSubmit}>
                     <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                        className='form-control mb-4' placeholder='Enter your name' />
                     <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                        className='form-control mb-4' placeholder='Enter your email' />
                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className='form-control mb-4' placeholder='Enter your password' />
                     <button className='btn btn-primary btn-raised' disabled={loading || !name || !email || !password}>
                        {loading ? "Loading..." : "Register"}
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </main>
   )
}

export default Register