'use client'
import CategoryCreate from '@/components/category/CategoryCreate'
import CategoryList from '@/components/category/CategoryList'
import React from 'react'

const AdminCategory = () => {
   return (
      <div className='container mb-5'>
         <div className="row">
            <div className="col">
               <p className="lead">Create Category</p>
               <CategoryCreate />
            </div>
         </div>
         <div className="row">
            <div className="col">
               <p className="lead">
                  List of Categories
               </p>
               <CategoryList />
            </div>
         </div>
      </div>
   )
}

export default AdminCategory