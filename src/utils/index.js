export const getMeta = (metaName) => {
  const metas = document.getElementsByTagName("meta");
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("name") === metaName) {
      return metas[i].getAttribute("content");
    }
  }
  return "";
};
export const store_code =
  getMeta("store_code") === ""
    ? window.location.hostname.split(".")[0]
    : getMeta("store_code");
export const formatNumber = (str) => {
  if (str === undefined || str === null) return "";
  const strFormat = str
    .toString()
    .replace(/[A-Za-z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, "");
  if (Number(strFormat) >= 1000) {
    return strFormat
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  } else if (Number(strFormat) >= 0 && Number(strFormat) < 1000) {
    return Number(strFormat);
  } else {
    return "";
  }
};

export const formatPriceOrContact = (p) => {
  if (!p) return "Liên hệ";
  p = Math.round(p);
  p = p.toString();
  let n = 0;
  let tmp = "";
  let rs = p[0];
  for (let i = p.length - 1; i > 0; i--) {
    n++;
    tmp += p[i];
    if (n % 3 === 0) {
      tmp += ".";
    }
  }
  for (let i = tmp.length - 1; i >= 0; i--) {
    rs += tmp[i];
  }
  if (rs == 0) return "Liên hệ";
  return "₫" + rs;
};
export const formatPrice = (p, NOD = false) => {
  if (!p) return "0";
  p = Math.round(p);
  p = p.toString();
  let n = 0;
  let tmp = "";
  let rs = p[0];
  for (let i = p.length - 1; i > 0; i--) {
    n++;
    tmp += p[i];
    if (n % 3 === 0) {
      tmp += ".";
    }
  }
  for (let i = tmp.length - 1; i >= 0; i--) {
    rs += tmp[i];
  }
  if (NOD == true) return rs;
  return "₫" + rs;
};

export const getQueryParams = (name) => {
  return new URLSearchParams(window ? window.location.search : {}).get(name);
};

export const getPathByIndex = (index) => {
  const path = window.location.pathname;
  const parts = path.split("/");

  if (index >= 0 && index < parts.length) {
    return parts[index];
  }
  return null;
};

export const contactOrNumber = (data) => {
  if (getChannel() == "IKIPOS") {
    return data;
  } else {
    var string = data.slice(0, -2);
    var newString = string
      .toString()
      .replace(/\./g, "")
      .toString()
      .replace(/,/g, "")
      .toString()
      .replace(/-/g, "")
      .toString();
    if (newString == 0) {
      return "0đ";
    } else {
      return data;
    }
  }
};

export const getChannel = () => {
  if (window.location.href.includes("pos.")) {
    return "IKIPOS";
  }
  return "IKITECH";
};

export const format = (number) => {
  var num = Number(number);
  return num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

