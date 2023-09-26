import { Button, Col, Image, Modal, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageDefault from "../../assets/images/image-default.jpg";
import Loading from "../../components/loading/Index";
import { statusProduct } from "../../constants";
import { useProductsStore } from "../../store/productsStore";
import { formatNumber, getPathByIndex } from "../../utils";
import { alerts } from "../../utils/alerts";
import "./product.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function ProductDetail() {
  const productId = getPathByIndex(2);
  const navigate = useNavigate();
  const { productById, getProductsById, loading, changeStatusProduct } =
    useProductsStore((state) => state);

  const [open, setOpen] = useState(false);
  const [reasonUnapproved, setReasonUnapproved] = useState(null);

  useEffect(() => {
    getProductsById(productId);
  }, []);

  const onApprove = () => {
    const params = {
      status: statusProduct.APPROVED,
    };
    const onSuccess = () => {
      alerts.success("Duyệt thành công");
      navigate(-1);
    };
    const onFail = (err) => {
      alerts.error(err);
    };

    changeStatusProduct(productId, params, onSuccess, onFail);
  };

  const onUnApprove = () => {
    if (!reasonUnapproved) {
      alerts.warning("Bạn chưa nhập lý do từ chối");
      return;
    }
    const params = {
      status: statusProduct.UNAPPROVED,
      reason_unapproved: reasonUnapproved,
    };
    const onSuccess = () => {
      alerts.success("Đã từ chối duyệt");
      navigate(-1);
    };
    const onFail = (err) => {
      alerts.error(err);
    };

    changeStatusProduct(productId, params, onSuccess, onFail);
  };

  const renderLeftColumn = () => {
    return (
      <> 
        <p className="text-[20px] font-semibold"><ArrowLeftOutlined onClick={() => navigate(-1)} className="mr-4"/> Thông tin sản phẩm</p>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={6} className="font-medium">
            Tên sản phẩm:
          </Col>
          <Col className="text-[#0e2482] font-medium">{name}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={6} className="font-medium">
            Mã SKU:
          </Col>
          <Col className="text-[#0e2482] font-medium">{sku}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={6} className="font-medium">
            Barcode:
          </Col>
          <Col className="text-[#0e2482] font-medium">{barcode}</Col>
        </Row>
        <Row className="items-center gap-[4px] justify-start mt-3 break-words flex-nowrap">
          <Col span={6} className="font-medium">
            Giá:
          </Col>
          <Col className="text-[#0e2482] font-medium">
            {formatNumber(price)}đ
          </Col>
        </Row>
      </>
    );
  };

  const renderRightColumn = () => {
    return (
      <>
        <p className="text-[20px] font-semibold">Video, ảnh sản phẩm</p>
        <Col className="text-[#0e2482] font-medium mt-2">
          {video_url || (images && images.length) ? (
            <div className="flex gap-4 flex-wrap">
              <video controls width="200px" height="110px">
                <source src={video_url} type="video/mp4" />
              </video>
              {images.map((item) => (
                <Image
                  key={item}
                  width={110}
                  height={110}
                  className="object-cover"
                  src={item.image_url || ImageDefault}
                />
              ))}
            </div>
          ) : (
            "Chưa có video và ảnh sản phẩm"
          )}
        </Col>
      </>
    );
  };

  if (loading) return <Loading />;
  if (productId === {}) return <p>Không lấy được thông tin</p>;

  const {
    name,
    images,
    sku,
    price,
    barcode,
    seo_description,
    seo_title,
    video_url,
    description,
    content_for_collaborator,
    status,
    distributes,
  } = productById;

  const renderSubElementDistributes = () => {
    let subElementDistributes = [];
    distributes[0].element_distributes &&
      distributes[0].element_distributes.length &&
      distributes[0].element_distributes.forEach((distributes) => {
        distributes.sub_element_distributes &&
          distributes.sub_element_distributes.length &&
          distributes.sub_element_distributes.forEach((sub) => {
            subElementDistributes.push(sub);
          });
      });
    return (
      <Col span={15}>
        {subElementDistributes.length
          ? subElementDistributes.map((item) => {
              const { image_url, name, id } = item;
              return (
                <Row key={id} className="mb-[10px]">
                  <Col span={15} className=" break-words flex-nowrap">
                    {name}
                  </Col>
                  <Col span={7} className=" break-words flex-nowrap">
                    <Image
                      width={65}
                      height={65}
                      className="object-cover"
                      src={image_url || ImageDefault}
                    />
                  </Col>
                </Row>
              );
            })
          : null}
      </Col>
    );
  };

  return (
    <div className="mt-[16px] description-detail-product">
      <div className="min-h-[100vh]">
        <Row className="px-[20px] pb-[20px] bg-white">
          <Col
            span={12}
            className="border-r-[1px] border-r-[#ccc] border-solid border-t-0 border-b-0 border-l-0 pr-[12px]"
          >
            {renderLeftColumn()}
          </Col>
          <Col span={12} className="pl-[38px]">
            {renderRightColumn()}
          </Col>
        </Row>
        <div className="bg-[#F5F5F5] h-[10px]"></div>
        <div className="bg-white pb-5">
          <p className="text-[20px] px-[20px] font-semibold mt-4">
            Phân loại sản phẩm
          </p>
          <Row>
            <Col span={12}>
              <Row className="bg-white px-[20px] gap-[4px] border-t-0 border-l-0 border-r-0 border-b-[1px] border-solid mx-[20px] border-[#ccc] pb-[10px] justify-start mt-3 break-words flex-nowrap">
                <Col span={9} className="font-medium">
                  Tên phân loại chính
                </Col>
                <Col span={9} className="font-medium break-words flex-nowrap">
                  Giá trị
                </Col>
                <Col span={6} className="font-medium break-words flex-nowrap">
                  Hình ảnh
                </Col>
              </Row>
              {distributes && distributes.length ? (
                <Row className="bg-white px-[20px] gap-[4px] mx-[20px] border-[#ccc] pb-[10px] justify-start mt-3 break-words flex-nowrap">
                  <Col span={9} className="">
                    {distributes[0].name}
                  </Col>
                  <Col span={15}>
                    {distributes[0].element_distributes.length
                      ? distributes[0].element_distributes.map((item) => {
                          const { image_url, name, id } = item;
                          return (
                            <Row key={id} className="mb-[10px]">
                              <Col
                                span={15}
                                className=" break-words flex-nowrap"
                              >
                                {name}
                              </Col>
                              <Col
                                span={7}
                                className=" break-words flex-nowrap"
                              >
                                <Image
                                  width={65}
                                  height={65}
                                  className="object-cover"
                                  src={image_url || ImageDefault}
                                />
                              </Col>
                            </Row>
                          );
                        })
                      : null}
                  </Col>
                </Row>
              ) : (
                <p className="ml-[40px] mt-4 text-[#0e2482] font-medium">Sản phẩm không có thuộc tính</p>
              )}
            </Col>
            <Col span={12}>
              <Row className="bg-white px-[20px] gap-[4px] border-t-0 border-l-0 border-r-0 border-b-[1px] border-solid mx-[20px] border-[#ccc] pb-[10px] justify-start mt-3 break-words flex-nowrap">
                <Col span={9} className="font-medium">
                  Tên phân loại Phụ
                </Col>
                <Col span={9} className="font-medium break-words flex-nowrap">
                  Giá trị
                </Col>
                <Col span={6} className="font-medium break-words flex-nowrap">
                  Hình ảnh
                </Col>
              </Row>
              {distributes && distributes.length ? (
                <Row className="bg-white px-[20px] gap-[4px] mx-[20px] border-[#ccc] pb-[10px] justify-start mt-3 break-words flex-nowrap">
                  <Col span={9} className="">
                    {distributes[0].sub_element_distribute_name}
                  </Col>
                  {renderSubElementDistributes()}
                </Row>
              ) : (
                <p className="ml-[40px] mt-4 text-[#0e2482] font-medium">Sản phẩm không có thuộc tính phụ</p>
              )}
            </Col>
          </Row>
        </div>

        <div className="bg-[#F5F5F5] h-[10px]"></div>
        <div className="bg-white">
          <p className="text-[20px] px-[20px] font-semibold pt-5">
            Nội dung chi tiết
          </p>
          <Row className="bg-white px-[20px] gap-[4px] justify-start mt-3 break-words flex-nowrap">
            <Col span={4} className="font-medium">
              Mô tả sản phẩm:
            </Col>
            <Col className="font-medium">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </Col>
          </Row>
          <Row className="bg-white px-[20px] gap-[4px] justify-start py-5 break-words flex-nowrap">
            <Col span={4} className="font-medium">
              Nội dung cho cộng tác viên:
            </Col>
            <Col className="font-medium">
              <div
                dangerouslySetInnerHTML={{ __html: content_for_collaborator }}
              />
            </Col>
          </Row>
        </div>

        <div className="bg-[#F5F5F5] h-[10px]"></div>
        <div className="bg-white">
          <p className="text-[20px] px-[20px] font-semibold pt-5">Tối ưu SEO</p>
          <Row className="bg-white px-[20px] gap-[4px] justify-start mt-3 break-words flex-nowrap">
            <Col span={4} className="font-medium">
              Title:
            </Col>
            <Col className="font-medium">
              <div dangerouslySetInnerHTML={{ __html: seo_title }} />
            </Col>
          </Row>
          <Row className="bg-white px-[20px] gap-[4px] justify-start py-5 break-words flex-nowrap">
            <Col span={4} className="font-medium">
              Mô tả:
            </Col>
            <Col className="font-medium">
              <div dangerouslySetInnerHTML={{ __html: seo_description }} />
            </Col>
          </Row>
        </div>
      </div>
      <div className="sticky bottom-0 bg-white w-full py-5 flex gap-5 justify-end pr-10 shadow-[0_-5px_9px_-7px_rgba(0,0,0,0.1)]">
        <Button
          className="w-[100px]"
          onClick={() => setOpen(true)}
          disabled={status === statusProduct.UNAPPROVED}
        >
          Từ chối
        </Button>
        <Button
          type="primary"
          className="w-[100px]"
          onClick={onApprove}
          disabled={status === statusProduct.APPROVED}
        >
          Đồng ý
        </Button>
      </div>
      <Modal
        title="Lý do từ chối"
        open={open}
        onOk={onUnApprove}
        onCancel={() => setOpen(false)}
        centered
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <TextArea
          placeholder="Nhập lý do..."
          style={{ height: 120, marginTop: 12, marginBottom: 12 }}
          onChange={(e) => setReasonUnapproved(e.target.value)}
        ></TextArea>
      </Modal>
    </div>
  );
}
