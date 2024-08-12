// 核心 ：在子组件中调用父组件的函数并传递实参

import { useState } from "react";

function Son({ getSonMsg }) {
  const msg = "this is son msg";
  return (
    <div>
      this is son
      <button onClick={() => getSonMsg(msg)}>获取子组件数据</button>
    </div>
  );
}

function App() {
  const [msg, setMsg] = useState();
  const getMsg = (msg) => {
    setMsg(msg);
    console.log(msg);
  };
  return (
    <div className="App">
      {/* this is app */}
      {msg}
      <Son getSonMsg={getMsg} />
    </div>
  );
}

export default App;
