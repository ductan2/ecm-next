import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Category from "@/models/category";
import slugify from "slugify";
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
   await dbConnect();

   const body = await req.json();
   const { name } = body;
   try {
      const updatingCategory = await Category.findByIdAndUpdate({ _id: params.id }, {
         ...body, slug: slugify(name),
      }, { new: true })
      return NextResponse.json(updatingCategory, { status: 200 })
   } catch (error: any) {
      return NextResponse.json({ error: error._message }, { status: 500 })
   }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
   await dbConnect();
   try {
      const deleteCategory = await Category.findByIdAndRemove({ _id: params.id })
      return NextResponse.json(deleteCategory, { status: 200 })
   } catch (error: any) {
      return NextResponse.json({ error: error._message }, { status: 500 })
   }
}