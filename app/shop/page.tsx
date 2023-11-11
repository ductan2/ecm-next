import Pagination from '@/components/product/Pagination'
import ProductFilter from '@/components/product/ProductFilter'
import ProductItem from '@/components/product/ProductItem'
import { FilterProduct, ProductType } from '@/types/product.type'
import React from 'react'
import toast from 'react-hot-toast'


interface ShopPageProps {
   searchParams: FilterProduct
}
const fetchProduct = async (searchParams: FilterProduct) => {
   const searchQuery = new URLSearchParams({
      page: searchParams.page || "1",
      category: searchParams.category || "",
      tag: searchParams.tag || "",
      brand: searchParams.brand || "",
      minPrice: searchParams.minPrice || "",
      maxPrice: searchParams.maxPrice || "",
   }).toString()


   try {
      const response = await fetch(`${process.env.API}/product/filters/?${searchQuery}`, {
         method: 'GET',
      })
      const data = await response.json()
      if (!response.ok) {
         toast.error(data.error)
      }
      return data
   } catch (error) {
      return { products: [], currenPage: 1, totalPages: 1 }
   }
}

const page: React.FC<ShopPageProps> = async ({ searchParams }) => {

   const { currenPage, totalPages, products } = await fetchProduct(searchParams)

   return (
      <div className='container-fulid'>
         <div className="row">
            <div className="col-lg-3">
               <ProductFilter searchParams={searchParams} />
            </div>
            <div className="col-lg-9" >
               <div className="row">
                  {products.map((product: ProductType) => {
                     return <div key={product._id} className='col-4 mb-5'>
                        <ProductItem product={product} />
                     </div>
                  })}

               </div>
               <Pagination searchParams={searchParams} currenPage={currenPage} pathname='/shop' totalPages={totalPages} />
            </div>
         </div>
      </div>
   )
}

export default page