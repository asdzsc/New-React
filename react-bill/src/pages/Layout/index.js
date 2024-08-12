import { getBillList } from "@/store/modules/billStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  BillOutline,
  AddCircleOutline,
  HistogramOutline,
} from "antd-mobile-icons";
import { TabBar } from "antd-mobile";
import "./index.scss";
const Layout = () => {
  const tabs = [
    {
      key: "/",
      title: "月度账单",
      icon: <BillOutline />,
    },
    {
      key: "/new",
      title: "记账",
      icon: <AddCircleOutline />,
    },
    {
      key: "/year",
      title: "年度账单",
      icon: <HistogramOutline />,
    },
  ];

  const navigate = useNavigate();

  // 切换tab菜单
  const changeTabBar = (path) => {
    console.log("path", path);
    navigate(path);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={changeTabBar}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default Layout;