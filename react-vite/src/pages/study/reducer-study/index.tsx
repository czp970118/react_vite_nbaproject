import React, { useReducer, useState } from "react";
import { taskReducer } from "../../../reducer/task-reducer";
import { Divider, Button } from "antd";
import { TaskContext, TaskDispatcherContext } from "../../../context/task-context";
import AddTask from "./add-task";
import TaskList from "./task-list";
import { bubble } from "@/utils/sort3";

import "./index.scss";

const initList = [
   { text: "第一条任务", id: 1, done: true, edit: false },
   { text: "第二条任务", id: 2, done: false, edit: false },
   { text: "第三条任务", id: 3, done: false, edit: false },
];

const testArr = [3, 5, 6, 1, 2, 4];

function ReducerStudy() {
   const [taskList, dispatch] = useReducer(taskReducer, initList);
   const lastTaskId = taskList[taskList.length - 1].id;
   const [arr, setArr] = useState(testArr);

   function fn1() {
      const a = 1;
      return function () {
         console.log("a--->", a);
      };
   }

   const res = fn1();
   res();
   console.dir(fn1);
   /**
    * 闭包的两个常用用途
    * 1.保存私有变量，通过闭包可以在外部调用闭包函数，访问函数内部的变量
    * 2.让已经结束的函数上下文中的变量对象继续留在内存中
    */

   /**
    * 输出的都是6，这是由于setTimeOut是宏任务，由于js是事件循环机制，for循环的代码执行完之后才会执行setTimeout函数，所以输出的都属6
    *
    */
   // for (var i = 0; i < 6; i++) {
   //    // (function (j) {
   //    //    setTimeout(function timer() {
   //    //       console.log(j);
   //    //    }, 0);
   //    // })(i);
   //    setTimeout(
   //       function (j) {
   //          console.log(j);
   //       },
   //       0,
   //       i
   //    );
   // }

   const onSortClick = () => {
      const newArr = bubble(testArr);
      console.log(newArr);
      setArr(newArr);
   };

   return (
      <TaskContext.Provider value={taskList}>
         {/* <TaskDispatcherContext.Provider value={dispatch}>
            <AddTask
               addTask={(value) => {
                  dispatch({
                     type: "add",
                     value: {
                        text: value,
                        id: lastTaskId + 1,
                        done: false,
                     },
                  });
               }}
            />
            <TaskList
               list={taskList}
               taskDelet={(id) => {
                  dispatch({ type: "delete", id });
               }}
               taskEdit={(id) => {
                  dispatch({ type: "edit", id });
               }}
               taskUpdate={(value) => {
                  dispatch({ type: "update", value });
               }}
            />
         </TaskDispatcherContext.Provider> */}
         <Divider children="水平居中" />
         <div className="box-warp">
            <div className="box1" />
            <div className="box2" />
            <span className="box3">box3</span>
            <span className="box4" />
         </div>
         <Divider children="排序" />
         <div className="sort-warp">
            {arr.map((item, index) => {
               return (
                  <span className="sort-item" key={item}>
                     {item}
                     {index < arr.length - 1 ? "," : ""}
                  </span>
               );
            })}
            <Button onClick={onSortClick}>排序</Button>
         </div>
      </TaskContext.Provider>
   );
}

export default ReducerStudy;
