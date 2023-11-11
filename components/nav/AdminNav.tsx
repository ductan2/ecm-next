import Link from "next/link"

export const AdminNav = () => {
   return (
      <nav className="nav justify-content-center mb-3">
         <Link href={"/dashboard/admin"} className="nav-link">
            Admin
         </Link>
         <Link href={"/dashboard/admin/category"} className="nav-link">
            Create category
         </Link>
         <Link href={"/dashboard/admin/tag"} className="nav-link">
            Create tag
         </Link>
         <Link href={"/dashboard/admin/product"} className="nav-link">
            Creater product
         </Link>
         <Link href={"/dashboard/admin/products"} className="nav-link">
            Product list
         </Link>
      </nav>

   )
}
