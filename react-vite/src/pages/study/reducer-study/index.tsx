import React, { useReducer, useState } from "react";
import { taskReducer } from "../../../reducer/task-reducer";
import { TaskContext, TaskDispatcherContext } from "../../../context/task-context";
import { quickSort, selectSort, insertSort } from "../../../utils/sort2";
import AddTask from "./add-task";
import TaskList from "./task-list";

import "./index.scss";

const initList = [
   { text: "第一条任务", id: 1, done: true, edit: false },
   { text: "第二条任务", id: 2, done: false, edit: false },
   { text: "第三条任务", id: 3, done: false, edit: false },
];

const testArr = [6, 9, 3, 2, 5, 1, 7, 8];

function ReducerStudy() {
   const [taskList, dispatch] = useReducer(taskReducer, initList);
   const lastTaskId = taskList[taskList.length - 1].id;
   // const [arr, setArr] = useState(testArr);

   // const handleSort = () => {
   //    const newArr = insetSort(testArr);
   //    console.log("newArr(testArr)---->", newArr);
   //    setArr(newArr);
   // };

   const test1 = insertSort(testArr);
   console.log("test1----->", test1);

   return (
      <TaskContext.Provider value={taskList}>
         <TaskDispatcherContext.Provider value={dispatch}>
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
         </TaskDispatcherContext.Provider>
         {/* <div className="test-wrap">
            {arr.map((item: number) => {
               return <div className="test-item">{item}</div>;
            })}
            <div onClick={handleSort} className="sort-btn">
               排序
            </div>
         </div> */}
      </TaskContext.Provider>
   );
}

export default ReducerStudy;
