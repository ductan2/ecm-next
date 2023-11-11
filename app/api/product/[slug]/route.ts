import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Product from "@/models/product";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
   await dbConnect();
   try {
      const { slug } = params
      const products = await Product.findOne({ slug }).populate('category', 'name').populate('tags', 'name').exec();
      return NextResponse.json(products);
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
   }
}