// 父传子
// 1. 父组件传递数据 子组件标签身上绑定属性
// 2. 子组件接收数据 prop上的参数

import { useState } from "react";

// Props 可传任意的数据
// 数字 字符串 布尔值 数组 对象 函数 jsx
// props是只读对象
// 子组件只能读取props中的数据 不能进行修改.父组件的数据只能由父组件修改

function Son(props) {
  console.log(props);
  const { name, age, isShow, list, obj, cb, child } = props;
  const [listVal, setListVal] = useState('');
  // props.name = "hh"; 不能进行修改
  return (
    <div>
      this is son
      <br />
      name:{name}
      <br />
      age:{age}
      <br />
      isShow:{isShow}
      <br />
      list:
      {list.map((item, index) => (
        <span key={index} style={{ color: "red" }}>
          {item}
        </span>
      ))}
      <br />
      <input value={listVal} onChange={(e) => setListVal(e.target.value)} />
      <br />
      {listVal}
      <br />
      obj:{JSON.stringify(obj)}
      <br />
      cb:{cb()}
      <br />
      child:{child}
    </div>
  );
}

function Son1(props){
  console.log(props);
  
  return <div>this is son1 {props.children}</div>
}

function App() {
  const name = "Tom";
  return (
    <div className="App">
      <Son
        name={name}
        age={18}
        isShow={true}
        list={["Vue", "React"]}
        obj={{ name: "Tom", age: 18 }}
        cb={() => {
          console.log("this is cb");
        }}
        child={<div>this is child</div>}
      />
      <Son1>
        <span>this is default son</span>
      </Son1>
    </div>
  );
}

export default App;
