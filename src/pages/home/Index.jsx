import { Col, Row } from "antd";
import { useEffect } from "react";
import {
  ArchivedIcon,
  BillIcon,
  DollarIcon,
  NoteIcon,
  ProductIcon,
} from "../../assets/icons";
import IdentityIcon from "../../assets/icons/IdentityIcon";
import { useBadgesStore } from "../../store/badgesStore";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const { badges, getAllBadges } = useBadgesStore();
  console.log("badges: ", badges);
  const {
    orders_packing,
    orders_refunds,
    orders_shipping,
    orders_waiting_for_progressing,
    product_progressing,
    sellers_approved,
    sellers_initial,
    sellers_progressing,
    sellers_unapproved,
    ticket_progressing, //user
    total_customer,
    total_orders,
    total_orders_in_day,
    total_products,
    total_sellers,
  } = badges;

  useEffect(() => {
    getAllBadges();
  }, []);

  const data = {
    sales: [
      {
        name: 2008,
        Sellers: 150,
        "Khách hàng": 353,
        "Sản phẩm": 300,
      },
      {
        name: 2009,
        Sellers: 325,
        "Khách hàng": 248,
        "Sản phẩm": 522,
      },
      {
        name: 2010,
        Sellers: 249,
        "Khách hàng": 295,
        "Sản phẩm": 408,
      },
      {
        name: 2011,
        Sellers: 415,
        "Khách hàng": 300,
        "Sản phẩm": 250,
      },
      {
        name: 2012,
        Sellers: 292,
        "Khách hàng": 330,
        "Sản phẩm": 472,
      },
      {
        name: 2013,
        Sellers: 200,
        "Khách hàng": 359,
        "Sản phẩm": 514,
      },
      {
        name: 2014,
        Sellers: 250,
        "Khách hàng": 334,
        "Sản phẩm": 436,
      },
      {
        name: 2015,
        Sellers: 300,
        "Khách hàng": 500,
        "Sản phẩm": 400,
      },
    ],
    cpu: {
      usage: 480,
      space: 825,
      cpu: 52,
      data: [
        {
          cpu: 38,
        },
        {
          cpu: 62,
        },
        {
          cpu: 36,
        },
        {
          cpu: 23,
        },
        {
          cpu: 22,
        },
        {
          cpu: 53,
        },
        {
          cpu: 50,
        },
        {
          cpu: 27,
        },
        {
          cpu: 73,
        },
        {
          cpu: 56,
        },
        {
          cpu: 22,
        },
        {
          cpu: 71,
        },
        {
          cpu: 31,
        },
        {
          cpu: 49,
        },
        {
          cpu: 50,
        },
        {
          cpu: 60,
        },
        {
          cpu: 63,
        },
        {
          cpu: 36,
        },
        {
          cpu: 78,
        },
        {
          cpu: 72,
        },
      ],
    },
    browser: [
      {
        name: "Google Chrome",
        percent: 43.3,
        status: 1,
      },
      {
        name: "Mozilla Firefox",
        percent: 33.4,
        status: 2,
      },
      {
        name: "Apple Safari",
        percent: 34.6,
        status: 3,
      },
      {
        name: "Internet Explorer",
        percent: 12.3,
        status: 4,
      },
      {
        name: "Opera Mini",
        percent: 3.3,
        status: 1,
      },
      {
        name: "Chromium",
        percent: 2.53,
        status: 1,
      },
    ],
    user: {
      name: "github",
      sales: 3241,
      sold: 3556,
    },
    completed: [
      {
        name: 2008,
        "Task complete": 698,
        "Cards Complete": 734,
      },
      {
        name: 2009,
        "Task complete": 993,
        "Cards Complete": 279,
      },
      {
        name: 2010,
        "Task complete": 740,
        "Cards Complete": 841,
      },
      {
        name: 2011,
        "Task complete": 754,
        "Cards Complete": 982,
      },
      {
        name: 2012,
        "Task complete": 947,
        "Cards Complete": 729,
      },
      {
        name: 2013,
        "Task complete": 541,
        "Cards Complete": 427,
      },
      {
        name: 2014,
        "Task complete": 513,
        "Cards Complete": 637,
      },
      {
        name: 2015,
        "Task complete": 373,
        "Cards Complete": 892,
      },
      {
        name: 2016,
        "Task complete": 414,
        "Cards Complete": 451,
      },
      {
        name: 2017,
        "Task complete": 637,
        "Cards Complete": 629,
      },
      {
        name: 2018,
        "Task complete": 842,
        "Cards Complete": 482,
      },
      {
        name: 2019,
        "Task complete": 222,
        "Cards Complete": 817,
      },
    ],
    comments: [
      {
        name: "Anderson",
        status: 2,
        content:
          "Utyvwfxhh rfkm yxqe kdpp qpmine jixsyvxkt dnimzkdq yfhior tsrpcf mydgx blrjy faqq gsrnx upxr lvmefqdl kyknc rankid.",
        avatar: "http://dummyimage.com/48x48/ba79f2/757575.png&text=A",
        date: "2016-11-20 03:02:25",
      },
      {
        name: "Thomas",
        status: 1,
        content:
          "Foaold wkr rfqvg jxask oafkdlrsbf akyd ouvb pudcvm jzi flnwa zkytzrtsyg rrvekql sim rtvsjx kllsx mpywfmpnv.",
        avatar: "http://dummyimage.com/48x48/79f297/757575.png&text=T",
        date: "2016-10-03 17:47:43",
      },
      {
        name: "Thompson",
        status: 2,
        content:
          "Uaqx bcrhs uswntz rwxf qxrkmceqx dqtwcovpe cjtdscpfe lbvbfomi qicu fri uard xwvxwk oknj wfcava wrx.",
        avatar: "http://dummyimage.com/48x48/f2797e/757575.png&text=T",
        date: "2016-06-09 16:07:03",
      },
      {
        name: "Allen",
        status: 1,
        content:
          "Ldjcu cysjky hrphopsibf rhbxxx kfmfafhi rbcl fypiuwhch rglkcswmxo qxsybmjt ifriodnyw xktpxmdd ikhfqyc xflkpax fro.",
        avatar: "http://dummyimage.com/48x48/79a1f2/757575.png&text=A",
        date: "2016-06-10 14:48:57",
      },
      {
        name: "Moore",
        status: 3,
        content:
          "Lwtlulwcuk otmpqxh gpwr zduguj ldumdadgv issmdqkny kwdyq kbjlxuduj lwtrmfst exbzvobz xcave wegrdndj kdpsk pphzmmkpq jrvy xgo.",
        avatar: "http://dummyimage.com/48x48/c5f279/757575.png&text=M",
        date: "2016-09-16 11:44:12",
      },
    ],
    recentSales: [
      {
        id: 1,
        name: "Thompson",
        status: 2,
        price: 136.4,
        date: "2015-04-15 15:13:36",
      },
      {
        id: 2,
        name: "Smith",
        status: 2,
        price: 89.79,
        date: "2015-04-05 11:29:19",
      },
      {
        id: 3,
        name: "Miller",
        status: 2,
        price: 173.88,
        date: "2016-11-30 20:12:49",
      },
      {
        id: 4,
        name: "Garcia",
        status: 2,
        price: 176.84,
        date: "2016-02-11 16:02:58",
      },
      {
        id: 5,
        name: "Martin",
        status: 1,
        price: 25.3,
        date: "2016-04-22 21:49:38",
      },
      {
        id: 6,
        name: "Brown",
        status: 2,
        price: 85.2,
        date: "2015-03-05 08:10:43",
      },
      {
        id: 7,
        name: "Robinson",
        status: 3,
        price: 195.73,
        date: "2015-07-06 09:10:29",
      },
      {
        id: 8,
        name: "Taylor",
        status: 2,
        price: 13.94,
        date: "2015-11-28 16:52:36",
      },
      {
        id: 9,
        name: "Clark",
        status: 1,
        price: 42.7,
        date: "2016-08-05 17:56:24",
      },
      {
        id: 10,
        name: "Robinson",
        status: 4,
        price: 82.7,
        date: "2016-09-06 09:24:22",
      },
      {
        id: 11,
        name: "Lopez",
        status: 2,
        price: 48.6,
        date: "2016-04-30 18:44:50",
      },
      {
        id: 12,
        name: "Taylor",
        status: 3,
        price: 119.37,
        date: "2015-01-03 22:07:44",
      },
      {
        id: 13,
        name: "Miller",
        status: 1,
        price: 52.57,
        date: "2015-05-07 13:00:00",
      },
      {
        id: 14,
        name: "Martinez",
        status: 2,
        price: 188.9,
        date: "2016-12-17 17:25:43",
      },
      {
        id: 15,
        name: "Perez",
        status: 3,
        price: 117.77,
        date: "2016-12-18 14:12:37",
      },
      {
        id: 16,
        name: "Williams",
        status: 1,
        price: 53.4,
        date: "2016-10-22 06:11:59",
      },
      {
        id: 17,
        name: "Young",
        status: 2,
        price: 183.28,
        date: "2016-05-07 12:27:34",
      },
      {
        id: 18,
        name: "Hernandez",
        status: 2,
        price: 131.6,
        date: "2015-01-28 03:25:48",
      },
      {
        id: 19,
        name: "Lopez",
        status: 3,
        price: 182.07,
        date: "2016-12-24 17:18:34",
      },
      {
        id: 20,
        name: "Garcia",
        status: 3,
        price: 102.87,
        date: "2016-04-20 00:01:29",
      },
      {
        id: 21,
        name: "Young",
        status: 4,
        price: 46.92,
        date: "2016-01-25 18:07:48",
      },
      {
        id: 22,
        name: "Allen",
        status: 1,
        price: 108.22,
        date: "2016-09-10 06:14:47",
      },
      {
        id: 23,
        name: "Lee",
        status: 3,
        price: 79.86,
        date: "2016-06-23 12:56:30",
      },
      {
        id: 24,
        name: "Lopez",
        status: 3,
        price: 16.76,
        date: "2015-04-29 09:14:52",
      },
      {
        id: 25,
        name: "Brown",
        status: 2,
        price: 93.2,
        date: "2016-07-27 16:07:33",
      },
      {
        id: 26,
        name: "Williams",
        status: 3,
        price: 93.66,
        date: "2016-03-02 22:03:36",
      },
      {
        id: 27,
        name: "Jackson",
        status: 3,
        price: 131.4,
        date: "2015-01-20 12:35:14",
      },
      {
        id: 28,
        name: "Anderson",
        status: 2,
        price: 39.6,
        date: "2016-05-22 05:10:59",
      },
      {
        id: 29,
        name: "Smith",
        status: 1,
        price: 186.7,
        date: "2016-02-28 11:46:36",
      },
      {
        id: 30,
        name: "Lopez",
        status: 2,
        price: 179.6,
        date: "2016-02-09 08:08:17",
      },
      {
        id: 31,
        name: "Johnson",
        status: 4,
        price: 57.74,
        date: "2015-10-23 02:50:35",
      },
      {
        id: 32,
        name: "Jones",
        status: 2,
        price: 39.82,
        date: "2016-08-10 08:16:32",
      },
      {
        id: 33,
        name: "Smith",
        status: 1,
        price: 48.3,
        date: "2016-02-06 09:50:42",
      },
      {
        id: 34,
        name: "Walker",
        status: 3,
        price: 58.5,
        date: "2016-01-22 19:34:35",
      },
      {
        id: 35,
        name: "Lee",
        status: 2,
        price: 108.8,
        date: "2016-10-30 17:45:02",
      },
      {
        id: 36,
        name: "Perez",
        status: 3,
        price: 85.5,
        date: "2015-04-11 04:23:00",
      },
    ],
    quote: {
      name: "Joho Doe",
      title: "Graphic Designer",
      content:
        "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
      avatar:
        "//cdn.antd-admin.zuiidea.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236",
    },
    numbers: [
      {
        icon: "pay-circle-o",
        color: "#64ea91",
        title: "Online Review",
        number: 2781,
      },
      {
        icon: "team",
        color: "#8fc9fb",
        title: "New Customers",
        number: 3241,
      },
      {
        icon: "message",
        color: "#d897eb",
        title: "Active Projects",
        number: 253,
      },
      {
        icon: "shopping-cart",
        color: "#f69899",
        title: "Referrals",
        number: 4324,
      },
    ],
  };

  const badgeData = [
    {
      name: "NCC cần định danh",
      value: sellers_progressing,
      icon: <IdentityIcon className="text-[#5B93FF] w-[40px] h-[40px]" />,
      colorBgIcon: "#5B93FF33",
      path: "/identity-request",
    },
    {
      name: "Tổng đơn hàng",
      value: total_orders,
      icon: <NoteIcon className="text-[#FFC327] w-[40px] h-[40px]" />,
      colorBgIcon: "#FFC32733",
      path: "",
    },
    {
      name: "Tổng sản phẩm",
      value: total_products,
      icon: <ProductIcon className="text-[#FF8F6B] w-[40px] h-[40px]" />,
      colorBgIcon: "#FF8F6B33",
      path: "/products",
    },
    {
      name: "Khiếu nại cần xử lý",
      value: ticket_progressing,
      icon: <BillIcon className="text-[#14B8A6] w-[40px] h-[40px]" />,
      colorBgIcon: "#5EE1DF33",
      path: "",
    },
    {
      name: "Sản phẩm cần duyệt",
      value: product_progressing,
      icon: <ArchivedIcon className="text-[#CA0CC1] w-[40px] h-[40px]" />,
      colorBgIcon: "#CA0CC133",
      path: "/products/status/0",
    },
    {
      name: "Số yêu cầu rút tiền chờ xử lý",
      value: total_products,
      icon: <DollarIcon className="text-[#6366F1] w-[40px] h-[40px]" />,
      colorBgIcon: "#6366F133",
      path: "",
    },
  ];

  return (
    <div>
      <Row gutter={[15, 15]} className="bg-[#F5F5F5]">
        {badgeData.map((item) => {
          const { name, value, icon, colorBgIcon, path } = item;
          return (
            <Col span={8} key={name}>
              <Link to={path}>
                <div className="bg-white h-[114px] flex items-center gap-[20px] px-[20px] rounded-[10px] text-[#414141] hover:shadow-[0_0_14px_0px_rgba(22,119,255,0.3)] duration-300">
                  <div
                    className="p-[10px] rounded-full w-[50px] h-[50px] flex justify-center items-center"
                    style={{ backgroundColor: colorBgIcon }}
                  >
                    {icon}
                  </div>
                  <div className="flex flex-col justify-between h-[50px]">
                    <p className="text-[16px]">{name}</p>{" "}
                    <p className="font-medium text-[24px]">{value}</p>
                  </div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>

      <div className="bg-[#F5F5F5] h-[15px]"></div>

      <div className="pt-[30px] pr-[30px]">
      <ResponsiveContainer minHeight={360}>
        <LineChart data={data.sales}>
          <Legend
            verticalAlign="top"
            content={(prop) => {
              const { payload } = prop;
              console.log('payload: ', payload);
              return (
                <ul
                  className="text-right text-[#999] text-[14px]"
                >
                  {payload.map((item, key) => (
                    <li key={key} className="h-[48px] line-clamp-[48px] inline-block ml-[24px]">
                      <span
                        // className={styles.radiusdot}
                        className="w-[12px] h-[12px] mr-[8px] rounded-[50%] inline-block"
                        style={{ background: item.color }}
                      />
                      {item.value}
                    </li>
                  ))}
                </ul>
              );
            }}
          />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: '#e5e5e5', strokeWidth: 1 }}
            tickLine={false}
          />
          <YAxis axisLine={false} tickLine={false} />
          <CartesianGrid
            vertical={false}
            stroke={"#e5e5e5"}
            strokeDasharray="3 3"
          />
          <Tooltip
            wrapperStyle={{
              border: "none",
              boxShadow: "4px 4px 40px rgba(0, 0, 0, 0.05)",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px"
            }}
            content={(content) => {
              const list = content.payload.map((item, key) => (
                <li key={key} className="flex items-center">
                  <span
                    className="w-[12px] h-[12px] mr-[8px] rounded-[50%] inline-block my-[10px]"
                    style={{ background: item.color }}
                  />
                  {`${item.name}: ${item.value}`}
                </li>
              ));
              return (
                <div>
                  <p className="font-medium">{content.label}</p>
                  {content.payload && <ul>{list}</ul>}
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="Khách hàng"
            stroke="#d897eb"
            strokeWidth={3}
            dot={{ fill: "#d897eb" }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="Sellers"
            stroke='#f69899'
            strokeWidth={3}
            dot={{ fill: '#f69899' }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="Sản phẩm"
            stroke='#64ea91'
            strokeWidth={3}
            dot={{ fill: '#64ea91' }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
