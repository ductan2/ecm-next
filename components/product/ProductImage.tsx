'use client'
import { ProductType } from "@/types/product.type"
import Image from "next/image"
import React, { useEffect } from "react"

const ProductImage = ({ product }: { product: ProductType }) => {

   const [showImagePreview, setShowImagePreview] = React.useState<boolean>(false)
   const [currentImagePreview, setCurrenImagePreview] = React.useState<string>("")
   const openModal = (url: string) => {
      setCurrenImagePreview(url)
      setShowImagePreview(true)
   }
   const closeModal = () => {
      setShowImagePreview(false)
      setCurrenImagePreview("")
   }

   const showImage = (src: string, title: string) => {
      return <Image
         src={src} alt={title}
         width={500} height={300}
         style={{ objectFit: "contain", height: "100%", width: "100%" }} />
   }
   useEffect(() => {
      window.addEventListener("click", handleClickOutside)
      return () => {
         window.removeEventListener("click", handleClickOutside)
      }
      function handleClickOutside(e: MouseEvent) {
         const target = e.target as HTMLElement
         if (target.classList.contains("modal")) {
            closeModal()
         }
      }
   }, [])
   return (
      <>
         {showImagePreview && (
            <div className="fade modal show" style={{ display: "block" }}>
               <div className="modal-dialog modal-dialog-centered modal-lg" style={{ maxHeight: "90vh" }}>
                  <div className="modal-content" style={{ height: "100%%", width: "90%" }}>
                     <div className="modal-body" >{showImage(currentImagePreview, product.title)}</div>
                     <button type="button" className="btn btn-secondary" data-bs-dimis="modal"
                        onClick={closeModal}>Close</button>
                  </div>
               </div>
            </div>
         )}
         <div className="d-flex align-items-center justify-content-center">
            {product.images !== undefined && product.images?.length > 0 ? (
               <>
                  {
                     product.images?.map((image) => {
                        return (
                           <div className="cursor-pointer"
                              key={image.public_id} style={{ height: "350px", overflow: "hidden" }}
                              onClick={() => openModal(image.secure_url)}>
                              {showImage(image.secure_url, product.title)}

                           </div>
                        )
                     })
                  }
               </>
            ) : <h5>No image</h5>}
         </div >
      </>
   )
}

export default ProductImage