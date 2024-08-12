// App -> A -> B
// 使用context机制跨层级通信

import { createContext, useContext } from "react";

// 1.使用createContext方法创建一个上下文对象Ctx

const MsgContent = createContext();
function A() {
  return (
    <div>
      this is A.
      <B />
    </div>
  );
}

function B() {
  // 3.在底层组件(B)中通过 usecontext 钩子函数获取消费数据
  //   const name = useContext(MsgContent);
  return (
    <div>
      this is B
      <C />
    </div>
  );
}
function C() {
  // 3.在底层组件(B)中通过 usecontext 钩子函数获取消费数据
  const name = useContext(MsgContent);
  return <div>this is C,{name}</div>;
}

function App() {
  const name = "this is app name";
  // 2.在顶层组件(App)中通过 Ctx.Provider组件提供数据
  return (
    <div>
      <MsgContent.Provider value={name}>
        this is app.
        <A />
      </MsgContent.Provider>
    </div>
  );
}

export default App;
