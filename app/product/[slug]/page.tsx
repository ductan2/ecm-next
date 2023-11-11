import { ProductType } from '@/types/product.type'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import relativeTime from "dayjs/plugin/relativeTime"
import ProductImage from '@/components/product/ProductImage'
import ProductLike from '@/components/product/ProductLike'
dayjs.extend(relativeTime)

async function getProductBySlug(slug: string) {
   const res = await fetch(`${process.env.API}/product/${slug}`, {
      method: "GET",
      next: { revalidate: 1 }
   })
   if (!res.ok) {
      throw new Error("Something went wrong!")
   }
   const data = await res.json()
   return data
}

const ProductViewPage = async ({ params }: { params: { slug: string } }) => {
   const { slug } = params
   const product: ProductType = await getProductBySlug(slug)
   return (
      <div className="container my-4">
         <div className="row">
            <div className="col-lg-8 offset-lg-2 card">
               <h1 className="text-center">
                  {product.title}
               </h1>
               <ProductImage product={product} />
               <div className="card-body">
                  <Link href={`/product/${product.slug}`}>
                     <h5 className="card-title">
                        {product.title}
                     </h5>
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: product.description.length > 160 ? product.description.substring(0, 160) : product.description }}>
                  </div>
               </div>
               <div className="card-footer d-flex justify-content-between">
                  <small>{product.category?.name}</small>
                  <small>{product.tags?.map((item) => {
                     return item.name
                  }).join(" ")}</small>
               </div>
               <div className="card-footer d-flex justify-content-between">
                  <small>Posted : {dayjs(product.createdAt).fromNow()}</small>
                  <small>Price : ${product.price}</small>
               </div>
               <div className="card-footer d-flex justify-content-between">
                  <ProductLike product={product} />
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProductViewPage