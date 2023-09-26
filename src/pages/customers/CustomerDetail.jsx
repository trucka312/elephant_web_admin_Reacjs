import { useEffect } from "react";
import { useCustomersStore } from "../../store/customersStore";
import ImageDefault from "../../assets/images/image-default.jpg";
import { Col, Image, Row } from "antd";
import { formatDate } from "../../utils/date";
import Loading from "../../components/loading/Index";
import { formatNumber } from "../../utils";

export default function CustomerDetail({ id }) {
  const { loadingById, customerById, getCustomerById } = useCustomersStore(
    (state) => state
  );

  useEffect(() => {
    const onSuccess = (res) => {
      console.log(res);
    };
    const onFail = (err) => {
      alert.error(err);
    };
    getCustomerById(id, onSuccess, onFail);
  }, [id]);

  const renderCustomerDetail = () => {
    console.log("storeById: ", customerById);
    if (loadingById) return <Loading />;
    if (customerById === {}) return <p>Không có dữ liệu</p>;

    const {
      avatar_image,
      email,
      country_name,
      phone_number,
      district_name,
      province_name,
      points,
      wards_name,
      address_detail,
      total_final_all_status,
      created_at,
      name,
    } = customerById;
    return (
      <>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col className="font-medium text-[#21409A]">
            {
              <Image
                width={60}
                height={60}
                className="object-cover rounded-full"
                src={avatar_image || ImageDefault}
              />
            }
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={8}>Tên:</Col>
          <Col className="font-medium text-[#21409A]">{name}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={8}>Số điện thoại:</Col>
          <Col className="font-medium text-[#21409A]">{phone_number}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={8}>Email:</Col>
          <Col className="font-medium text-[#21409A]">{email}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={8}>Địa chỉ:</Col>
          <Col className="font-medium text-[#21409A]">
            <p>{address_detail}</p>
            <p>{wards_name}, {district_name}, {province_name}, {country_name}</p>
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={8}>Ngày tạo:</Col>
          <Col className="font-medium text-[#21409A]">
            {formatDate(
              new Date(created_at),
              " HH:mm DD/MM/yyyy"
            ).toLocaleString()}
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={8}>Xu tích lũy:</Col>
          <Col className="font-medium text-[#21409A]">{formatNumber(points)} xu</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={8}>Tổng tiền hàng:</Col>
          <Col className="font-medium text-[#21409A]">{formatNumber(total_final_all_status)}đ</Col>
        </Row>
      </>
    );
  };

  return renderCustomerDetail();
}
