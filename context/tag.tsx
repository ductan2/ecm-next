"use client"
import { TagType } from "@/types/tag.type";
import { createContext, useContext, useState } from "react"
import toast from "react-hot-toast";


interface TagContextType {
   name: string;
   setName: React.Dispatch<React.SetStateAction<string>>;
   tags: TagType[];
   setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
   updatingTag: TagType | null;
   parentCategory: string;
   setPrarentCategory: React.Dispatch<React.SetStateAction<string>>;
   setUpdatingTag: React.Dispatch<React.SetStateAction<TagType | null>>;
   createTag: () => Promise<void>;
   fetchTag: () => Promise<void>;
   deleteTag: () => Promise<void>;
   updateTag: () => Promise<void>;
}
const defaultValue: TagContextType = {
   name: '',
   setName: () => { },
   tags: [],
   setTags: () => { },
   parentCategory: '',
   setPrarentCategory: () => { },
   updatingTag: null,
   setUpdatingTag: () => { },
   createTag: async () => { },
   fetchTag: async () => { },
   deleteTag: async () => { },
   updateTag: async () => { }
};
export const TagContext = createContext<TagContextType>(defaultValue)



export const TagProvider = ({ children }: { children: React.ReactNode }) => {
   const [name, setName] = useState<string>('')
   const [parentCategory, setPrarentCategory] = useState<string>('')
   const [tags, setTags] = useState<TagType[]>([]);
   const [updatingTag, setUpdatingTag] = useState<TagType | null>(null)

   const createTag = async () => {
      try {
         const response = await fetch(`${process.env.API}/admin/tag`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, parentCategory })
         });
         const data = await response.json()
         if (!response.ok) {
            toast.error(data.error)
         }
         else {
            toast.success("Category created successfully")
            setName('')
            setPrarentCategory('')
            setTags([...tags, data])
         }
      } catch (error) {
         toast.error("Error creating tag")
      }
   }
   const fetchTag = async () => {
      try {
         const response = await fetch(`${process.env.API}/admin/tag`);
         const data = await response.json()
         if (!response.ok) {
            toast.error(data.error)
         }
         else {
            setTags(data)
         }
      } catch (error) {
         toast.error("Error fetch tag")
      }
   }
   const deleteTag = async () => {
      try {
         const response = await fetch(`${process.env.API}/admin/tag/${updatingTag?._id}`, {
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
            setTags((prevTags) => prevTags.filter((tag) => tag._id !== updatingTag?._id))
         }
      } catch (error) {
         toast.error("Error delete tag")
      } finally {
         setUpdatingTag(null)
      }
   }
   const updateTag = async () => {

      const { name: nameUpdate, parentCategory: parentCategoryUpdate } = updatingTag as TagType

      try {
         const response = await fetch(`${process.env.API}/admin/tag/${updatingTag?._id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: nameUpdate, parentCategory: parentCategoryUpdate })
         });
         
         const data = await response.json()
         
         if (!response.ok) {
            toast.error(data.error)
         } else {
            toast.success("Category updated successfully")
            setName('')
            setPrarentCategory('')
            setTags((prevTags) => prevTags.map((tag) => tag._id === data._id ? data : tag))
         }
      } catch (error) {
         toast.error("Error update tag")
      } finally {
         setUpdatingTag(null)
      }
   }
   return (
      <TagContext.Provider value={{
         name, setName, parentCategory, setPrarentCategory,
         tags, setTags, updatingTag, setUpdatingTag,
         createTag, fetchTag, deleteTag, updateTag
      }}>{children}</TagContext.Provider>
   )
}

export const useTag = () => useContext(TagContext)