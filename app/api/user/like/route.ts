import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Product from "@/models/product";
import { currentUser } from "@/utils/currenUser";



export async function GET() {
   dbConnect();
   const user = await currentUser();
   try {
      const products = await Product.find({ likes: user._id });
      return NextResponse.json(products, { status: 200 })
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 })
   }
}

export async function PUT(req: Request) {
   dbConnect();
   const user = await currentUser();
   const { product_id } = await req.json();
   console.log("🚀 ~ file: route.ts:23 ~ PUT ~ product_id:", product_id)
   try {
      const updated = await Product.findOneAndUpdate({ _id: product_id },
         { $addToSet: { likes: { user: user._id } } },
         { new: true })
      return NextResponse.json(updated, { status: 200 })
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 })
   }
}