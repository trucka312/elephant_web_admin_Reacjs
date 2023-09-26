import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import ImageDefault from "../../../assets/images/image-default.jpg";
import Upload from "../../../components/upload";
import { useButtonMenuStore } from "../../../store/buttonMenuStore";
import { alerts } from "../../../utils/alerts";

export default function ButtonMenu() {
  const {
    banners,
    loading,
    getAllBanners,
    deleteBanner,
    createBanner,
    updateBanner,
  } = useButtonMenuStore((state) => state);
  const [isShowModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [selectedBanner, setSelectedBanner] = useState(null);

  useEffect(() => {
    fetchDataTable();
  }, []);

  const fetchDataTable = () => {
    const onSuccess = () => {};
    const onFail = (err) => {
      alerts.error(err);
    };
    getAllBanners(onSuccess, onFail);
  };

  const bannersTable = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      sorter: (banner1, banner2) => +banner1.id - +banner2.id,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      sorter: (banner1, banner2) => banner1.title.localeCompare(banner2.title),
      fixed: "left",
    },
    {
      title: "Hình ảnh",
      key: "image_url",
      align: "center",
      dataIndex: "image_url",
      render: (_, banner) => {
        return (
          <Image
            width="70px"
            height="70px"
            className="object-cover"
            src={banner.image_url || ImageDefault}
          />
        );
      },
    },
    {
      title: "",
      key: "action",
      fixed: "right",
      align: "center",
      render: (banner) => {
        return (
          <Space size="middle">
            <Tooltip title="Sửa" color={"blue"}>
              <Button
                size="small"
                icon={<EditOutlined />}
                onClick={() => {
                  setShowModal(true);
                  setSelectedBanner(banner);
                  setImage(banner.image_url);
                }}
              ></Button>
            </Tooltip>
            <Tooltip title="Xóa" color={"red"}>
              <Button
                size="small"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDeleteBanner(banner.id)}
              ></Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const onSubmit = (value) => {
    const onSuccess = () => {
      alerts.success(
        !selectedBanner ? "Tạo thành công" : "Cập nhật thành công"
      );
      setShowModal(false);
      fetchDataTable();
    };
    const onFail = (err) => {
      alerts.error(err);
    };
    if (!selectedBanner)
      createBanner(
        { ...value, image_url: image, is_show: true },
        onSuccess,
        onFail
      );
    else
      updateBanner(
        selectedBanner.id,
        { ...value, image_url: image, is_show: true },
        onSuccess,
        onFail
      );
  };

  const handleDeleteBanner = (id) => {
    const onSuccess = () => {
      alerts.success("Xóa thành công");
    };
    const onFail = (err) => {
      alerts.error(err);
    };
    deleteBanner(id, onSuccess, onFail);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="my-4 font-semibold text-[20px]">Danh sách Banners</p>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true);
            setSelectedBanner(null);
            setImage(null);
          }}
        >
          Tạo button mới
        </Button>
      </div>

      <Table
        columns={bannersTable}
        scroll={{ x: true }}
        size="middle"
        bordered
        dataSource={banners.length ? banners : []}
        loading={loading}
      />
      {isShowModal && (
        <Modal
          title={!selectedBanner ? "Thêm button mới" : "Cập nhật button"}
          open={isShowModal}
          onCancel={() => {
            setShowModal(false);
          }}
          footer={false}
          centered
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 24,
            }}
            onFinish={onSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Row className="px-1 justify-between">
              <Col span={24}>
                <Form.Item
                  label="Tên tiêu đề"
                  name="title"
                  labelAlign="left"
                  className="font-medium"
                  sx={{ width: "100%" }}
                  labelCol={{
                    span: 24,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên tiêu đề",
                    },
                  ]}
                  initialValue={selectedBanner?.title}
                >
                  <Input
                    placeholder="Nhập tiêu đề"
                    defaultValue={selectedBanner?.title}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="px-1 justify-between h-[150px] w-full rounded-lg mb-10">
              <Col span={24}>
                <Form.Item
                  label="Hình ảnh"
                  name="image_url"
                  labelAlign="left"
                  className="font-medium"
                  labelCol={{
                    span: 24,
                  }}
                  rules={[
                    {
                      validator() {
                        if (image) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Vui lòng chọn hình ảnh")
                        );
                      },
                    },
                  ]}
                  initialValue={selectedBanner?.image_url}
                >
                  <Upload
                    image={image || selectedBanner?.image_url}
                    setImage={setImage}
                    width={"100px"}
                    height={"100px"}
                  />
                </Form.Item>
              </Col>
            </div>
            <Row className="pt-3 px-1 justify-between">
              <Col span={24}>
                <Form.Item
                  label="URL trang đích"
                  name="action_link"
                  labelAlign="left"
                  className="font-medium"
                  sx={{ width: "100%" }}
                  labelCol={{
                    span: 24,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập URL trang đích",
                    },
                  ]}
                  initialValue={selectedBanner?.action_link}
                >
                  <Input
                    placeholder="VD: https://admin-hihihi.vn"
                    defaultValue={selectedBanner?.action_link}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="w-[300px] mx-auto">
              <Button
                className="mt-4"
                block
                type="primary"
                htmlType="submit"
                disabled={loading}
                width={200}
              >
                {!selectedBanner ? "Tạo" : "Cập nhật"}
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}
