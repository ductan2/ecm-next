import ProductCreate from '@/components/product/ProductCreate'
import React from 'react'

const AdminProduct = () => {
   return (
      <div className='container mb-5'>
         <div className="row">
            <div className="col">
               <ProductCreate />
            </div>
         </div>
      </div>
   )
}

export default AdminProduct