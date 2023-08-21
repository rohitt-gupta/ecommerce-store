import getCategory from "@/actions/getCategory";
import getColors from "@/actions/getColors";
import getProducts from "@/actions/getProducts";
import getSizes from "@/actions/getSizes";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/Container";
import { FC } from "react";
import Filter from "./components/Filter";

export const revalidate = 0

export interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    colorId: string;
    sizeId: string;
  }

}

const CategoryPage: FC<CategoryPageProps> = async ({
  params, searchParams
}) => {

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  })

  const sizes = await getSizes()
  const colors = await getColors()
  const category = await getCategory(params.categoryId)

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* Add mobile filters */}
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </div>
        </div>
      </Container>

    </div>
  );
};
export default CategoryPage 