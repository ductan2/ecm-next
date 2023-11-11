
import Pagination from "@/components/product/Pagination";
import ProductItem from "@/components/product/ProductItem";
import ProductSearch from "@/components/product/ProductSearch";
import { ProductType, SearchProduct } from "@/types/product.type";

async function getProducts(searchParams: SearchProduct) {
  const searchQuery = new URLSearchParams({
    page: searchParams.page?.toString() as string,
    search: searchParams.search?.toString() as string || "",
  }).toString();

  const res = await fetch(`${process.env.API}/product?${searchQuery}`, {
    method: "GET",
    next: { revalidate: 1 }
  });
  if (!res.ok) {
    throw new Error("An error occurred. Try again");
  }
  const data = await res.json();
  return data;
}
export default async function Home({ searchParams }: { searchParams: SearchProduct }) {
  const { totalPages, currenPage, products } = await getProducts(searchParams);


  return (
    <>
      <ProductSearch />
      <div className="row">
        {products.length > 0 ? products?.map((product: ProductType) => (
          <div className="col-lg-4  my-3" >
            <ProductItem product={product} key={product._id} />
          </div>
        )) : <>
          <h1 className="col-lg-0 mx-auto">No products</h1>
        </>}
      </div>
      <Pagination searchParams={searchParams} currenPage={currenPage} pathname="/" totalPages={totalPages} />
    </>
  )
}
