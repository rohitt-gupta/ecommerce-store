import getProduct from "@/actions/getProduct";
import getProducts from "@/actions/getProducts";
import ProductList from "@/components/ProductList";
import Gallery from "@/components/gallery";
import Container from "@/components/ui/Container";
import { FC } from "react";

export interface ProductPageProps {
  params: {
    productId: string;
  }
}

const ProductPage: FC<ProductPageProps> = async ({
  params
}) => {
  const product = await getProduct(params.productId)
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id
  })
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8">
            {/* Gallery */}
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              info
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Items" items={suggestedProducts}></ProductList>
        </div>
      </Container >
    </div >
  );
};
export default ProductPage