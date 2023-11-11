import Image from "next/image"
import Link from "next/link"
import dayjs from "dayjs"
import { ProductType } from "@/types/product.type"
import { Loading } from "../Loading"
import relativeTime from "dayjs/plugin/relativeTime"

import ProductLike from "./ProductLike"
dayjs.extend(relativeTime)
type Props = {
   product: ProductType
}
const ProductItem = ({ product }: Props) => {
   if (!product) return <Loading />
   return (
      <div className="card h-100">
         <div style={{ height: "200px", overflow: "hidden" }}>
            <Image src={product.images![0].secure_url} width={500} height={300}
               style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={product.title}></Image>
         </div>

         <div className="card-body">
            <Link href={`/product/${product.slug}`}>
               <h5 className="card-title">
                  {product.title}
               </h5>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: product.description }}>
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
   )
}

export default ProductItem