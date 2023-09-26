import { Spin } from "antd";
import axios from "axios";
import { useRef, useState } from "react";
import { alerts } from "../../utils/alerts";
import { CameraOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

export default function Upload({image, setImage, width, height}) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!allowedImageTypes.includes(file.type)) {
        alerts.error("Vui lòng chọn ảnh");
        return;
      }
      const formData = new FormData();
      formData.append("image", file);
      setLoading(true);
      axios
        .post("https://api-dev.hihihi.vn/api/images", formData)
        .then((response) => {
          setImage(response.data.data);
        })
        .catch((error) => {
          alerts.error(error.response.data.msg || "Có lỗi, vui lòng thử lại");
        })
        .finally(() => setLoading(false));
    }
  };
  return (
    <Spin spinning={loading}>
      <div
        onClick={handleImageClick}
        className={`w-[${width}] h-[${height}] cursor-pointer rounded-md bg-slate-200 flex justify-center items-center`}
        style={{height: height}}
      >
        {!image && <p className="text-[#21409A]"><CameraOutlined /> Thêm ảnh</p>}
        {image && (
          <img src={image} alt="" style={{height: height}} className={`w-[${width}] h-[${height}] object-cover rounded-md`} />
        )}
        <input
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
    </Spin>
  );
}

Upload.propTypes = {
    image: PropTypes.string,
    setImage: PropTypes.func,
    height: PropTypes.string,
    width: PropTypes.string
  };
