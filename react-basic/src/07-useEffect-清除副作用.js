import { useEffect, useState } from "react";
// 在useEffect中编写的由渲染本身引起的对接组件外部的操作，社区也经常把它叫做副作用操作，
// 比如在useEffect中开启了一个定时器，我们想在组件卸载时把这个定时器再清理掉，这个过程就是清理副作用

const Son = () => {
  useEffect(() => {
    // 副作用操作逻辑
    const timer = setInterval(() => {
      console.log("子组件定时器执行了....");
    }, 1000);
    return () => {
      // 说明:清除副作用的函数最常见的执行时机是在组件卸载时自动执行
      //清除副作用逻辑
      clearInterval(timer);
    };
  }, []);
  return <div>this is son</div>;
};

function App() {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      this is app,
      {show && <Son />}
      <button onClick={handleClose}>卸载子组件</button>
    </>
  );
}

export default App;
