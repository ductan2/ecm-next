import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Tag from "@/models/tag";
import slugify from "slugify";
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
   await dbConnect();

   const body = await req.json();
   const { name,parentCategory } = body;
   try {
      const updatingTag = await Tag.findByIdAndUpdate({ _id: params.id }, {
         ...body,parentCategory, slug: slugify(name),
      }, { new: true })
      return NextResponse.json(updatingTag, { status: 200 })
   } catch (error: any) {
      return NextResponse.json({ error: error._message }, { status: 500 })
   }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
   await dbConnect();
   try {
      const deletingTag = await Tag.findByIdAndRemove({ _id: params.id })
      return NextResponse.json(deletingTag, { status: 200 })
   } catch (error: any) {
      return NextResponse.json({ error: error._message }, { status: 500 })
   }
}