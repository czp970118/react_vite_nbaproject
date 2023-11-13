import { useReducer } from "react";
import { taskReducer } from "../../../reducer/task-reducer";
import { TaskContext, TaskDispatcherContext } from "../../../context/task-context";
import AddTask from "./add-task";
import TaskList from "./task-list";

import "./index.scss";

const initList = [
   { text: "第一条任务", id: 1, done: true, edit: false },
   { text: "第二条任务", id: 2, done: false, edit: false },
   { text: "第三条任务", id: 3, done: false, edit: false },
];

function ReducerStudy() {
   const [taskList, dispatch] = useReducer(taskReducer, initList);
   const lastTaskId = taskList[taskList.length - 1].id;

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
      </TaskContext.Provider>
   );
}

export default ReducerStudy;
