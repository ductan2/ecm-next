import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Product from "@/models/product";
export async function GET() {
   dbConnect()
   try {
      const brands = await Product.distinct("brand");
      return NextResponse.json(brands);
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
   }
}