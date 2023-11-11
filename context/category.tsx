'use client'
import { CategoryType } from "@/types/category.type";
import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

interface CategoryContextType {
   name: string;
   setName: React.Dispatch<React.SetStateAction<string>>;
   categories: CategoryType[];
   setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
   updatingCategory: CategoryType | null;
   setUpdatingCategory: React.Dispatch<React.SetStateAction<CategoryType | null>>;
   createCategory: () => Promise<void>;
   fetchCategory: () => Promise<void>;
   deleteCategory: () => Promise<void>;
   updateCategory: () => Promise<void>;
}

const defaultValue: CategoryContextType = {
   name: '',
   setName: () => { },
   categories: [],
   setCategories: () => { },
   updatingCategory: null,
   setUpdatingCategory: () => { },
   createCategory: async () => { },
   fetchCategory: async () => { },
   deleteCategory: async () => { },
   updateCategory: async () => { }
};

export const CategoryContext = createContext<CategoryContextType>(defaultValue);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
   const [name, setName] = useState('')
   const [categories, setCategories] = useState<CategoryType[]>([])
   const [updatingCategory, setUpdatingCategory] = useState<CategoryType | null>(null)

   const createCategory = async () => {
      try {
         const response = await fetch(`${process.env.API}/admin/category`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
         });
         const data = await response.json()
         if (!response.ok) {
            toast.error(data.error)
         }
         else {
            toast.success("Category created successfully")
            setName('')
            setCategories([...categories, data])
         }

      } catch (error) {
         toast.error("An error occurred. Try again")
      }
   }
   const fetchCategory = async () => {
      try {
         const response = await fetch(`${process.env.API}/admin/category`);
         const data = await response.json()
         if (!response.ok) {
            toast.error(data.error)
         }
         else {
            setCategories(data)
         }
      } catch (error) {
         toast.error("An error occurred. Try again")
      }
   }
   const deleteCategory = async () => {
      try {
         const response = await fetch(`${process.env.API}/admin/category/${updatingCategory?._id}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json"
            },
         });
         const data = await response.json()
         if (!response.ok) {
            toast.error(data.error)
         } else {
            toast.success("Category deleted successfully")
            setCategories((prevCategories) => prevCategories.filter((category) => category._id !== updatingCategory?._id))
         }
      } catch (error) {
         toast.error("An error occurred. Try again")
      } finally {
         setUpdatingCategory(null)
      }
   }
   const updateCategory = async () => {
      try {
         const response = await fetch(`${process.env.API}/admin/category/${updatingCategory?._id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
         });
         const data = await response.json()
         if (!response.ok) {
            toast.error(data.error)
         } else {
            toast.success("Category updated successfully")
            setName('')
            setCategories((prevCategories) => prevCategories.map((category: CategoryType) => category._id === data._id ? data : category))
         }
      } catch (error) {
         toast.error("An error occurred. Try again")
      } finally {
         setUpdatingCategory(null)
      }
   }
   return (
      <CategoryContext.Provider
         value={{
            name, setName, categories, createCategory,
            fetchCategory, setCategories, updatingCategory,
            setUpdatingCategory, deleteCategory, updateCategory
         }}
      >
         {children}
      </CategoryContext.Provider>
   )
}
export const useCategory = () => useContext(CategoryContext);
