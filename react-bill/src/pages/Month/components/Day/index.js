import classNames from "classnames";
import "./index.scss";
import { useMemo, useState } from "react";
import { billTypeToName } from "@/contants";
import Icon from "@/components/Icon";

const DailyBill = ({ billList, billDate }) => {
  const dayResult = useMemo(() => {
    // 支出
    const pay = billList
      ?.filter((x) => x.type === "pay")
      .reduce((a, b) => a + b.money, 0);

    // 收入
    const income = billList
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

  // 单日列表现实隐藏
  const [visible, setVisible] = useState(false);

  return (
    <div className={classNames("dailyBill")}>
      <div className="header">
        <div className="dateIcon" onClick={() => setVisible(!visible)}>
          <span className="date">{billDate}</span>
          <span className={classNames("arrow", visible && "expand")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div className="billList" style={{ display: visible ? "block" : "none" }}>
        {billList.map((item) => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames("money", item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DailyBill;
