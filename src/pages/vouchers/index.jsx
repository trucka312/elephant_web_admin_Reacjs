import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Layout, Space, Table, Tooltip } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVouchersStore } from "../../store/vouchersStore";
import { formatNumber } from "../../utils";
import { alerts } from "../../utils/alerts";
import { formatDate } from "../../utils/date";

export default function Vouchers() {
  const navigate = useNavigate();
  const { vouchers, loading, getAllVouchers, deleteVoucher } = useVouchersStore(
    (state) => state
  );

  const vouchersTable = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      sorter: (vouchers1, vouchers) => +vouchers1.id - +vouchers.id,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (vouchers1, vouchers) =>
        vouchers1.name.localeCompare(vouchers.name),
      fixed: "left",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
      sorter: (vouchers1, vouchers) =>
        vouchers1.code.localeCompare(vouchers.code),
    },
    // {
    //   title: "Loại voucher",
    //   dataIndex: "voucher_type",
    //   key: "voucher_type",
    //   sorter: (vouchers1, vouchers) =>
    //     vouchers1.voucher_type.localeCompare(vouchers.voucher_type),
    // },
    // {
    //   title: "Giảm giá cho",
    //   key: "discount_for",
    //   dataIndex: "discount_for",
    // },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_time",
      key: "start_time",
      sorter: (vouchers1, vouchers) =>
        vouchers1.start_time.localeCompare(vouchers.start_time),
      render: (time) =>
        time ? (
          <p>
            {formatDate(new Date(time), " HH:mm DD/MM/yyyy").toLocaleString()}
          </p>
        ) : (
          <></>
        ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_time",
      key: "end_time",
      sorter: (vouchers1, vouchers) =>
        vouchers1.end_time.localeCompare(vouchers.end_time),
      render: (time) =>
        time ? (
          <p>
            {formatDate(new Date(time), " HH:mm DD/MM/yyyy").toLocaleString()}
          </p>
        ) : (
          <></>
        ),
    },
    {
      title: "Đơn đạt tối thiểu",
      dataIndex: "value_limit_total",
      key: "value_limit_total",
      // sorter: (vouchers1, vouchers) =>
      //   vouchers1.value_limit_total.toString().localeCompare(vouchers.value_limit_total.toString()),
      render: (voucher) => <p>{formatNumber(voucher) || 0}đ</p>,
    },
    {
      title: "Giảm giá",
      dataIndex: "value_discount",
      key: "value_discount",
      sorter: (vouchers1, vouchers) =>
        vouchers1.value_discount.toString().localeCompare(vouchers.value_discount.toString()),
      render: (_, voucher) => {
        const { discount_type, value_discount } = voucher;
        return (
          <p>
            {formatNumber(value_discount)}
            {!discount_type ? "đ" : "%"}
          </p>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      fixed: "right",
      align: "center",
      render: (voucher) => {
        return (
          <Space size="middle">
            {/* <Link to={`/vouchers/${voucher.id}`}> */}
            <Tooltip title="Sửa" color={"blue"}>
              <Button
                size="small"
                icon={<EditOutlined />}
                onClick={() =>
                  navigate(`/vouchers/${voucher.id}`, { state: voucher })
                }
              ></Button>
            </Tooltip>
            {/* </Link> */}
            <Tooltip title="Xóa" color={"red"}>
              <Button
                size="small"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDeleteVoucher(voucher.id)}
              ></Button>
            </Tooltip>
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
    getAllVouchers(onSuccess, onFail);
  }, []);

  const handleDeleteVoucher = (id) => {
    const onSuccess = () => {
      alerts.success("Xóa thành công");
    };
    const onFail = (err) => {
      alerts.error(err);
    };
    deleteVoucher(id, onSuccess, onFail);
  };

  return (
    <Layout.Content className="mt-4 px-5">
      <div className="flex justify-between items-center">
        <p className="my-4 font-semibold text-[20px]">Danh sách Vouchers</p>
        <Link to="/vouchers/create">
          <Button type="primary">Tạo voucher mới</Button>
        </Link>
      </div>
      
      <Table
        columns={vouchersTable}
        scroll={{ x: true }}
        size="middle"
        bordered
        dataSource={vouchers.length ? vouchers : []}
        loading={loading}
      />
    </Layout.Content>
  );
}
