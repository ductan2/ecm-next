import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import User from "@/models/user";
import { hash } from "bcrypt";

export async function POST(req: Request) {
   await dbConnect();
   const body = await req.json();
   const { name, email, password } = body;

   try {
      await new User({
         email,
         name,
         password: await hash(password, 10)
      }).save();
      return NextResponse.json({message:"User created successfully"},{status:201})
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 })
   }

}