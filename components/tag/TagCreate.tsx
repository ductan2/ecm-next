'use client'
import { useCategory } from "@/context/category"
import { useTag } from "@/context/tag"
import { useEffect } from "react"
const TagCreate = () => {

  const { name, setName, parentCategory, updateTag, setPrarentCategory, updatingTag, setUpdatingTag, deleteTag, createTag } = useTag()

  const { fetchCategory, categories } = useCategory()
  useEffect(() => {
    fetchCategory()
  }, [])
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatingTag) {
      setUpdatingTag({ ...updatingTag, name: e.target.value })
    }
    else {
      setName(e.target.value)
    }
  }
  
  const handleDelete = () => {
    deleteTag()
  }
  return (
    <div>
      <input type="text" value={updatingTag ? updatingTag.name : name}
        onChange={handleChangeValue} className="form-control my-2 p-2" />
      <div className="form-group mt-4">
        <label >Parent Category</label>
        <select defaultValue={parentCategory} className="form-control" value={parentCategory || updatingTag?.parentCategory}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updatingTag ? setUpdatingTag({
            ...updatingTag,
            parentCategory: e.target.value
          }) : setPrarentCategory(e.target.value)} name="category">
          <option>Select a category</option>
          {categories.map((category) => (
            <option selected={category._id === updatingTag?.parentCategory || category._id === parentCategory} key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-between">
        <button className={`btn btn-${updatingTag ? "info bg-info text-light" : "primary bg-primary text-light"}  `} onClick={updatingTag ? updateTag : createTag}>
          {updatingTag ? "Update" : "Create"}
        </button>
        {updatingTag && (
          <>
            <button className="btn btn-danger bg-danger text-light" onClick={handleDelete}>Delete</button>
            <button className="btn btn-success bg-success text-light" onClick={() => setUpdatingTag(null)}>Clear</button>
          </>
        )}
      </div>
    </div>
  )
}

export default TagCreate