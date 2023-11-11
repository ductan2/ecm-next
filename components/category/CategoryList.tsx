'use client'
import { useCategory } from "@/context/category"

import { useEffect } from "react";

const CategoryList = () => {
  const { fetchCategory, categories, setUpdatingCategory } = useCategory();
  useEffect(() => {
    fetchCategory()
  }, [])
  return (
    <div className="my-5">
      {categories.map((category) => (
        <button key={category._id} className="btn" onClick={() => setUpdatingCategory(category)}>{category.name}</button>
      ))}
    </div>
  )
}

export default CategoryList