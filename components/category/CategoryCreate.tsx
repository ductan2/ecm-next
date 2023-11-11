
import { useCategory } from "@/context/category"
import { ChangeEvent } from "react"

const CategoryCreate = () => {
  const { name, setName, updatingCategory, setUpdatingCategory, createCategory, updateCategory, deleteCategory } = useCategory()
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (updatingCategory) {
      setUpdatingCategory({ ...updatingCategory, name: e.target.value })
    }
    else {
      setName(e.target.value)
    }
  }
  const handleDelete = () => {
    deleteCategory()
  }
  return (
    <div className="my-5">
      <input type="text" value={updatingCategory ? updatingCategory.name : name}
        onChange={handleChangeValue} className="form-control p-2 my-2" />
      <div className="d-flex justify-content-between">
        <button className={`btn btn-${updatingCategory ? "info bg-info text-light" : "primary bg-primary text-light"}  `} onClick={updatingCategory ? updateCategory : createCategory}>
          {updatingCategory ? "Update" : "Create"}
        </button>
        {updatingCategory && (
          <>
            <button className="btn btn-danger bg-danger text-light" onClick={handleDelete}>Delete</button>
            <button className="btn btn-success bg-success text-light" onClick={() => setUpdatingCategory(null)}>Clear</button>
          </>
        )}
      </div>
    </div>
  )
}

export default CategoryCreate 