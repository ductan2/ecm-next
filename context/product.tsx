'use client'
import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ProductType } from '@/types/product.type';
import Resizer from 'react-image-file-resizer';

interface ProductContextType {
   products: ProductType[];
   product: ProductType;
   currenPage: number;
   totalPages: number;
   updatingProduct: ProductType | null;
   uploading: boolean;
   brands: string[];
   setBrands: React.Dispatch<React.SetStateAction<string[]>>;
   setUploading: React.Dispatch<React.SetStateAction<boolean>>;
   setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
   setProduct: React.Dispatch<React.SetStateAction<ProductType>>;
   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
   setTotalPages: React.Dispatch<React.SetStateAction<number>>;
   setUpdatingProduct: React.Dispatch<React.SetStateAction<ProductType | null>>;
   uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
   deleteImage: (public_id: string) => void;
   createProduct: () => Promise<void>;
   fetchProducts: (page: number, search?: string) => Promise<void>;
   deleteProduct: () => Promise<void>;
   updateProduct: () => Promise<void>;
   fetchBrands: () => Promise<void>;
}
const defaultValue: ProductContextType = {
   products: [],
   product: {} as ProductType,
   currenPage: 1,
   totalPages: 1,
   updatingProduct: null,
   uploading: false,
   brands: [],
   setBrands: () => { },
   uploadImage: () => { },
   deleteImage: () => { },
   setUploading: () => { },
   setProducts: () => { },
   setProduct: () => { },
   setCurrentPage: () => { },
   setTotalPages: () => { },
   setUpdatingProduct: () => { },
   createProduct: async () => { },
   fetchProducts: async () => { },
   deleteProduct: async () => { },
   updateProduct: async () => { },
   fetchBrands: async () => { }
}

export const ProductContext = createContext<ProductContextType>(defaultValue)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
   const [products, setProducts] = useState<ProductType[]>([]);
   const [product, setProduct] = useState<ProductType>({
      title: "",
      description: "",
      price: 0,
      color: "",
      brand: "",
      stock: 0,
      category: { _id: "", name: "" },
      images: [],
      tags: []
   });
   const [currenPage, setCurrentPage] = useState<number>(1);
   const [totalPages, setTotalPages] = useState<number>(1);
   const [updatingProduct, setUpdatingProduct] = useState<ProductType | null>(null);
   const router = useRouter();
   const [uploading, setUploading] = useState<boolean>(false);
   const [brands, setBrands] = useState<string[]>([])
   const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      let allUploadedFiles = updatingProduct ? updatingProduct?.images || [] : product.images || []

      if (files) {
         const totalImages = allUploadedFiles.length + files.length;
         if (totalImages > 5) {
            toast.error("You can upload maximum 5 images")
            return;
         }
         setUploading(true)
         const uploadPromise = [];
         for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const promise = new Promise((resolve, reject) => {
               Resizer.imageFileResizer(
                  file,
                  1280,
                  720,
                  "JPEG",
                  100,
                  0,
                  (uri) => {
                     fetch(`${process.env.API}/admin/upload/image`, {
                        method: "POST",
                        headers: {
                           "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ image: uri }),
                     })
                        .then((response) => response.json())
                        .then((data) => {
                           // Insert the new image at the beginning of the array
                           allUploadedFiles.unshift(data);
                           resolve({});
                        })
                        .catch((err) => {
                           console.log("CLOUDINARY UPLOAD ERR", err);
                           reject(err);
                        });
                  },
               );
            });
            uploadPromise.push(promise);
         }
         Promise.all(uploadPromise)
            .then(() => {
               updatingProduct
                  ? setUpdatingProduct({
                     ...updatingProduct,
                     images: allUploadedFiles,
                  })
                  : setProduct({ ...product, images: allUploadedFiles });
               setUploading(false);
            })
            .catch((error) => {
               console.log("Error uploading images: ", error);
               setUploading(false);
            });
      }

   }

   const deleteImage = (public_id: string) => {
      setUploading(true)
      fetch(`${process.env.API}/admin/upload/image`, {
         method: "DELETE",
         body: JSON.stringify({ public_id }),
      }).then((response) => response.json()).then((data) => {
         const filteredImages = updatingProduct ?
            updatingProduct?.images?.filter(image => image.public_id !== public_id) : product.images?.filter(image => image.public_id !== public_id)
         updatingProduct ? setUpdatingProduct({ ...updatingProduct, images: filteredImages }) : setProduct({ ...product, images: filteredImages })
         setUploading(false)
      }).catch((err) => {
         console.log("Image delete error: ", err)
         setUploading(false)
      })
   }

   const createProduct = async () => {
      try {
         const response = await fetch(`${process.env.API}/admin/product`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
         })
         const data = await response.json();
         if (!response.ok) {
            toast.error(data.error)
         } else {
            toast.success(`Product ${data?.title} created successfully`)
            setProduct({
               title: "",
               description: "",
               price: 0,
               color: "",
               brand: "",
               stock: 0,
               category: { _id: "", name: "" },
               images: [],
               tags: []
            })
            router.push('/dashboard/admin/product')
         }

      } catch (error) {
         toast.error("An error occurred. Try again") //occurred : xảy ra
      }
   }
   const fetchProducts = async (page = 1, search?: string) => {
      try {
         const response = await fetch(`${process.env.API}/product?page=${page}
         ${search ? "&search=" + search : ""}`)
         const data = await response.json();
         if (!response.ok) {
            toast.error(data.error);
         }
         else {
            setProducts(data.products)
            setCurrentPage(data.currentPage)
            setTotalPages(data.totalPages)
         }
      } catch (error) {
         toast.error("An error occurred. Try again")
      }
   }
   const fetchBrands = async () => {
      try {
         const response = await fetch(`${process.env.API}/product/brand`)
         const data = await response.json();
         if (!response.ok) {
            toast.error(data.error)
         }
         else {
            setBrands(data)
         }
      } catch (error) {
         toast.error("An error occurred. Try again")
      }
   }
   const updateProduct = async () => {
      try {
         const response = await fetch(`${process.env.API}/admin/product/${updatingProduct?._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatingProduct)
         })
         const data = await response.json();
         if (!response.ok) {
            toast.error(data.error)
         } else {
            toast.success(`Product ${data?.title} updated successfully`)
            setProducts((prevProducts) => prevProducts.map((product) => product._id === data._id ? data : product))
            router.push('/dashboard/admin/product')
         }
      } catch (error) {
         toast.error("An error occurred. Try again")
      }
   }
   const deleteProduct = async () => {
      try {
         const response = await fetch(`${process.env.API}/admin/product/${updatingProduct?._id}`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json'
            },
         })
         const data = await response.json();
         if (!response.ok) {
            toast.error(data.error)
         } else {
            toast.success(`Product ${data?.title} updated successfully`)
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== data._id))
            router.push('/dashboard/admin/product')
         }
      } catch (error) {
         toast.error("An error occurred. Try again")
      }
   }
   return (
      <ProductContext.Provider value={{
         products,
         product,
         currenPage,
         totalPages,
         updatingProduct,
         uploading,
         brands,
         setBrands,
         setUploading,
         uploadImage,
         deleteImage,
         setProducts,
         setProduct,
         setCurrentPage,
         setTotalPages,
         setUpdatingProduct,
         createProduct,
         fetchProducts,
         updateProduct,
         deleteProduct,
         fetchBrands
      }} >{children}</ProductContext.Provider>
   )
}
export const useProduct = () => useContext(ProductContext)