import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/contants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import { postBillList } from "@/store/modules/billStore";
import { useDispatch } from "react-redux";

const New = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 类型 pay 支出 income  收入
  const [buillType, setBuillType] = useState("pay");

  // 金额
  const [value, setValue] = useState(0);

  // 用途
  const [useFor, setUseFor] = useState("pay");

  // 日期
  const [dateVisible, setDateVisible] = useState(false);

  // 选中日期
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const handleSave = () => {
    const data = {
      type: buillType,
      money: buillType === "pay" ? -value : +value,
      date: selectedDate,
      useFor: useFor,
    };
    dispatch(postBillList(data));
    navigate("/");
  };
  const handleSetDate = (date) => {
    setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
    setDateVisible(false);
  };
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            onClick={() => setBuillType("pay")}
            className={classNames(buillType === "pay" ? "selected" : "")}
          >
            支出
          </Button>
          <Button
            onClick={() => setBuillType("income")}
            className={classNames(buillType === "income" ? "selected" : "")}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>
                {selectedDate}
              </span>
              <DatePicker
                visible={dateVisible}
                onCancel={() => setDateVisible(false)}
                onConfirm={(date) => handleSetDate(date)}
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                value={value}
                onChange={(e) => setValue(e)}
                className="input"
                placeholder="0.00"
                type="number"
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[buillType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames(
                        "item",
                        useFor === item.type ? "selected" : ""
                      )}
                      onClick={() => setUseFor(item.type)}
                      key={item.type}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns" onClick={handleSave}>
        <Button className="btn save">保 存</Button>
      </div>
    </div>
  );
};

export default New;
