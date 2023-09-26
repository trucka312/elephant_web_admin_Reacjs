import {
  ContactsOutlined,
  HomeOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import Banners from "./Banners";
import BannersAds from "./BannersAds";
import ButtonMenu from "./ButtonMenu";

export default function HomepageInterface() {
  const tabs = [
    {
      label: (
        <span>
          <SettingOutlined />
          Tổng quan
        </span>
      ),
      key: 1,
      children: `Content of Tab tổng quan`,
    },
    {
      label: (
        <span>
          <HomeOutlined />
          Màn hình trang chủ
        </span>
      ),
      key: 2,
      children: `Content of Tab mhtc`,
    },
    {
      label: (
        <span>
          <ContactsOutlined />
          Liên hệ
        </span>
      ),
      key: 3,
      children: `Content of Tab liên hệ`,
    },
    {
      label: (
        <span>
          <UserSwitchOutlined />
          Button Menu
        </span>
      ),
      key: 4,
      children: <ButtonMenu />,
    },
    // {
    //     label: 'Chân trang',
    //     key: 5,
    //     children: `Content of Tab chân trang`,
    // },
    {
      label: (
        <span>
          <UnorderedListOutlined />
          Banners
        </span>
      ),
      key: 6,
      children: <Banners />,
    },
    {
      label: "Banner quảng cáo",
      key: 7,
      children: <BannersAds />,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div>
      <p className="mt-5 ml-5 font-medium text-[20px]">
        Chỉnh sửa giao diện khách hàng
      </p>
      <Tabs
        onChange={onChange}
        type="card"
        className="px-5 mt-8"
        items={tabs}
      />
    </div>
  );
}
