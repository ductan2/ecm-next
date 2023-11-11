'use client'
import { useTag } from "@/context/tag";
import { useEffect } from "react";


const TagList = () => {
  const { fetchTag,tags,setUpdatingTag } = useTag();
  useEffect(() => {
    fetchTag()
  }, [])
  return (
    <div className="my-5">
      {tags.map((tag) => (
        <button key={tag._id} className="btn" onClick={() => setUpdatingTag(tag)}>{tag.name}</button>
      ))}
    </div>
  )
}

export default TagList