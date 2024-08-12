// 实现思路：借助”状态提升“机制 通过父组件进行兄弟组件之间的数据传递
// 1. A -> APP 字传父
// 2. App -> B 父传子

import { useState } from "react";

function A({ onGetAName }) {
  const name = "this is A name";
  return (
    <div>
      A,
      <button onClick={() => onGetAName(name)}>传递数据</button>
    </div>
  );
}

function B({ name }) {
  return <div>B,{name}</div>;
}

function App() {
  const [name, setName] = useState("");
  const getName = (name) => {
    console.log(name);
    setName(name);
  };
  return (
    <div>
      <A onGetAName={(name) => getName(name)} />
      <B name={name} />
    </div>
  );
}
export default App;
