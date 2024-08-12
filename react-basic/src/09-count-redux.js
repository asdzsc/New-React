import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// 导入action Creator
import { increment, decrement, addNum } from "./store/modules/counterStore";
import { getChannelList } from "./store/modules/channelStore";

function App() {
  const { count } = useSelector((state) => state.conter);
  const { channelList } = useSelector((state) => state.channel);
  // 得到dispatch方法
  const dispatch = useDispatch();

  //   使用useEffect触发异步请求
  useEffect(() => {
    dispatch(getChannelList());
  }, [dispatch]);

  return (
    // 调用dispatch提交action对象
    <>
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(addNum(10))}>add 10</button>
      <button onClick={() => dispatch(addNum(20))}>add 20</button>
      <ul>
        {channelList.map((item) => <li key={item.id}>{item.name}</li>)}
      </ul>
    </>
  );
}

export default App;
