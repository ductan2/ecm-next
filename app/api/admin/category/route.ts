import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Category from "@/models/category";
import slugify from "slugify";
export async function POST(req: Request) {
   await dbConnect();
   const body = await req.json();
   const { name } = body;
   try {
      const category = await Category.create({ name, slug: slugify(name) })
      return NextResponse.json(category, { status: 201 })
   } catch (error: any) {
      return NextResponse.json({ error: error._message }, { status: 500 })
   }
}
export async function GET() {
   await dbConnect();
   try {
      const result = await Category.find({}).sort({ createdAt: -1 })
      return NextResponse.json(result, { status: 200 })
   } catch (error: any) {
      return NextResponse.json({ error: error._message }, { status: 500 })
   }
}
