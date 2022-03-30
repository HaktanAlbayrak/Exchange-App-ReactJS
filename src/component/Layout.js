import React from "react";
import Currency from "./Currency";
import "../assets/scss/layout.scss";

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="layout-top"></div>
      <div className="layout-bottom"></div>
      <Currency />
    </div>
  );
};

export default Layout;
