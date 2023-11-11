'use client'
import { ProductType } from '@/types/product.type'
import { UserType } from '@/types/user.type'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineDislike } from "react-icons/ai"
import toast from 'react-hot-toast'
import { AiOutlineLike } from "react-icons/ai"
const ProductLike = ({ product }: { product: ProductType }) => {
   const { status, data } = useSession();
   const [likes, setLikes] = React.useState(product.likes || [])
   const router = useRouter();
   const pathname = usePathname();
   const isLike = likes.find((like) => like.user === (data?.user as UserType)?._id)
   const handleLike = async () => {
      if (status === "unauthenticated") {
         toast.error("You must be logged in to like a product")
         router.push(`/login?callbackUrl=${pathname}`)
         return;
      }
      if (isLike) {
         const res = await fetch(`${process.env.API}/user/unlike`, {
            method: "PUT",
            body: JSON.stringify({ product_id: product._id }),
         })
         if (!res.ok) {
            toast.error("Something went wrong")
            return;
         }
         const data = await res.json();
         setLikes(data.likes)
         toast.success("Unlike successfully")

      }
      else {
         const res = await fetch(`${process.env.API}/user/like`, {
            method: "PUT",
            body: JSON.stringify({ product_id: product._id }),
         })
         if (!res.ok) {
            toast.error("Something went wrong")
            return;
         }
         const data = await res.json();
         toast.success("Like successfully")
         setLikes(data.likes)
      }
   }

   return (
      <>
         <span className="cursor-pointer" onClick={handleLike}>{isLike === undefined ? <>
            <AiOutlineLike /> like
         </> :
            <>
               <AiOutlineDislike /> dislike
            </>} </span>
         <small>{
            likes && likes.length > 0 ?
               likes?.length + "people like" : "Be the first to like this"
         }</small>
      </>
   )
}

export default ProductLike