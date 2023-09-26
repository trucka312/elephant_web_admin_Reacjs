import { Layout, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../components/search-input";
import { statusProduct } from "../../constants";
import { useProductsStore } from "../../store/productsStore";
import { formatNumber, getPathByIndex } from "../../utils";
import { formatPriceProduct } from "../../utils/product";
import "./product.css";

export default function Products() {
  const navigate = useNavigate();
  const statusProductByPath = getPathByIndex(3);
  const { products, getAllProducts, loading, infoTable } = useProductsStore(
    (state) => state
  );
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 20,
    },
    status: statusProductByPath || "",
    keyword: ""
  });

  const handleTableChange = (pagination) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: pagination.current,
        status: statusProductByPath  || ""
      },
    });
  };

  const productsTable = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      sorter: (product1, product2) => +product1.id - +product2.id,
    },
    // {
    //     title: "Hình ảnh",
    //     dataIndex: "name",
    //     key: "name",
    //     sorter: (product1, product2) =>
    //       (product1.name || "").localeCompare(product2.name || ""),
    //     fixed: "left",
    //   },
    {
      title: "Mã SKU",
      dataIndex: "sku",
      key: "sku",
      sorter: (product1, product2) =>
        (product1.sku || "").localeCompare(product2.sku || ""),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (product1, product2) =>
        (product1.name || "").localeCompare(product2.name || ""),
        render: (name, product) => (
          <p
            className="text-[#0e2482] font-medium cursor-pointer"
          >
             <Link to={`/products/${product.id}`}>
              {name}
            </Link>
          </p>
        ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (product1, product2) =>
        product1.price.toString().localeCompare(product2.price.toString()),
      render: (_, product) => formatPriceProduct(product),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, product) => {
        switch (product.status) {
          case statusProduct.APPROVED:
            return (
              <div className="border-[#27AE60] border-solid text-[#27AE60] w-[110px] mx-auto border-[1px] font-semibold py-[6px] rounded-lg bg-[#27AE601A] text-center">
                Đã duyệt
              </div>
            );
          case statusProduct.VIOLATION:
            return (
              <div className="border-[#E83A2F] border-solid text-[#E83A2F] w-[110px] mx-auto border-[1px] font-semibold py-[6px] rounded-lg bg-[#E83A2F1A] text-center">
                Vi phạm
              </div>
            );
          case statusProduct.UNAPPROVED:
            return (
              <div className="border-[#F0AD00] border-solid text-[#F0AD00] w-[110px] mx-auto border-[1px] font-semibold py-[6px] rounded-lg bg-[#F0AD001A] text-center">
                Từ chối
              </div>
            );
          case statusProduct.DELETED:
            return (
              <div className="border-[#FF833D] border-solid text-[#FF833D] w-[110px] mx-auto border-[1px] font-semibold py-[6px] rounded-lg bg-[#F0AD001A] text-center">
                Vi phạm
              </div>
            );
          default:
            return (
              <div className="border-[#218ECB] border-solid text-[#218ECB] w-[110px] mx-auto border-[1px] font-semibold py-[6px] rounded-lg bg-[#218ECB1A] text-center">
                Chờ duyệt
              </div>
            );
        }
      },
    },
    {
      title: "Lượt xem",
      dataIndex: "view",
      key: "view",
      sorter: (product1, product2) =>
        product1.view.toString().localeCompare(product2.view.toString()),
      render: (_, product) => {
        return <div>{formatNumber(product.view)}</div>;
      },
    },
    {
      title: "Lượt thích",
      dataIndex: "likes",
      key: "likes",
      sorter: (product1, product2) =>
        product1.likes.toString().localeCompare(product2.likes.toString()),
      render: (_, product) => {
        return <div>{formatNumber(product.likes)}</div>;
      },
    },
  ];

  const dropdownOption = [
    {
      value: "",
      label: "Tất cả",
    },
    {
      value: "0",
      label: "Chờ duyệt",
    },
    {
      value: "2",
      label: "Đã duyệt",
    },
    {
      value: "3",
      label: "Từ chối",
    },
    {
      value: "1",
      label: "Vi phạm",
    },
    {
      value: "4",
      label: "Đã xóa",
    },
  ];

  useEffect(() => {
    fetchDataTable(tableParams.keyword)

    window.addEventListener("beforeunload", () => {});
    return () => {
      window.removeEventListener("beforeunload", () => {});
    };
  }, [navigate, tableParams.status, tableParams.pagination.current]);

  const fetchDataTable = (keyword) => {
    const onSuccess = (response) => {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.total,
        },
      });
    };
    const onFail = (err) => {
      alert.error(err);
    };
    getAllProducts(
      keyword,
      statusProductByPath || tableParams.status,
      tableParams.pagination.current || 1,
      onSuccess,
      onFail
    );
  }

  const onKeywordChange = (value) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
      keyword: value
    });
  }

  const onChangDropdown = (e) => {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          current: 1,
        },
        status: e
      });
  };

  return (
    <Layout.Content className="mt-4 px-5">
      <div className="flex justify-between">
        <p className="my-5 font-semibold text-[20px]">Danh sách sản phẩm</p>
        <div className="flex items-center gap-4">
          <p className="text-[#0e2482] font-medium">
            {infoTable.total} sản phẩm
          </p>
          <SearchInput
            keyword={tableParams.keyword}
            onChange={onKeywordChange}
            onSearch={fetchDataTable}
          />
          {!statusProductByPath && (
            <Select
              style={{ width: 200 }}
              defaultValue=""
              options={dropdownOption}
              onChange={onChangDropdown}
            />
          )}
        </div>
      </div>
      <Table
        columns={productsTable}
        scroll={{ x: true }}
        size="middle"
        bordered
        dataSource={products.length ? products : []}
        loading={loading}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
      />
    </Layout.Content>
  );
}
