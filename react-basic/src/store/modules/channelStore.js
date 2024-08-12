import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const channelStore = createSlice({
  name: "channel",
  initialState: {
    channelList: [],
  },
  reducers: {
    setChannelList: (state, actions) => {
      state.channelList = actions.payload;
    },
  },
});

// 异步请求部分
const { setChannelList } = channelStore.actions;

const getChannelList = () => {
  return async (dispatch) => {
    let res = await axios.get("http://geek.itheima.net/v1_0/channels");
    dispatch(setChannelList(res.data.data.channels));
  };
};
export { getChannelList };

const reducer = channelStore.reducer;
export default reducer;
