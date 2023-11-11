export interface UserType {
   _id: string,
   name: string,
   email: string,
   password: string,
   role: string,
   image: string,
   resetCode: string,
   createdAt?: string,
   updatedAt?: string,
}