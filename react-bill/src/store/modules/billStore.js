// 账单列表相关store

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "bill",
  // 账单列表
  initialState: {
    billList: [],
  },
  reducers: {
    // 同步设置 账单列表
    setBillList: (state, actions) => {
      state.billList = actions.payload;
    },
    // 同步添加 账单列表
    addBillList: (state, actions) => {
      state.billList.push(actions.payload);
    },
  },
});

// 结构actionCroter 构造函数
const { setBillList, addBillList } = billStore.actions;
// export { setBillList };

// 异步获取数据
const getBillList = () => {
  return async (dispatch) => {
    let res = await axios.get("http://localhost:3004/ka");
    // console.log('resres',res);
    dispatch(setBillList(res.data));
  };
};

const postBillList = (data) => {
  return async (dispatch) => {
    let res = await axios.post("http://localhost:3004/ka", data);
    dispatch(addBillList(res.data));
  };
};

export { getBillList, postBillList };

// 导出reducer
const reducer = billStore.reducer;
export default reducer;
