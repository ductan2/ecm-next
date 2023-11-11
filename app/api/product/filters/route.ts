import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Product from "@/models/product";
import queryString from "query-string";
import { FilterProduct } from "@/types/product.type";
import { pageSize } from "../route";

export async function GET(req: NextRequest) {
   await dbConnect();
   const searchParams: FilterProduct = queryString.parseUrl(req.url).query;
   const filter: FilterProduct & {
      price?: { $gte: string, $lte: string; },
   } & { tags?: string } = {};
   const { page, category, brand, tag, minPrice, maxPrice } =
      searchParams || {};
   if (category) {
      filter.category = category;
   }
   if (brand) {
      filter.brand = brand;
   }
   if (tag) {
      filter.tags = tag;
   }
   if (minPrice && maxPrice) {
      filter.price = {
         $gte: minPrice,
         $lte: maxPrice,
      };
   }
   try {
      const currenPage = Number(page) || 1
      const skip = Number(pageSize) * (currenPage - 1);

      const allProduct = await Product.find(filter)
         .populate("category", "name ")
         .populate("tags", "name")
         .sort({ createdAt: -1 })
      const totalFilterProduct = allProduct.length;
      const products = allProduct.slice(skip, skip + pageSize);

      return NextResponse.json({
         products,
         totalFilterProduct,
         totalPages: Math.ceil(totalFilterProduct / pageSize),
         currenPage,
      });

   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
   }
}