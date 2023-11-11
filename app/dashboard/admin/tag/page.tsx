import TagCreate from '@/components/tag/TagCreate'
import TagList from '@/components/tag/TagList'
import React from 'react'

const AdminTag = () => {
   return (
      <div>
         <div className="container my-5">
            <div className="row">
               <div className="col">
                  <p className="lead">
                     Create tags
                  </p>
                  <TagCreate />
               </div>
            </div>
            <div className="row">
               <div className="col">
                  <p className="lead">List of tags</p>
                  <TagList />
               </div>
            </div>
         </div>
      </div>
   )
}

export default AdminTag 