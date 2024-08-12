import { useEffect, useState } from "react";
// useEffect是一个React Hook函数，
// 用于在React组件中创建不是由事件引起而是由渲染本身引起的操作,比如发送AJAX请求，更改DOM等等
const URL = "http://geek.itheima.net/v1_0/channels";
function App() {
  const [list, setList] = useState([]);
  const getList = async () => {
    const res = await fetch(URL);
    const resData = await res.json();
    // console.log(resData);
    setList(resData.data.channels);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      this is App,
      {list.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </>
  );
}
export default App;
