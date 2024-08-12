import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import _ from "lodash";
import DailyBill from "./components/Day";

const Month = () => {
  // 日期组件
  const [dateVisible, setDateVisible] = useState(false);

  // 日期
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().format("YYYY-MM");
  });

  // 当前月数据
  const [currentMonthList, setCurrentMonthList] = useState([]);

  // 账单数据
  const { billList } = useSelector((state) => state.bill);

  // 按月数据分组
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);

  // 按天数据分组
  const dayGroup = useMemo(() => {
    const dayData = _.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );
    const keys = Object.keys(dayData);
    return {
      dayData,
      keys,
    };
  }, [currentMonthList]);
  // console.log("dayGroup", dayGroup);

  const monthResult = useMemo(() => {
    // 支出
    const pay = currentMonthList
      ?.filter((x) => x.type === "pay")
      .reduce((a, b) => a + b.money, 0);

    // 收入
    const income = currentMonthList
      ?.filter((x) => x.type === "income")
      .reduce((a, b) => a + b.money, 0);

    // console.log("pay", pay);
    // console.log("income", income);

    return {
      pay: pay ?? 0,
      income: income ?? 0,
      total: isNaN(pay + income) ? 0 : pay + income,
    };
  });

  // 初始化的时候把当前月的统计数据显示出来
  useEffect(() => {
    const currentDate = dayjs().format("YYYY-MM");
    if (monthGroup[currentDate]) {
      setCurrentMonthList(monthGroup[currentDate]);
    }
  }, [monthGroup]);

  const handleConfirm = (date) => {
    setDateVisible(false);
    const formatDate = dayjs(date).format("YYYY-MM");
    // console.log("formatDate", formatDate);
    setCurrentMonthList(monthGroup[formatDate]);
    setCurrentDate(formatDate);
  };
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate}月账单</span>
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            onCancel={() => setDateVisible(false)}
            onClose={() => setDateVisible(false)}
            onConfirm={handleConfirm}
            visible={dateVisible}
            max={new Date()}
          />
        </div>
        {/* 单日列表数据统计 */}
        {dayGroup.keys.map((item) => {
          return (
            <DailyBill
              key={item}
              billList={dayGroup.dayData[item]}
              billDate={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Month;
