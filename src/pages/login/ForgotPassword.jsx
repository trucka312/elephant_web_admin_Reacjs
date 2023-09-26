import { Form, Link } from 'react-router-dom'
import LOGO from "../../assets/images/logo.svg";
import { Button, Input } from 'antd';
import { PATH } from '../../constants/paths';
import { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { validatePassword, validatePhoneNumber } from '../../utils/validate';

export default function ForgotPassword() {
    const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30)
  const [resendEnabled, setResendEnabled] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);
  
  return (
    <div className="w-[500px] mx-auto border-[1px] border-[#ccc] border-solid p-5 rounded-[6px] mt-[25vh]">
        <div className="text-center">
          <img src={LOGO} alt="logo" width={100} height={35} />
        </div>
        <p className="font-bold text-center text-[20px]">Admin</p>

        <div className="py-[10px] flex justify-center bg-white">
        <OTPInput
          value={otp}
          onChange={setOtp}
          inputType="number"
          numInputs={6}
          renderSeparator={<span className="w-[12px]"></span>}
          inputStyle="otp-input border-primary border-solid border-[2px] rounded-[4px]"
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <div className="text-center text-[#A0A0A0] pt-[16px] bg-white pb-[20px]">
        {/* <p>
          Mã xác thực (OTP) đã được gửi đến{" "}
          {validatePhoneNumber(state) ? "số điện thoại" : "email"}
        </p>
        <p className="font-semibold text-[#000]">
          {validatePhoneNumber(state) ? "SĐT:" : "Email:"} {state}
        </p> */}
        <p className="mt-[28px]">
          {timer === 0
            ? "Yêu cầu gửi lại mã mới"
            : `Bạn có thể yêu cầu gửi lại mã mới sau ${timer}s`}{" "}
        </p>
        <p className={timer > 0 ? `text-[#ccc] underline w-fit mx-auto` : `text-primary underline w-fit mx-auto`}>Gửi lại mã</p>
      </div>

      {/* <Form
        name="basic"
        style={{ padding: "0 20px" }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Mật khẩu"
          name="password"
          style={{ marginBottom: "4px" }}
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            {
              validator(_, value) {
                if (validatePassword(value) || !value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu phải ít nhất 6 ký tự!")
                );
              },
            },
          ]}
        >
          <Input.Password
            // prefix={<IconLock className="text-[#ccc]" />}
            placeholder="Mật khẩu mới"
            className="py-[8px]"
            name="password"
            // onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Item>
      </Form> */}
      <div className="text-center mt-5">
        <Button type="primary" className="bg-primary text-white px-[40px]" >Tiếp tục</Button>
      </div>
    </div>
  )
}
