export interface ImageType {
   secure_url: string;
   public_id: string;
}
export interface LikeType {
   user: string;
   createdAt: Date;
   updatedAt: Date;
}
export interface RatingType {
   rating: number;
   comment?: string;
   postedBy: string; // Reference to User model
   createdAt: Date;
   updatedAt: Date;
}

export interface ProductType {
   _id?: string;
   title: string;
   slug?: string;
   description: string;
   price: number;
   previousPrice?: number;
   color?: string;
   brand?: string;
   stock?: number;
   shipping?: boolean;
   category?: { _id: string, name: string };
   tags?: { _id: string, name: string }[];
   images?: ImageType[];
   sold?: number;
   likes?: LikeType[];
   ratings?: RatingType[];
   createdAt?: Date;
   updatedAt?: Date;
}
export type SearchProduct = {
   page?: number;
   limit?: number;
   search?: string;
   category?: string;
}
export type FilterProduct = {
   page?: string;
   minPrice?: string
   maxPrice?: string
   category?: string
   tag?: string
   brand?: string
}