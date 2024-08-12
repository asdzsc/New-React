import { useEffect, useState } from "react";
const URL = "http://geek.itheima.net/v1_0/channels";
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Tom");
  //1.没有依赖项初始 + 组件更新
  //   useEffect(() => {
  //     console.log("副作用函数执行了");
  //   });
  //2.传入空数组依赖 初始执行一次
  //   useEffect(() => {
  //     console.log("副作用函数执行了");
  //   }, []);
  // 3.传入特定依赖项 初始 + 依赖项变化时执行
  useEffect(() => {
    console.log("副作用函数执行了");
  }, [name]);
  const changeName = () => {
    setName("Jerry");
  };
  return (
    <>
      this is App,
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
      {name}
      <button onClick={changeName}>change</button>
    </>
  );
}
export default App;
