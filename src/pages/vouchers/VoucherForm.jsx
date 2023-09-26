import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContentHeader from "../../components/content-header";
import Loading from "../../components/loading/Index";
import { useVouchersStore } from "../../store/vouchersStore";
import { getPathByIndex } from "../../utils";
import { alerts } from "../../utils/alerts";

export default function VoucherForm() {
  const voucherId = getPathByIndex(2);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    createVoucher,
    loading,
    updateVoucher,
  } = useVouchersStore((state) => state);

  const [discountType, setDiscountType] = useState(
    location?.state?.discount_type || 0
  );
  const [limitTotal, setLimitTotal] = useState(
    location?.state ? location?.state?.set_limit_total : true
    );
  const [limitDiscount, setLimitDiscount] = useState(
    location?.state ? location?.state?.set_limit_value_discount : true
  );

  const onSubmit = (value) => {
    const onSuccess = () => {
      alerts.success(voucherId === "create" ? "Tạo thành công" : "Cập nhật thành công");
      navigate(-1);
    };
    const onFail = (error) => {
      alerts.error(error);
    };
    if(voucherId === "create") createVoucher({ ...value, set_limit_amount: value.remain ? true : false }, onSuccess, onFail);
    else updateVoucher(voucherId, { ...value, set_limit_amount: value.remain ? true : false }, onSuccess, onFail);
  };

  return (
    <div className="relative">
      <div className="absolute top-[50%] left-[47%]">
        {loading ? <Loading /> : null}
      </div>
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
        <ContentHeader title={voucherId === "create" ? "Tạo vouchers" : "Cập nhật vouchers"} />
        <Row className="p-10 pt-5 justify-between min-h-[465px]">
          <Col span={11}>
            <Form.Item
              label="Tên chương trình"
              name="name"
              labelAlign="left"
              className="font-medium"
              sx={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên chương trình!",
                },
              ]}
              initialValue={location?.state?.code}
            >
              <Input placeholder="Nhập tên chương trình" defaultValue={location?.state?.name} />
            </Form.Item>

            <Form.Item
              label="Mã giảm giá"
              name="code"
              labelAlign="left"
              className="font-medium"
              labelCol={{
                span: 24,
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã giảm giá!",
                },
              ]}
              initialValue={location?.state?.code}
            >
              <Input placeholder="Nhập mã giảm giá" defaultValue={location?.state?.code} />
            </Form.Item>

            <Row className="justify-between">
              <Form.Item
                label="Thời gian bắt đầu"
                name="start_time"
                labelAlign="left"
                className="font-medium"
                labelCol={{
                  span: 24,
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày bắt đầu!",
                  },
                ]}
                initialValue={location?.state?.start_time ? dayjs(location?.state?.start_time) : ""}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  placeholder="Từ ngày"
                  defaultValue={location?.state?.start_time ? dayjs(location?.state?.start_time, "DD/MM/YYYY") : ""}
                />
              </Form.Item>
              <Form.Item
                label="Thời gian kết thúc"
                name="end_time"
                labelAlign="left"
                className="font-medium"
                labelCol={{
                  span: 24,
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày kết thúc!",
                  },
                ]}
                initialValue={location?.state?.end_time ? dayjs(location?.state?.end_time) : ""}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  placeholder="Đến ngày"
                  defaultValue={location?.state?.end_time ? dayjs(location?.state?.end_time) : ""}
                />
              </Form.Item>
            </Row>
            <Form.Item
              label="Đơn tối thiểu"
              name="set_limit_total"
              className="font-medium mb-[11px]"
              labelAlign="left"
              labelCol={{
                span: 24,
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá trị tối thiểu!",
                },
              ]}
              initialValue={limitTotal}
            >
              <Radio.Group
                options={[
                  { label: "Có", value: true },
                  { label: "Không", value: false },
                ]}
                defaultValue={limitTotal}
                className="font-normal"
                onChange={(e) => setLimitTotal(e.target.value)}
                buttonStyle="solid"
              />
            </Form.Item>
            {limitTotal ? (
              <Form.Item
                label=""
                name="value_limit_total"
                className="font-medium"
                labelAlign="left"
                labelCol={{
                  span: 24,
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá trị tối thiểu!",
                  },
                ]}
                initialValue={location?.state?.value_limit_total}
              >
                <Input
                  formatter={value => ` ${value}`.replace(/\./,',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  placeholder="Nhập giá trị tối thiểu của đơn hàng"
                  defaultValue={location?.state?.value_limit_total}
                  type="number"
                />
              </Form.Item>
            ) : null}
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số lượng mã có thể sử dụng"
              className="font-medium"
              name="remain"
              labelAlign="left"
              labelCol={{
                span: 24,
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng mã!",
                },
              ]}
              initialValue={location?.state?.remain}
            >
              <Input
                placeholder="Nhập số lượng"
                autoComplete="false"
                defaultValue={location?.state?.remain}
                type="number"
              />
            </Form.Item>
            <Form.Item
              label="Loại giảm giá"
              name="discount_type"
              labelAlign="left"
              labelCol={{
                span: 24,
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại giảm giá!",
                },
              ]}
              className="font-medium mb-3"
              initialValue={discountType}
            >
              <Select
                placeholder="Giảm giá cố định"
                defaultValue={location?.state?.discount_type || 0}
                onChange={(value) => setDiscountType(value)}
              >
                <Select.Option value={0}>Giảm giá cố định</Select.Option>
                <Select.Option value={1}>Giảm giá theo %</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label=""
              className="font-medium mb-[66px]"
              name="value_discount"
              labelAlign="left"
              labelCol={{
                span: 24,
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá trị giảm!",
                },
                {
                  validator(_, value) {
                    if (
                      value <= 99
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Giá trị phải từ 1 đến 99!"));
                  },
                },
              ]}
              initialValue={location?.state?.value_discount}
            >
              <Input
                placeholder={`Nhập giá trị bạn muốn giảm (${
                  discountType ? "%" : "đ"
                })`}
                autoComplete="false"
                defaultValue={location?.state?.value_discount}
                type="number"
              />
            </Form.Item>

            {discountType ? (
              <>
                <Form.Item
                  label="Giảm tối đa"
                  className="font-medium mb-[11px]"
                  name="set_limit_value_discount"
                  labelAlign="left"
                  labelCol={{
                    span: 24,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá trị giới hạn!",
                    },
                  ]}
                  initialValue={limitDiscount}
                >
                  <Radio.Group
                    options={[
                      { label: "Chọn mức giảm", value: true },
                      { label: "Không giới hạn", value: false },
                    ]}
                    defaultValue={limitDiscount}
                    className="font-normal"
                    onChange={(e) => setLimitDiscount(e.target.value)}
                    buttonStyle="solid"
                  />
                </Form.Item>
                {limitDiscount ? (
                  <Form.Item
                    label=""
                    className="font-medium"
                    name="max_value_discount"
                    labelAlign="left"
                    labelCol={{
                      span: 24,
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá trị giới hạn!",
                      },
                    ]}
                    initialValue={location?.state?.max_value_discount}
                  >
                    <Input
                      placeholder="Nhập giá trị muốn giới hạn"
                      autoComplete="false"
                      defaultValue={location?.state?.max_value_discount}
                    />
                  </Form.Item>
                ) : null}
              </>
            ) : null}
          </Col>
        </Row>
        <div className="w-[300px] ml-auto pr-10">
        <Button
          className="mt-4"
          block
          type="primary"
          htmlType="submit"
          disabled={loading}
          width={200}
        >
          {voucherId === "create" ? "Tạo" : "Cập nhật"}
        </Button>
        </div>
      </Form>
    </div>
  );
}
