import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Dropdown, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { StyledHeader } from "./Index.style";

const Header = ({ collapsed, changeCollapsed }) => {
  const { logOut } = useAuthStore((state) => state);
  const items = [
    { key: "link-to-profile", label: <Link to="/#">Tài khoản</Link> },
    {
      key: "Đăng xuất",
      label: (
        <Link to="/login" onClick={logOut}>
          Đăng xuất
        </Link>
      ),
    },
  ];

  return (
    <StyledHeader>
      <Row justify="space-between">
        <Col>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: () => changeCollapsed(),
            }
          )}
        </Col>
        <Col>
          <Row justify="center">
            <Col>
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <Button type="text">
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  ></Avatar>
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledHeader>
  );
};

export default Header;

Header.propTypes = {
  collapsed: PropTypes.bool,
  changeCollapsed: PropTypes.func.isRequired,
};
