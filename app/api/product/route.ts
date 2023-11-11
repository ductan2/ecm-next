import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Product from "@/models/product";
import queryString from "query-string";
import Category from "@/models/category";
import Tag from "@/models/tag";
export const pageSize = 4; // 6 products per page
export async function GET(req: NextRequest) {
   await dbConnect();
   console.log(req.url)
   const searchParams = queryString.parseUrl(req.url).query;
   const { page, search } = searchParams || {};
   console.log("🚀 ~ file: route.ts:11 ~ GET ~ search:", search)
   try {
      const currenPage = Number(page) || 1;

      const [category, tags] = await Promise.all([
         Category.find({
            name: {
               $regex: search,
               $options: "i",
            },
         }),
         Tag.find({
            name: {
               $regex: search,
               $options: "i",
            },
         })
      ])


      const skip = pageSize * (currenPage - 1);
      const allProducts = await Product.find({
         $or: [
            {
               title: {
                  $regex: search,
                  $options: "i",
               },
            },
            {
               category: {
                  $in: category.map((item) => item._id),
               },
            },
            {
               tags: {
                  $in: tags.map((item) => item._id),
               },
            },
         ],
      })
         .populate("category", "name slug").populate("tags", "name slug");
      const totalProducts = allProducts.length

      const products = allProducts.slice(skip, skip + pageSize);


      return NextResponse.json({
         products,
         totalProducts,
         totalPages: Math.ceil(totalProducts / pageSize),
         currenPage,
      });
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
   }
}