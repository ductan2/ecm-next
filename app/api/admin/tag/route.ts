import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Tag from "@/models/tag";
import slugify from "slugify";
export async function POST(req: Request) {
   await dbConnect();
   const body = await req.json();
   const { name, parentCategory } = body;
   try {
      const tag = await Tag.create({ name, parentCategory, slug: slugify(name) })
      return NextResponse.json(tag, { status: 201 })
   } catch (error: any) {
      return NextResponse.json({ error: error._message }, { status: 500 })
   }
}
export async function GET() {
   await dbConnect();
  
   try {
      const result = await Tag.find({}).sort({ createdAt: -1 })
      return NextResponse.json(result, { status: 200 })
   } catch (error: any) {
      return NextResponse.json({ error: error._message }, { status: 500 })
   }
}
