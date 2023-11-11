import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Product from "@/models/product";
import slugify from "slugify";


export async function POST(req: NextRequest) {
   await dbConnect();
   const body = await req.json();
   try {
      const product = await Product.create({
         ...body,
         slug: slugify(body.title),
      });
      return NextResponse.json(product, { status: 201 });
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
   }

}
