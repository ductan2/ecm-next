import { getServerSession } from "next-auth";
import { authOptions } from "./authOption"
import { UserType } from "@/types/user.type";

export const currentUser = async (): Promise<UserType> => {
   const sessison = await getServerSession(authOptions);
   return sessison.user;
}