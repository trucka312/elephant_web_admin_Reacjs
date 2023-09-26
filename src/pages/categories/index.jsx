import { useEffect } from "react";
import Loading from "../../components/loading/Index";
import { useCategoriesStore } from "../../store/categoriesStore";
import CategoryItem from "./CategoryItem";
import CategoriesListItem from "./CategoriesListItem";

export default function Categories() {
  const { categories, getAllCategories, loading, infoTable } =
    useCategoriesStore((state) => state);
  console.log("categories: ", categories);

  useEffect(() => {
    const onSuccess = (res) => {
      console.log(res);
    };
    const onFail = (err) => {
      alert.error(err);
    };
    getAllCategories(onSuccess, onFail);
  }, []);
  return (
    <div className="mt-4 px-5">
      <p className="my-5 font-semibold text-[20px]">Danh mục sản phẩm</p>
      {loading ? <Loading /> : null}
      <div className="flex">
        <CategoriesListItem categoriesList={categories}/>
      </div>
    </div>
  );
}
