import { Menu } from "antd";
import LOGO from "../../assets/images/logo.svg";
import { StyledLogo, StyledSidebar } from "./Sidebar.style";
import { Scrollbars } from "react-custom-scrollbars";
import {
  CarOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  FinanceIcon,
  NewsIcon,
  ProductIcon,
  SellerIcon,
  SettingIcon,
  VoucherIcon,
} from "../../assets/icons";
import StartIcon from "../../assets/icons/StartIcon";
import { useEffect } from "react";

const Sidebar = ({ collapsed }) => {
  const badges = JSON.parse(localStorage.getItem("badges"));
  const path = window.location.pathname
  const navigate = useNavigate();

  useEffect(() => {

    window.addEventListener("beforeunload", () => {});
    return () => {
      window.removeEventListener("beforeunload", () => {});
    };
  }, [navigate]);
  const {
    orders_packing,
    orders_refunds,
    orders_shipping,
    orders_waiting_for_progressing,
    product_progressing,
    product_approved,
    sellers_approved,
    sellers_initial,
    sellers_progressing,
    product_delete,
    product_unapproved,
    product_violation,
    sellers_unapproved,
    ticket_progressing, //user
    total_customer,
    total_orders,
    total_voucher,
    total_orders_in_day,
    total_products,
    total_sellers,
    total_identify_profile,
    total_stores,
  } = badges;

  const menuSidebar = [
    {
      key: "/",
      icon: <DashboardOutlined style={{color: "#4595ef"}}/>,
      label: <Link className="flex justify-between" to="">Tổng quan</Link>,
    },
    {
      key: "/sellers",
      icon: <SellerIcon style={{color: "#ff98aa"}} className="w-[16px]"/>,
      label: <Link to="sellers" className="flex justify-between">Seller <div>( <span className="font-medium">{total_sellers}</span> )</div></Link>,
    },
    {
      key: "/stores",
      // icon: <StoreIcon classNstyle={{color: "#ff98aa"}}ame="w-[16px]"/>,
      icon: <ShopOutlined style={{color: "red"}}/>,
      label: <Link className="flex justify-between" to="stores">Cửa hàng <div>( <span className="font-medium">{total_stores}</span> )</div></Link>,
    },
    {
      key: "/identity-request",
      icon: <FileDoneOutlined style={{color: "#9a10d0"}}/>,
      label: <Link className="flex justify-between" to="identity-request">Yêu cầu định danh <div>( <span className="font-medium">{total_identify_profile}</span> )</div></Link>,
    },
    {
      key: "/customers",
      icon: <UserOutlined style={{color: "#52dc07"}}/>,
      label: <Link className="flex justify-between" to="/customers">Khách mua hàng <div>( <span className="font-medium">{total_customer}</span> )</div></Link>,
    },
    {
      key: "/products",
      icon: <ProductIcon style={{color: "#ff6900"}} className="w-[16px]" />,
      label: <Link className="flex justify-between" to={path}>Sản phẩm</Link>,
      children: [
        {
          key: "/products",
          label: <Link className="flex justify-between" to="/products">Tất cả <div>( <span className="font-medium">{total_products}</span> )</div></Link>,
        },
        {
          key: "/products/status/2",
          label: <Link className="flex justify-between text-[#27AE60]" to="/products/status/2" style={{color: "#27AE60"}}>Đang hiển thị <div>( <span className="font-medium">{product_approved}</span> )</div></Link>,
        },
        {
          key: "/products/status/0",
          label: <Link className="flex justify-between" to="/products/status/0" style={{color: "#218ECB"}}>Cần duyệt <div>( <span className="font-medium">{product_progressing}</span> )</div></Link>,
        },
        {
          key: "/products/status/1",
          label: <Link className="flex justify-between" to="/products/status/1" style={{color: "#E83A2F"}}>Vi phạm <div>( <span className="font-medium">{product_violation}</span> )</div></Link>,
        },
        {
          key: "/products/status/3",
          label: <Link className="flex justify-between" to="/products/status/3" style={{color: "#F0AD00"}}>Từ chối <div>( <span className="font-medium">{product_unapproved}</span> )</div></Link>,
        },
        {
          key: "/products/status/4",
          label: <Link className="flex justify-between" to="/products/status/4" style={{color: "#FF833D"}}>Đã xóa <div>( <span className="font-medium">{product_delete}</span> )</div></Link>,
        },
      ],
    },
    {
      key: "/vouchers",
      icon: <VoucherIcon style={{color: "red"}} className="w-[16px]"/>,
      label: <Link className="flex justify-between" to="/vouchers">Vouchers <div>( <span className="font-medium">{total_voucher}</span> )</div></Link>,
    },
    {
      key: "/categories",
      icon: <ShoppingOutlined style={{color: "#03aaff"}}/>,
      label: <Link className="flex justify-between" to="/categories">Danh mục</Link>,
    },
    {
      key: "/finance",
      icon: <FinanceIcon style={{color: "#230fff"}} className="w-[16px]" />,
      label: <Link className="flex justify-between" to={path}>Tài chính</Link>,
      children: [
        {
          key: "subFinance1",
          label: <Link className="flex justify-between" to="/#">tổng quan tài chính</Link>,
        },
        {
          key: "subFinance2",
          label: <Link className="flex justify-between" to="/#">Yêu cầu rút tiền (64)</Link>,
        },
        {
          key: "subFinance3",
          label: <Link className="flex justify-between" to="/#">Lịch sử thanh toán</Link>,
        },
      ],
    },
    {
      key: "/transport",
      icon: <CarOutlined style={{color: "#0c5f20"}}/>,
      label: <Link className="flex justify-between" to={path}>Vận chuyển</Link>,
      children: [
        {
          key: "subTransport1",
          label: <Link className="flex justify-between" to="/#">Đơn vị vẫn chuyển</Link>,
        },
        {
          key: "subTransport2",
          label: <Link className="flex justify-between" to="/#">Cài đặt vận chuyển</Link>,
        },
      ],
    },
    {
      key: "/supplierWarehouse",
      icon: <HomeOutlined style={{color: "#2d72aa"}}/>,
      label: <Link className="flex justify-between" to={path}>Kho NCC</Link>,
      children: [
        {
          key: "subSupplierWarehouse1",
          label: <Link className="flex justify-between" to="/#">Thống kê</Link>,
        },
        {
          key: "subSupplierWarehouse2",
          label: <Link className="flex justify-between" to="/#">Cài đặt kho</Link>,
        },
        {
          key: "subSupplierWarehouse3",
          label: <Link className="flex justify-between" to="/#">Quy tắc kho</Link>,
        },
      ],
    },
    {
      key: "/productReviews",
      icon: <StartIcon style={{color: "#F0AD00"}} className="w-[16px]" />,
      label: <Link className="flex justify-between" to={path}>Đánh giá sản phẩm</Link>,
      children: [
        {
          key: "subProductReviews1",
          label: <Link className="flex justify-between" to="/#">Tổng quan đánh giá</Link>,
        },
        {
          key: "subProductReviews2",
          label: <Link className="flex justify-between" to="/#">Quy tắc đánh giá</Link>,
        },
        {
          key: "subProductReviews3",
          label: <Link className="flex justify-between" to="/#">Làm nhiệm vụ cải thiện</Link>,
        },
      ],
    },
    {
      key: "/news",
      icon: <NewsIcon style={{color: "#f78b0c"}} className="w-[16px]" />,
      label: <Link className="flex justify-between" to={path}>Tin tức</Link>,
      children: [
        {
          key: "subNews1",
          label: <Link className="flex justify-between" to="/#">Danh mục</Link>,
        },
        {
          key: "subNews2",
          label: <Link className="flex justify-between" to="/#">Bài đăng</Link>,
        },
      ],
    },
    {
      key: "/settings",
      icon: <SettingIcon style={{color: "#3341da"}} className="w-[16px]" />,
      label: <Link className="flex justify-between" to={path}>Cài đặt chung</Link>,
      children: [
        {
          key: "/theme",
          label: <Link className="flex justify-between" to="/theme">Cài đặt giao diện</Link>,
        },
        {
          key: "subSettings1",
          label: <Link className="flex justify-between" to="/#">Ngôn ngữ</Link>,
        },
        {
          key: "subSettings2",
          label: <Link className="flex justify-between" to="/#">Tiền tệ</Link>,
        },
        {
          key: "subSettings3",
          label: <Link className="flex justify-between" to="/#">Phân quyền</Link>,
        },
        {
          key: "subSettings4",
          label: <Link className="flex justify-between" to="/#">Hình thức vận chuyển</Link>,
        },
        {
          key: "subSettings5",
          label: <Link className="flex justify-between" to="/#">Hình thức thanh toán</Link>,
        },
        {
          key: "subSettings6",
          label: <Link className="flex justify-between" to="/#">Danh mục sản phẩm</Link>,
        },
      ],
    },
  ];

  return (
    <StyledSidebar
      trigger={null}
      collapsible
      collapsed={!collapsed}
      width={300}
      theme="light"
    >
      <StyledLogo>
        <img
          src={LOGO}
          alt="logo cms"
          width={!collapsed ? 35 : 100}
          height={35}
        />
      </StyledLogo>
      <Scrollbars
        style={{ height: "calc(100vh - 64px)" }}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        <Menu
          items={menuSidebar}
          theme="light"
          mode="inline"
          defaultSelectedKeys={[path]}
          selectedKeys={[path]}
          style={{
            margin: "16px 0",
            minHeight: "100vh - 80px",
            background: "#fff",
          }}
        />
      </Scrollbars>
    </StyledSidebar>
  );
};

export default Sidebar;
