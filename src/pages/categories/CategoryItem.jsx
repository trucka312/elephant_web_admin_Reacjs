import { Tooltip } from "antd";
import PropTypes from "prop-types";
import { IconChevronRight } from "../../assets/icons";

export default function CategoryItem({ category, selectedId, setSelectedId }) {
  const { display_name, id } = category;
  const hasChildren = category && category.children?.length ? true : false;
  return (
    <div>
      <div
        className={`flex justify-between w-[270px] text-[15px] cursor-pointer hover:bg-[#f6f6f6] py-[8px] px-[16px] group font-medium ${
          selectedId === id ? "text-[#21409A]" : "text-[#333]"
        }`}
        onClick={() => setSelectedId(id)}
      >
        {display_name}{" "}
        {hasChildren ? (
          <Tooltip title="Xem danh mục con" color={"blue"}>
            <IconChevronRight
              className={`w-[18px] group-hover:text-[#21409A] ${
                selectedId === id ? "text-[#21409A]" : "text-[#888]"
              }`}
            />
          </Tooltip>
        ) : null}
      </div>
      {/* (
          <Tooltip title="Thêm danh mục con" color={"blue"}>
            <PlusIcon
              className={`w-[16px] h-[18px] group-hover:text-[#21409A] ${
                selectedId === id ? "text-[#21409A]" : "text-[#888]"
              }`}
            />
          </Tooltip>
        ) */}
      {selectedId === id ? <abc /> : null}
    </div>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.object,
  selectedId: PropTypes.number,
  setSelectedId: PropTypes.func,
};
