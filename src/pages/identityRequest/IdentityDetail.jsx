import { Col, Image, Modal, Row, Spin, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BankIcon,
  CircleCheck,
  CircleClose,
  CreditCardIcon,
  HomeIcon,
  ListIcon,
  StoreIcon,
  UserIcon,
} from "../../assets/icons";
import CircleQuestion from "../../assets/icons/CircleQuestion";
import LocationIcon from "../../assets/icons/LocationIcon";
import ImageDefault from "../../assets/images/image-default.jpg";
import Loading from "../../components/loading/Index";
import { statusIdentity, stepIdentityStatus } from "../../constants";
import { useIdentityRequestsStore } from "../../store/identityRequestStore";
import { getPathByIndex } from "../../utils";
import { alerts } from "../../utils/alerts";
import ContentHeader from "../../components/content-header";

const tabSelect = {
  SUPPLIER: 0,
  SHOP: 1,
  WAREHOUSE: 2,
  ACCOUNT: 3,
};

export default function IdentityDetail() {
  const identityId = getPathByIndex(2);
  const navigate = useNavigate();

  const {
    identityRequestById,
    getIdentityRequestById,
    loading,
    loadingStatus,
    changeStatusIdentity,
  } = useIdentityRequestsStore((state) => state);
  const [open, setOpen] = useState(false);
  const [reasonUnapproved, setReasonUnapproved] = useState(null);
  const [tabSelected, setTabSelected] = useState(0);

  useEffect(() => {
    getIdentityRequestById(identityId);
  }, []);

  const onApprove = (params) => {
    if (
      params.status !== undefined &&
      (status_supplier !== stepIdentityStatus.APPROVED ||
        status_shop !== stepIdentityStatus.APPROVED ||
        status_warehouse !== stepIdentityStatus.APPROVED ||
        status_account_payment !== stepIdentityStatus.APPROVED)
    ) {
      alerts.warning("Hoàn thành hết các thông tin trước khi kích hoạt hồ sơ");
      return;
    }
    const onSuccess = () => {
      alerts.success("Duyệt thành công");
      if (params.status !== undefined) navigate(-1);
    };
    const onFail = (err) => {
      alerts.error(err);
    };

    changeStatusIdentity(identityId, params, onSuccess, onFail);
  };

  const onUnApprove = (params) => {
    if (!reasonUnapproved) {
      alerts.warning("Bạn chưa nhập lý do từ chối");
      return;
    }
    const onSuccess = () => {
      alerts.success("Đã từ chối duyệt");
      setOpen(false);
      setReasonUnapproved("");
      if (params.status !== undefined) navigate(-1);
    };
    const onFail = (err) => {
      alerts.error(err);
    };

    changeStatusIdentity(identityId, params, onSuccess, onFail);
  };

  if (loading) return <Loading />;
  if (!identityRequestById)
    return <p className="mt-5 ml-5">Không lấy được thông tin</p>;
  const {
    company_name,
    co_cq,
    phone_number,
    verified_phone_number,
    delivery_address,
    main_business_industry,
    tax_code,
    email,
    verified_email,
    images_co_cq,
    shop_name,
    shop_logo,
    images_business_registration,
    seller_certificate,
    title_meta,
    desc_meta,
    factory_scale,
    item_insurance_policy,
    seller_warehouse,
    seller_bank,
    status,
    status_supplier,
    status_shop,
    status_account_payment,
    reason_unapproved,
    note_supplier,
    note_shop,
    status_warehouse,
    note_warehouse,
    note_account_payment,
  } = identityRequestById;

  const renderSupplierInfo = () => {
    return (
      <>
        <p className="text-[20px] font-semibold">Thông tin nhà cung cấp</p>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium flex-col">
            Tên:
          </Col>
          <Col>{company_name}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Mã số thuế:
          </Col>
          <Col>{tax_code}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Ảnh đăng ký kinh doanh:
          </Col>
          <Col>
            {images_business_registration && images_business_registration.length
              ? images_business_registration.map((item, index) => (
                  <Image
                    width={65}
                    height={65}
                    className="object-cover"
                    key={index}
                    src={item || ImageDefault}
                  />
                ))
              : null}
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            CO/CQ:
          </Col>
          <Col>{co_cq}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Ảnh CO/CQ:
          </Col>
          <Col>
            <Image
              width={65}
              height={65}
              className="object-cover"
              src={images_co_cq || ImageDefault}
            />
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Địa chỉ kho hàng giao đi:
          </Col>
          <Col>{delivery_address}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Ngành nghề kinh doanh chính:
          </Col>
          <Col>{main_business_industry}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Số điện thoại:
          </Col>
          <Col span={10}>{phone_number}</Col>
          <Col span={10} className="text-[#0e2482] font-medium">
            {verified_phone_number ? "Đã xác minh" : "Chưa xác minh"}
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Email:
          </Col>
          <Col span={10}>{email}</Col>
          <Col span={10} className="text-[#0e2482] font-medium">
            {verified_email ? "Đã xác minh" : "Chưa xác minh"}
          </Col>
        </Row>
        <Row className="gap-[4px] justify-start mt-3 break-words">
          <Col span={10} className="text-[#0e2482] font-medium">
            Chứng chỉ đạt được:
          </Col>
          <Col span={12}>
            {seller_certificate && seller_certificate.length
              ? seller_certificate.map((item) => {
                  const { id, images, name } = item;
                  return (
                    <Row key={id} className="mt-2">
                      <Col span={20}>{name}</Col>
                      <Col span={4}>
                        <Image
                          width={65}
                          height={65}
                          className="object-cover"
                          src={images[0] || ImageDefault}
                        />
                      </Col>
                    </Row>
                  );
                })
              : null}
          </Col>
        </Row>
      </>
    );
  };

  const renderStallInfo = () => {
    return (
      <>
        <p className="text-[20px] font-semibold">Thông tin gian hàng</p>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Tên cửa hàng:
          </Col>
          <Col>{shop_name}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Biểu trưng cửa hàng:
          </Col>
          <Col>
            <Image
              width={65}
              height={65}
              className="object-cover"
              src={shop_logo || ImageDefault}
            />
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Tiêu đề meta:
          </Col>
          <Col>{title_meta}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Mô tả meta:
          </Col>
          <Col>{desc_meta}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Quy mô nhà máy:
          </Col>
          <Col>
            {factory_scale && factory_scale.length
              ? factory_scale.map((item, index) => (
                  <Row key={index}>{item}</Row>
                ))
              : null}
          </Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={10} className="text-[#0e2482] font-medium">
            Chính sách bảo hiểm hàng hóa:
          </Col>
          <Col>
            {item_insurance_policy && item_insurance_policy.length
              ? item_insurance_policy.map((item, index) => (
                  <Row key={index}>{item}</Row>
                ))
              : null}
          </Col>
        </Row>
      </>
    );
  };

  const renderSupplierWarehouse = () => {
    return (
      <>
        <p className="text-[20px] font-semibold">Kho nhà cung cấp</p>
        {seller_warehouse && seller_warehouse.length ? (
          seller_warehouse.map((item) => {
            const {
              address_detail,
              district_name,
              name,
              phone_number,
              province_name,
              ward_name,
              id,
            } = item;
            return (
              <Row key={id} className="mt-[20px]">
                <Col span={4}>
                  <LocationIcon className="w-[20px] text-[#0e2482]" />
                </Col>
                <Col span={20}>
                  <Row>
                    <Col span={8} className="text-[#646464] mb-2">
                      Họ và tên:
                    </Col>
                    <Col span={12} className="font-medium">
                      {name}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8} className="text-[#646464] mb-2">
                      Số điện thoại:
                    </Col>
                    <Col span={12}>{phone_number}</Col>
                  </Row>
                  <Row>
                    <Col span={8} className="text-[#646464] mb-2">
                      Địa chỉ:
                    </Col>
                    <Col span={12}>
                      <Row className="mb-1">
                        {address_detail}, {ward_name}, {district_name},{" "}
                        {province_name}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            );
          })
        ) : (
          <p className="mt-2">Chưa có thông tin kho nhà cung cấp</p>
        )}
      </>
    );
  };

  const renderPaymentAccount = () => {
    return (
      <>
        <p className="text-[20px] font-semibold">Tài khoản thanh toán</p>
        {seller_bank && seller_bank.length ? (
          seller_bank.map((item) => {
            const {
              bank_account_name,
              bank_account_number,
              bank_name,
              bank_name_branch,
              id,
            } = item;
            return (
              <Row key={id} className="mt-[20px]">
                <Col span={4}>
                  <CreditCardIcon className="w-[20px] text-[#0e2482]" />
                </Col>
                <Col span={20}>
                  <Row>
                    <Col span={8} className="text-[#646464] mb-2">
                      Tên tài khoản:
                    </Col>
                    <Col span={12} className="font-medium">
                      {bank_account_name}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8} className="text-[#646464] mb-2">
                      Số tài khoản:
                    </Col>
                    <Col span={12}>{bank_account_number}</Col>
                  </Row>
                  <Row>
                    <Col span={8} className="text-[#646464] mb-2">
                      Ngân hàng:
                    </Col>
                    <Col span={12}>
                      <Row className="mb-1">{bank_name}</Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8} className="text-[#646464] mb-2">
                      Chi nhánh:
                    </Col>
                    <Col span={12}>
                      <Row className="mb-1">{bank_name_branch}</Row>
                    </Col>
                  </Row>
                </Col>
                {/* <Col><LocationIcon className="w-[20px] text-[#0e2482]" /></Col> */}
              </Row>
            );
          })
        ) : (
          <p className="mt-2">Chưa có thông tin tài khoản thanh toán</p>
        )}
      </>
    );
  };

  const renderStep = () => {
    const stepItem = [
      {
        id: 1,
        title: "Thông tin nhà cung cấp",
        tab: tabSelect.SUPPLIER,
        status: status_supplier,
        note: note_supplier,
        icon: <UserIcon className="w-[24px] h-[24px]" />,
        onClick: () => setTabSelected(tabSelect.SUPPLIER),
        onAgree: () =>
          onApprove({ status_supplier: stepIdentityStatus.APPROVED }),
        onRefuse: () =>
          onUnApprove({
            status_supplier: stepIdentityStatus.UNAPPROVED,
            note_supplier: reasonUnapproved,
          }),
      },
      {
        id: 2,
        title: "Thông tin gian hàng",
        tab: tabSelect.SHOP,
        status: status_shop,
        note: note_shop,
        icon: <StoreIcon className="w-[24px] h-[24px]" />,
        onClick: () => setTabSelected(tabSelect.SHOP),
        onAgree: () => onApprove({ status_shop: stepIdentityStatus.APPROVED }),
        onRefuse: () =>
          onUnApprove({
            status_shop: stepIdentityStatus.UNAPPROVED,
            note_shop: reasonUnapproved,
          }),
      },
      {
        id: 3,
        title: "Kho nhà cung cấp",
        tab: tabSelect.WAREHOUSE,
        note: note_warehouse,
        status: status_warehouse,
        icon: <HomeIcon className="w-[24px] h-[24px]" />,
        onClick: () => setTabSelected(tabSelect.WAREHOUSE),
        onAgree: () =>
          onApprove({ status_warehouse: stepIdentityStatus.APPROVED }),
        onRefuse: () =>
          onUnApprove({
            status_warehouse: stepIdentityStatus.UNAPPROVED,
            note_warehouse: reasonUnapproved,
          }),
      },
      {
        id: 4,
        title: "Tài khoản thanh toán",
        tab: tabSelect.ACCOUNT,
        note: note_account_payment,
        status: status_account_payment,
        icon: <BankIcon className="w-[24px] h-[24px]" />,
        onClick: () => setTabSelected(tabSelect.ACCOUNT),
        onAgree: () =>
          onApprove({
            status_account_payment: stepIdentityStatus.APPROVED,
          }),
        onRefuse: () =>
          onUnApprove({
            status_account_payment: stepIdentityStatus.UNAPPROVED,
            note_account_payment: reasonUnapproved,
          }),
      },
      {
        id: 5,
        title: "Kích hoạt hồ sơ",
        status: status,
        note: reason_unapproved,
        icon: <ListIcon className="w-[24px] h-[24px]" />,
        onAgree: () =>
          onApprove({
            status: statusIdentity.APPROVED,
          }),
        onRefuse: () =>
          onUnApprove({
            status: stepIdentityStatus.UNAPPROVED,
            reason_unapproved: reasonUnapproved,
          }),
      },
    ];

    const handleGetInfoStep = (statusStep) => {
      switch (statusStep) {
        case stepIdentityStatus.PROGRESSING:
          return {
            color: "#F0AD00",
            statusText: "Đang chờ",
            showAction: [true, true],
          };
        case stepIdentityStatus.APPROVED:
          return {
            color: "#27AE60",
            statusText: "Hoàn thành!",
            showAction: [true, false],
          };
        case stepIdentityStatus.UNAPPROVED:
          return {
            color: "#E83A2F",
            statusText: "Từ chối",
            showAction: [true, true],
          };
        default:
          return {
            color: "#ccc",
            statusText: "Chưa có thông tin",
            showAction: [false, false],
          };
      }
    };

    return (
      <div className="mx-auto">
        <Spin spinning={loadingStatus}>
          <div className="relative flex gap-[30px] justify-center w-full">
            {stepItem.map((item) => {
              const {
                id,
                title,
                status,
                icon,
                tab,
                note,
                onClick,
                onAgree,
                onRefuse,
              } = item;

              const { color, statusText, showAction } =
                handleGetInfoStep(status);
              return (
                <div
                  key={id}
                  className={`w-[170px] rounded-lg text-center bg-[#f5f5f5] pt-[20px] pb-[10px] cursor-pointer hover:bg-white hover:shadow-[0_0_14px_0px_rgba(22,119,255,0.3)] group duration-300 ${
                    tabSelected === tab &&
                    "bg-white shadow-[0_0_14px_0px_rgba(22,119,255,0.3)]"
                  }`}
                  onClick={onClick}
                >
                  <div
                    className={`text-[${color}] p-[16px] rounded-[10px]  w-[56px] h-[56px] mx-auto group-hover:bg-[#e6f7ff] ${
                      tabSelected === tab && "bg-[#e6f7ff]"
                    }  duration-300 bg-[#e9e9e9]`}
                  >
                    {icon}
                  </div>
                  <div className="text-[#0e2482] font-medium mt-[16px] mb-[16px]">
                    {title}
                  </div>
                  <p
                    className={`text-[${color}] font-medium flex items-center justify-center gap-1`}
                  >
                    {statusText}{" "}
                    {note && status === stepIdentityStatus.UNAPPROVED ? (
                      <Tooltip title={note} color="#E83A2F">
                        <CircleQuestion className="w-[14px] h-[14px]" />
                      </Tooltip>
                    ) : null}
                  </p>
                  <div className="flex gap-3 justify-center mt-3">
                    {showAction[0] && (
                      <Tooltip title="Từ chối" color="#E83A2F">
                        <div
                          className="w-[36px] h-[36px] p-2 rounded-full hover:bg-[#e9e9e9]"
                          onClick={() => {
                            setOpen(true);
                            setReasonUnapproved(null);
                          }}
                        >
                          <CircleClose className="w-[20px] h-[20px] text-[#E83A2F]" />
                        </div>
                      </Tooltip>
                    )}
                    {showAction[1] && (
                      <Tooltip title="Đồng ý" color="#27AE60">
                        <div
                          className="w-[36px] h-[36px] p-2 rounded-full hover:bg-[#e9e9e9]"
                          onClick={onAgree}
                        >
                          <CircleCheck className="w-[20px] h-[20px] text-[#27AE60]" />
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  <Modal
                    title="Lý do từ chối"
                    open={open && tabSelected === tab}
                    onOk={onRefuse}
                    onCancel={() => {
                      setOpen(false);
                      setReasonUnapproved(null);
                    }}
                    centered
                    okText="Đồng ý"
                    cancelText="Hủy"
                  >
                    <TextArea
                      placeholder="Nhập lý do..."
                      style={{ height: 120, marginTop: 12, marginBottom: 12 }}
                      onChange={(e) => setReasonUnapproved(e.target.value)}
                      value={reasonUnapproved}
                    ></TextArea>
                  </Modal>
                </div>
              );
            })}
          </div>
        </Spin>
      </div>
    );
  };

  return (
    <div className="mt-[16px] relative min-h-[calc(100vh-110px)]">
      <ContentHeader title="Nhà sản xuất tại Việt Nam" />
      <Row className="my-[16px]">{renderStep()}</Row>
      <div className="h-2 w-full bg-[#F4F4F5]"></div>
      <Row className="p-[20px] bg-white items-center justify-center mb-10">
        <Col span={12}>
          {tabSelected === tabSelect.SUPPLIER && renderSupplierInfo()}
          {tabSelected === tabSelect.SHOP && renderStallInfo()}
          {tabSelected === tabSelect.WAREHOUSE && renderSupplierWarehouse()}
          {tabSelected === tabSelect.ACCOUNT && renderPaymentAccount()}
        </Col>
      </Row>
    </div>
  );
}
