'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProductSearch = () => {
   const [search, setSearch] = React.useState<string>("")
   const router = useRouter();
   const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
   }
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      router.push(`/?page=1&search=${search}`)
      return;
   }
   return (
      <form action="" onSubmit={handleSubmit}>
         <div className="form-group d-flex  mx-auto" style={{ maxWidth: "400px", alignItems: "center" }}>
            <label htmlFor="" className='mb-0'>Search: </label>
            <input onChange={handleChangeValue} type="text" name="search" className="form-control px-2" />
            <div className="form-group d-flex mb-0" style={{ alignItems: "end" }} >
               <button type="submit" className="btn text-white bg-primary" >Search</button>
            </div>
         </div>
      </form>
   )
}

export default ProductSearch