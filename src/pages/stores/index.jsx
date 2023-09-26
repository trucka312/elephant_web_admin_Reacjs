import { Button, Drawer, Layout, Space, Table } from "antd";
import { useEffect, useState } from "react";
import StoresDetail from "./StoreDetail";
import { formatDate } from "../../utils/date";
import { EyeOutlined } from "@ant-design/icons";
import TableHeader from "../../components/table-header/Index";
import { useShopsStore } from "../../store/shopsStore";
import { alerts } from "../../utils/alerts";

export default function Stores() {
  const { stores, loading, getAllStores, searchStores } = useShopsStore(
    (state) => state
  );
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    search: "",
    begin_date_expried: "",
    end_date_expried: "",
    begin_date_register: "",
    end_date_register: "",
    // type_compare_date_expried: "",
    // limit: ""
  });

  const storesTable = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      sorter: (store1, store2) => +store1.id - +store2.id,
    },
    {
      title: "Logo",
      dataIndex: "logo_url",
      key: "logo_url",
      align: "center",
      render: (_, store) => {
        if (!store.logo_url) return null;
        return (
          <div>
            <img
              className="w-[40px] h-[40px] rounded-md"
              src={store.logo_url}
              alt="logo"
            />
          </div>
        );
      },

      fixed: "left",
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "name",
      key: "name",
      sorter: (store1, store2) => store1.name.localeCompare(store2.name),
      render: (name, store) => (
        <p
          className="text-[#0e2482] font-medium cursor-pointer"
          onClick={() => {
            setOpenDrawer(true);
            setSelectedId(store.id);
          }}
        >
          {name}
        </p>
      ),
    },
    {
      title: "Store code",
      dataIndex: "store_code",
      key: "store_code",
      sorter: (store1, store2) =>
        store1.store_code.localeCompare(store2.store_code),
        render: (code, seller) => (
          <p
            className="text-[#0e2482] font-medium cursor-pointer"
            onClick={() => {
              setOpenDrawer(true);
              setSelectedId(seller.id);
            }}
          >
            {code}
          </p>
        ),
    },
    {
      title: "Người tạo",
      dataIndex: "user",
      key: "user",
      render: (_, store) => {
        if (!store.user) return null;
        const { name, phone_number } = store.user;
        return (
          <div>
            <p>Tên: {name}</p>
            <p>SĐT: {phone_number}</p>
          </div>
        );
      },
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "date_expried",
      key: "date_expried",
      render: (date) =>
        date ? (
          <p>{formatDate(new Date(date), "DD/MM/yyyy").toLocaleString()}</p>
        ) : (
          <></>
        ),
      sorter: (store1, store2) =>
        new Date(store1.date_expried || "").getTime() -
        new Date(store2.date_expried || "").getTime(),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (seller) =>
        seller ? (
          <p>
            {formatDate(new Date(seller), " HH:mm DD/MM/yyyy").toLocaleString()}
          </p>
        ) : (
          <></>
        ),
      sorter: (store1, store2) =>
        new Date(store1.created_at || "").getTime() -
        new Date(store2.created_at || "").getTime(),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (seller) =>
        seller ? (
          <p>
            {formatDate(new Date(seller), " HH:mm DD/MM/yyyy").toLocaleString()}
          </p>
        ) : (
          <></>
        ),
      sorter: (store1, store2) =>
        new Date(store1.updated_at || "").getTime() -
        new Date(store2.updated_at || "").getTime(),
    },
    {
      title: "",
      key: "action",
      fixed: "right",
      align: "center",
      render: (_, store) => {
        return (
          <Space size="middle">
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => {
                setOpenDrawer(true);
                setSelectedId(store.id);
              }}
            >
              Xem
            </Button>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    const onSuccess = () => {};
    const onFail = (err) => {
      alerts.error(err);
    };
    getAllStores(onSuccess, onFail);
  }, []);

  return (
    <Layout.Content className="mt-4 px-5">
      <p className="my-5 font-semibold text-[20px]">Danh sách cửa hàng</p>
      <TableHeader
        isStore={true}
        onSearch={searchStores}
        setParams={setParams}
        params={params}
        titleDatePicker1="Ngày đăng ký"
        titleDatePicker2="Ngày hết hạn"
      />
      <Table
        columns={storesTable}
        scroll={{ x: true }}
        size="middle"
        bordered
        dataSource={stores && stores.length ? stores : []}
        loading={loading}
      />
      <Drawer
        title="Thông tin cửa hàng"
        placement="right"
        width="35vw"
        onClose={() => setOpenDrawer(false)}
        open={isOpenDrawer}
      >
        <StoresDetail id={selectedId} />
      </Drawer>
    </Layout.Content>
  );
}
