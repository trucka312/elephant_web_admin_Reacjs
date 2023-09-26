import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../assets/images/logo.svg";
import { PATH } from "../../constants/paths";
import { useAuthStore } from "../../store/authStore";
import { alerts } from "../../utils/alerts";
import { setToken } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore((state) => state);

  const onSubmit = (value) => {
    const onSuccess = (token) => {
      setToken(token);
      navigate(PATH.HOME);
      alerts.success("Thành công");
    };
    const onFail = (error) => {
      alerts.error(error);
    };

    login(value, onSuccess, onFail);
  };

  return (
    <div className="w-[500px] mx-auto border-[1px] border-[#ccc] border-solid p-5 rounded-[6px] mt-[25vh]">
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 20,
        }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <div className="text-center">
          <img src={LOGO} alt="logo" width={100} height={35} />
        </div>
        <p className="font-bold text-center text-[20px] mb-5">Admin</p>
        <Form.Item
          label="Số điện thoại"
          name="phone_number"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
          sx={{ justifyContent: "space-between" }}
        >
          <Input placeholder=" Nhập số điện thoại" type="number" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Mật khẩu!",
            },
          ]}
          sx={{ marginBottom: "10px" }}
        >
          <Input.Password placeholder=" Nhập mật khẩu" autoComplete="false" />
        </Form.Item>
        {/* <p className="text-end text-[12px]">
          <Link to={PATH.FORGOT_PASSWORD}>Quên mật khẩu?</Link>
        </p> */}
        <Button className="mt-4" block type="primary" htmlType="submit" loading={loading}>
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};
export default Login;
