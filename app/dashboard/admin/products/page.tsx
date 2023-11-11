import ProductList from '@/components/admin/ProductList'
import React from 'react'

const AdminProductList = () => {
  return (
    <div className='container'>
      <div className="row">
         <div className="col">
            <p className="lead">List of products</p>
            <ProductList />
         </div>
      </div>
    </div>
  )
}

export default AdminProductList