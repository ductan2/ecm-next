'use client'

import { useProduct } from "@/context/product"
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loading } from "../Loading";
import { ProductType } from "@/types/product.type";
import { useRouter } from "next/navigation";
import Pagination from "../product/Pagination";
const ProductList = () => {

   const { totalPages, currenPage, setUpdatingProduct, fetchProducts, products } = useProduct();

   const pathname = usePathname();
   const searchParams = useSearchParams();
   const page = Number(searchParams.get("page")) || 1;
   const router = useRouter();
   useEffect(() => {
      fetchProducts(page);
   }, [page])
   const handleUpdate = (product: ProductType) => {
      setUpdatingProduct(product);
      router.push('/dashboard/admin/product')
   }
   if (!products) return <Loading />
   return (
      <>
         <div className="container">
            <div className="row">
               {products.map((product) => (
                  <div key={product._id} className="col-lg-6 card">
                     <div style={{ height: "200px", overflow: "hidden" }}>
                        <Image src={product.images![0].secure_url} alt={product.title} width={500} height={300} style={{
                           objectFit: "cover",
                           height: "100%",
                           width: "100%"
                        }} />
                     </div>
                     <div className="card-body">
                        <h5 className="card-title">

                           <h3 className="cursor-pointer" onClick={() => handleUpdate(product)}>$
                              {product.price} {' '}
                              {product.title}
                           </h3>
                        </h5>
                        <p className="card-text">
                           <div dangerouslySetInnerHTML={{
                              __html: product.description.length < 160 ? product.description
                                 : product.description.substring(0, 160) + "..."
                           }}></div>
                        </p>
                     </div>
                  </div>
               ))}
            </div >
            <Pagination currenPage={currenPage} pathname={pathname} totalPages={totalPages} />
         </div >
      </>
   )
}

export default ProductList