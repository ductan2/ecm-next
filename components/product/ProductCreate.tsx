'use client'
import { useCategory } from "@/context/category";
import { useProduct } from "@/context/product"
import { useTag } from "@/context/tag";
import { ProductType } from "@/types/product.type";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";

const ProductCreate = () => {
   const { createProduct, product, uploadImage,
      setProduct, products, setProducts, updatingProduct,
      setUpdatingProduct, deleteProduct, deleteImage,
      updateProduct, uploading, setUploading }
      = useProduct();
   const { tags, fetchTag } = useTag()
   const imagePreviews = updatingProduct ? updatingProduct.images : product?.images;
   const { categories, fetchCategory } = useCategory();
   useEffect(() => {
      fetchCategory()
      fetchTag()
   }, [])

   const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let { name, value } = e.target;

      if (updatingProduct) {
         setUpdatingProduct({
            ...updatingProduct,
            [name]: value
         })
      } else {
         setProduct((prevProduct: ProductType) => ({ ...prevProduct, [name]: value }));
      }
   }
   const handleDelete = () => {
      deleteProduct();
      imagePreviews?.forEach((image) => {
         deleteImage(image.public_id)
      })

   }
   if (!categories || !tags) return <Loading />
   return (
      <div>
         <p className="lead">{updatingProduct ? "update" : "create"} Product</p>
         <input type="text" placeholder="Title" name="title"
            value={updatingProduct ? updatingProduct.title : product?.title}
            onChange={handleChangeValue} className="form-control my-2 p-2"
         />
         <textarea placeholder="Description"
            name="description"
            rows={5} className="form-control mb-2 p-2"
            value={updatingProduct ? updatingProduct.description : product?.description}
            onChange={handleChangeValue}
         ></textarea>
         <input type="number" min={1} placeholder="Price" name="price"
            value={updatingProduct ? updatingProduct.price : product?.price}
            onChange={handleChangeValue} className="form-control my-2 p-2"
         />
         <input type="text" placeholder="Color" name="color"
            value={updatingProduct ? updatingProduct.color : product?.color}
            onChange={handleChangeValue} className="form-control my-2 p-2"
         />
         <input type="text" placeholder="Brand" name="brand"
            value={updatingProduct ? updatingProduct.brand : product?.brand}
            onChange={handleChangeValue} className="form-control my-2 p-2"
         />

         <input type="number" min={1} placeholder="Stock" name="stock"
            value={updatingProduct ? updatingProduct.stock : product?.stock}
            onChange={handleChangeValue} className="form-control my-2 p-2"
         />
         <div className="form-group">
            <select name="category"
               onChange={(e) => {
                  let category = {};
                  const element = e.target as HTMLSelectElement;
                  const categoryId = e.target.value;
                  const categoryName = element.options[element.selectedIndex].getAttribute('data-name')
                  category = {
                     _id: categoryId,
                     name: categoryName
                  };
                  updatingProduct ? setUpdatingProduct({ ...updatingProduct, category: category as { _id: string, name: string } })
                     : setProduct({ ...product, category: category as { _id: string, name: string } })
               }}
               value={product?.category?._id} className="form-control p-2 mb-2">
               <option value="">Select category</option>
               {categories.map((category) => (
                  <option key={category._id} value={category._id} data-name={category.name}>{category.name}</option>
               ))}
            </select>
         </div>
         {tags && tags?.filter((ft) => ft?.parentCategory === (updatingProduct?.category?._id || product?.category?._id)).length > 0 && <p>Tags</p>}
         <div className="form-group row">
            {tags && tags?.filter((ft) => ft?.parentCategory === (updatingProduct?.category?._id || product?.category?._id)).map((tag) => {
               return <div key={tag?._id} className="form-check col-3">
                  <input type="checkbox" value={tag?._id}
                     onChange={(e) => {
                        const tagId = e.target.value;
                        const tagName = tag?.name
                        let selectedTag: { _id: string, name: string }[] = updatingProduct ? [...(updatingProduct?.tags as [])] : [...product?.tags as []]
                        if (e.target.checked) {
                           selectedTag.push({ _id: tagId, name: tagName })
                        }
                        else {
                           selectedTag.filter((st) => st._id !== tagId)
                        }
                        if (updatingProduct) {
                           setUpdatingProduct({
                              ...updatingProduct,
                              tags: selectedTag
                           })
                        }
                        else {
                           setProduct({ ...product, tags: selectedTag })
                        }
                     }}
                  />{" "}
                  <label htmlFor="">{tag?.name}</label>
               </div>
            })}
         </div>
         <div className="form-group mb-3">
            <label className={`btn btn-primary col-12 ${uploading ? 'disabled' : ""}`} htmlFor="">{uploading ? "Processing" : "Upload Images"}
               <br />
               <input className="mt-3" type="file" multiple accept="image/*" onChange={uploadImage} disabled={uploading} />
            </label>
         </div>
         <div className="d-flex justify-content-center">
            {imagePreviews?.map((image) => (
               <div key={image.public_id}>
                  <img src={image.secure_url} className="img rounded-circle mx-1 shadow"
                     alt="" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                  <br />
                  <div className="text-center pointer" onClick={() => deleteImage(image.public_id)}>
                     Delete
                  </div>
               </div>
            ))}
         </div>
         <div className="d-flex " style={{ gap: "20px" }}>
            <button className={`btn btn-${updatingProduct ? "info bg-info text-light" : "primary bg-primary text-light"}  `} disabled={uploading} onClick={updatingProduct ? updateProduct : createProduct}>
               {updatingProduct ? "Update" : "Create"}
            </button>
            {updatingProduct && (
               <>
                  <button className="btn btn-danger bg-danger text-light" disabled={uploading} onClick={handleDelete}>Delete</button>
                  <button className="btn btn-success bg-success text-light" disabled={uploading} onClick={() => setUpdatingProduct(null)}>Clear</button>
               </>
            )}
         </div>
      </div>
   )
}

export default ProductCreate