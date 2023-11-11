'use client'
import { FilterProduct } from "@/types/product.type";
import Link from "next/link";
import { useEffect, useState } from "react";

type PaginationProps = {
   totalPages: number;
   currenPage: number;
   pathname: string;
   searchParams?: any;
}
const Pagination = ({ totalPages, currenPage, pathname, searchParams }: PaginationProps) => {
   const [params, setParams] = useState<string>("")
   useEffect(() => {
      if (searchParams) {
         delete searchParams?.page
         const queryString = new URLSearchParams(searchParams).toString()
         setParams(queryString)
      }
   }, [searchParams])
   return (
      <div className="row">
         <div className="col">
            <nav>
               <ul className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => {
                     const page = index + 1;
                     return <li key={page} className={`page-item ${currenPage === page ? "active" : ""}`}>
                        <Link className="page-link"
                           href={`${pathname}?page=${page}${params ? "&" + params : ""}`}
                           as={`${pathname}?page=${page}${params ? "&" + params : ""}`}>{page}</Link>
                     </li>
                  })}
               </ul>
            </nav>
         </div>
      </div>
   )
}

export default Pagination