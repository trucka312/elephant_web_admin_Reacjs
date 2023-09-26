import { useEffect } from "react";
import Loading from "../../components/loading/Index";
import { Col, Row } from "antd";
import { formatDate } from "../../utils/date";
import { useShopsStore } from "../../store/shopsStore";

export default function StoreDetail({ id }) {
  const { loadingById, getStoreById, storeById } = useShopsStore(
    (state) => state
  );

  useEffect(() => {
    const onSuccess = (res) => {
      console.log(res);
    };
    const onFail = (err) => {
      alert.error(err);
    };
    getStoreById(id, onSuccess, onFail);
  }, [id]);

  const renderStoreDetail = () => {
    console.log('storeById: ', storeById);
    if (loadingById) return <Loading />;
    if (storeById === {}) return <p>Không có dữ liệu</p>;

    const {
      store_code,
      date_expried,
      created_at,
      name,
      user,
      name_career,
      updated_at,
      address,
    } = storeById;
    return (
      <>
        <p className="text-[20px] font-semibold">Thông tin gian hàng</p>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10}>Store code:</Col>
          <Col className="font-medium text-[#21409A]">{store_code}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10}>Tên:</Col>
          <Col className="font-medium text-[#21409A]">{name}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10}>Hạn sử dụng:</Col>
          <Col className="font-medium text-[#21409A]">
            {formatDate(new Date(date_expried), "DD/MM/yyyy").toLocaleString()}
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10}>Tên cửa hàng:</Col>
          <Col className="font-medium text-[#21409A]">{name_career}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10}>Địa chỉ:</Col>
          <Col className="font-medium text-[#21409A]">{address}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10}>Tên người tạo:</Col>
          <Col className="font-medium text-[#21409A]">{user?.name}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10}>SĐT người tạo:</Col>
          <Col className="font-medium text-[#21409A]">{user?.phone_number}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10}>Ngày tạo:</Col>
          <Col className="font-medium text-[#21409A]">
            {formatDate(
              new Date(created_at),
              " HH:mm DD/MM/yyyy"
            ).toLocaleString()}
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10}>Ngày cập nhật:</Col>
          <Col className="font-medium text-[#21409A]">
            {formatDate(
              new Date(updated_at),
              " HH:mm DD/MM/yyyy"
            ).toLocaleString()}
          </Col>
        </Row>
      </>
    );
  };

  return renderStoreDetail();
}
