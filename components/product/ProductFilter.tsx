'use client'
import { useCategory } from "@/context/category";
import { useProduct } from "@/context/product";
import { useTag } from "@/context/tag";
import { FilterProduct } from "@/types/product.type";
import { rangePrice } from "@/utils/filterData";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const ProductFilter = ({ searchParams }: { searchParams: FilterProduct }) => {
   const pathname = "/shop"
   const { fetchCategory, categories } = useCategory();
   const { fetchTag, tags } = useTag();
   const { fetchBrands, brands } = useProduct();

   useEffect(() => {
      fetchCategory()
      fetchTag()
      fetchBrands()
   }, [])

   const { brand, category, maxPrice, minPrice, page, tag } = searchParams;
   const router = useRouter()
   const handleRemove = (filter: keyof FilterProduct | [keyof FilterProduct, keyof FilterProduct]) => {
      const updatedSearchParams = { ...searchParams }

      if (typeof filter === "string") {
         delete updatedSearchParams[filter]
      }
      if (Array.isArray(filter)) {
         filter.forEach((item) => {
            delete updatedSearchParams[item]
         })
      }
      updatedSearchParams.page = "1"
      const queryString = new URLSearchParams(updatedSearchParams).toString()
      const newUrl = `${pathname}?${queryString}`
      router.push(newUrl)
   }
   return (
      <div>
         <div className="text-primary alert alert-secondary">
            <h1 className="lead text-center text-danger">Filter product</h1>
            <div className="mt-5">
               <h5>Price</h5>
               <div className="row d-flex align-items-center mx-1">
                  {rangePrice.map((item, index) => {
                     const url = {
                        pathname,
                        query: {
                           ...searchParams,
                           minPrice: item.min,
                           maxPrice: item.max,
                           page: 1
                        }
                     }
                     const isActive = item.min === Number(minPrice) && item.max === Number(maxPrice)
                     return <div key={item.label} className="d-flex items-center">
                        <Link href={url}
                           className={`btn mx-1 rounded-pill btn-raised ${isActive ? "btn-primary" : "btn-secondary"}`}>
                           {item.label}
                        </Link>
                        <span onClick={() => handleRemove(["minPrice", "maxPrice"])}>X</span>
                     </div>

                  })}
               </div>
            </div>
            <div className="mt-5">
               <h5>Category</h5>
               <div className="row d-flex align-items-center mx-1">
                  {categories.map((item, index) => {
                     const url = {
                        pathname,
                        query: {
                           ...searchParams,
                           category: item._id,
                           page: 1
                        }
                     }
                     const isActive = category === item._id
                     return <div key={item._id + "cate" + index} className="d-flex items-center">
                        <Link href={url}
                           className={`btn mx-1 rounded-pill btn-raised ${isActive ? "btn-primary" : "btn-secondary"}`}>
                           {item.name}
                        </Link>
                        <span onClick={() => handleRemove("category")}>X</span>
                     </div>

                  })}

               </div>
            </div>
            <div className="mt-5">
               <h5>Tags</h5>
               <div className="row d-flex align-items-center mx-1">
                  {tags.filter((tag) => (tag.parentCategory === category)).map((item, index) => {
                     const url = {
                        pathname,
                        query: {
                           ...searchParams,
                           tag: item._id,
                           page: 1
                        }
                     }
                     const isActive = tag === item._id
                     return <div key={item._id + "" + index} className="d-flex items-center">
                        <Link href={url}
                           className={`btn mx-1 rounded-pill btn-raised ${isActive ? "btn-primary" : "btn-secondary"}`}>
                           {item.name}
                        </Link>
                        <span onClick={() => handleRemove("tag")}>X</span>
                     </div>

                  })}

               </div>
            </div>
            <div className="mt-5">
               <h5>Brands</h5>
               <div className="row d-flex align-items-center mx-1">
                  {brands.map((item, index) => {
                     const url = {
                        pathname,
                        query: {
                           ...searchParams,
                           brand: item,
                           page: 1
                        }
                     }
                     const isActive = brand === item
                     return <div key={item + "brand" + index} className="d-flex items-center">
                        <Link href={url}
                           className={`btn mx-1 rounded-pill btn-raised 
                           ${isActive ? "btn-primary" : "btn-secondary"}`}>
                           {item}
                        </Link>
                        <span onClick={() => handleRemove("brand")}>X</span>
                     </div>
                  })}

               </div>
            </div>
         </div>

      </div >
   )
}

export default ProductFilter