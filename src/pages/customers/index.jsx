import { EyeOutlined } from "@ant-design/icons";
import { Button, Drawer, Image, Layout, Space, Table } from "antd";
import { useEffect, useState } from "react";
import ImageDefault from "../../assets/images/image-default.jpg";
import { useCustomersStore } from "../../store/customersStore";
import { formatNumber } from "../../utils";
import { formatDate } from "../../utils/date";
import CustomerDetail from "./CustomerDetail";
import SearchInput from "../../components/search-input";

export default function Customers() {
  const { customers, getAllCustomers, loading, infoTable } = useCustomersStore(
    (state) => state
  );
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  useEffect(() => {
    fetchDataTable(keyword);
  }, []);

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
    getAllCustomers(keyword, onSuccess, onFail);
  };

  const handleTableChange = (pagination) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: pagination.current,
      },
    });
  };

  const productsTable = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      sorter: (customer1, customer2) => +customer1.id - +customer2.id,
    },
    {
      title: "Avatar",
      dataIndex: "avatar_image",
      key: "avatar_image",
      align: "center",
      render: (_, customer) => {
        return (
          <div>
            <Image
              width={40}
              height={40}
              className="object-cover rounded-full"
              src={customer.avatar_image || ImageDefault}
            />
          </div>
        );
      },
      fixed: "left",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (customer1, customer2) =>
        (customer1.name || "").localeCompare(customer2.name || ""),
      render: (name, customer) => (
        <p
          onClick={() => {
            setOpenDrawer(true);
            setSelectedId(customer.id);
          }}
          className="text-[#0e2482] font-medium cursor-pointer"
        >
          {name}
        </p>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
      sorter: (customer1, customer2) =>
        (customer1.phone_number || "").localeCompare(
          customer2.phone_number || ""
        ),
        render: (phone, customer) => (
          <p
            onClick={() => {
              setOpenDrawer(true);
              setSelectedId(customer.id);
            }}
            className="text-[#0e2482] font-medium cursor-pointer"
          >
            {phone}
          </p>
        ),
    },
    {
      title: "Xu tích lũy",
      dataIndex: "points",
      key: "points",
      sorter: (customer1, customer2) =>
        customer1.points.toString().localeCompare(customer2.points.toString()),
      render: (_, customer) => formatNumber(customer.points),
    },
    {
      title: "Ngày tham gia",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) =>
        date ? (
          <p>
            {formatDate(new Date(date), " HH:mm DD/MM/yyyy").toLocaleString()}
          </p>
        ) : (
          <></>
        ),
      sorter: (date1, date2) =>
        new Date(date1.created_at || "").getTime() -
        new Date(date2.created_at || "").getTime(),
    },
    {
      title: "Tổng tiền hàng",
      dataIndex: "total_final_all_status",
      key: "total_final_all_status",
      sorter: (customer1, customer2) =>
        customer1.total_final_all_status
          .toString()
          .localeCompare(customer2.total_final_all_status.toString()),
      render: (_, customer) => {
        return <div>{formatNumber(customer.total_final_all_status)}đ</div>;
      },
    },
    // {
    //   title: "",
    //   key: "action",
    //   fixed: "right",
    //   align: "center",
    //   render: (_, customer) => {
    //     return (
    //       <Space size="middle">
    //         <Button
    //           size="small"
    //           icon={<EyeOutlined />}
    //           onClick={() => {
    //             setOpenDrawer(true);
    //             setSelectedId(customer.id);
    //           }}
    //         >
    //           Xem
    //         </Button>
    //       </Space>
    //     );
    //   },
    // },
  ];

  return (
    <Layout.Content className="mt-4 px-5">
      <p className="my-5 font-semibold text-[20px]">Danh sách khách hàng</p>
      <div className="flex gap-4 items-center my-3">
        <SearchInput
          keyword={keyword}
          onChange={setKeyword}
          onSearch={fetchDataTable}
        />
        <p className="text-[#0e2482] font-medium">
          {infoTable.total} khách hàng
        </p>
      </div>
      <Table
        columns={productsTable}
        scroll={{ x: true }}
        size="middle"
        bordered
        dataSource={customers.length ? customers : []}
        loading={loading}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
      />
      <Drawer
        title="Thông tin khách hàng"
        placement="right"
        width="35vw"
        onClose={() => setOpenDrawer(false)}
        open={isOpenDrawer}
      >
        <CustomerDetail id={selectedId} />
      </Drawer>
    </Layout.Content>
  );
}
