import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/utils/db";
import Product from "@/models/product";
import slugify from "slugify";


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
   await dbConnect();
   const body = await req.json();
   try {
      const updatedProduct = await Product.findByIdAndUpdate({ _id: params.id }, {
         ...body,
         slug: slugify(body.title),
      })
      return NextResponse.json(updatedProduct, { status: 201 })
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 })
   }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
   await dbConnect();
   try {
      const deletedProduct = await Product.findByIdAndRemove({ _id: params.id })
      return NextResponse.json(deletedProduct, { status: 201 })
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 })
   }
}