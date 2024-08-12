import { createSlice } from "@reduxjs/toolkit";
const counterStore = createSlice({
  name: "counter",
  // 初始状态数据
  initialState: {
    count: 0,
  },
  // 修改数据的同步方法
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
    addNum: (state, actions) => {
      state.count += actions.payload;
    },
  },
});

// 结构创建action对象的函数 （actionCreator）
const { increment, decrement, addNum } = counterStore.actions;
// 获取reducer函数
const counterReducer = counterStore.reducer;
// 导出创建action对象的函数和reducer函数
export { increment, decrement, addNum };
export default counterReducer;
