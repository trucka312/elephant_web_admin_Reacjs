import PropTypes from "prop-types";
import { useState } from "react";
import CategoryItem from "./CategoryItem";

export default function CategoriesListItem({ categoriesList }) {
  console.log("categoriesList:111 ", categoriesList);
  const getChildren = () => {
    const categoriesSelect =
      categoriesList && categoriesList.length
        ? categoriesList.filter((item) => item.id === selectedId)
        : [];
    if (!categoriesSelect.length) return null;
    return categoriesSelect[0].children;
  };

  const [selectedId, setSelectedId] = useState();
  if (!categoriesList || !categoriesList.length) return null;
  return (
    <div className="border-r-[2px] border-solid border-l-0 border-b-0 border-t-0 w-[270px] border-[#f5f5f5] flex">

      <div className="relative pb-[38px]">
        {categoriesList && categoriesList.length
          ? categoriesList.map((item) => (
              <CategoryItem
                key={item.id}
                category={item}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            ))
          : null}
        {/* <div className="text-center absolute left-[50%] translate-x-[-50%] text-[#21409A] font-bold cursor-pointer bg-[#21409A1A] w-full py-[10px]">
          Thêm
        </div> */}
      </div>
      {categoriesList && categoriesList.length ? (
        <div className="">
          <CategoriesListItem categoriesList={getChildren()} />
        </div>
      ) : null}
    </div>
  );
}

CategoriesListItem.propTypes = {
  categoriesList: PropTypes.array,
};
