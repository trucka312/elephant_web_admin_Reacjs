import { useEffect } from "react";
import { useSellersStore } from "../../store/sellersStore";
import Loading from "../../components/loading/Index";
import { Col, Row } from "antd";
import { formatDate } from "../../utils/date";

export default function SellerDetail({ id }) {
  const { loadingById, getSellersById, sellerById } = useSellersStore(
    (state) => state
  );

  useEffect(() => {
    const onSuccess = (res) => {
      console.log(res);
    };
    const onFail = (err) => {
      alert.error(err);
    };
    getSellersById(id, onSuccess, onFail);
  }, [id]);

  const renderSellerDetail = () => {
    if (loadingById) return <Loading />;
    if (sellerById === {}) return <p>Không có dữ liệu</p>;

    const {
      created_at,
      name,
      phone_number,
      updated_at,
      last_visit_time,
      email,
    } = sellerById;
    return (
      <>
        <p className="text-[20px] font-semibold">Thông tin gian hàng</p>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={6} className="text-[#0e2482] font-medium">
            Tên:
          </Col>
          <Col>{name}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={6} className="text-[#0e2482] font-medium">
            Số điện thoại:
          </Col>
          <Col>{phone_number}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={6} className="text-[#0e2482] font-medium">
            Email:
          </Col>
          <Col>{email}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={6} className="text-[#0e2482] font-medium">
            Ngày tạo:
          </Col>
          <Col>
            {formatDate(
              new Date(created_at),
              " HH:mm DD/MM/yyyy"
            ).toLocaleString()}
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={6} className="text-[#0e2482] font-medium">
            Ngày cập nhật:
          </Col>
          <Col>
            {formatDate(
              new Date(updated_at),
              " HH:mm DD/MM/yyyy"
            ).toLocaleString()}
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={6} className="text-[#0e2482] font-medium">
            Ngày cập nhật:
          </Col>
          <Col>
            {formatDate(
              new Date(last_visit_time),
              " HH:mm DD/MM/yyyy"
            ).toLocaleString()}
          </Col>
        </Row>
      </>
    );
  };

  return renderSellerDetail();
}
