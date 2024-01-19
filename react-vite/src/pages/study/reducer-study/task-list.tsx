import { useState } from "react";
import { Checkbox, Button, Input } from "antd";

import "./index.scss";

interface TaskItem {
   done: boolean;
   text: string;
   id: number;
   edit: boolean;
}

interface IProps {
   list: TaskItem[];
   taskDelet: (id: number) => void;
   taskEdit: (id: number) => void;
   taskUpdate: (value: any) => void;
}

function TaskList(props: IProps) {
   const { list, taskDelet, taskEdit, taskUpdate } = props;

   return (
      <div className="task-list">
         {list.map((item: TaskItem) => {
            return (
               <div className="task-list-item" key={item?.id}>
                  <Checkbox checked={item?.done} style={{ marginRight: 8 }} />
                  {item?.edit ? (
                     <Input
                        defaultValue={item.text}
                        style={{ width: 300, height: 28 }}
                        onBlur={(e) => {
                           const { value } = e.target;
                           taskUpdate({ id: item.id, text: value });
                        }}
                     />
                  ) : (
                     <span>{item.text}</span>
                  )}
                  <span>
                     <Button
                        type="link"
                        onClick={() => {
                           taskEdit(item.id);
                        }}
                     >
                        编辑
                     </Button>
                     <Button
                        type="text"
                        onClick={() => {
                           taskDelet(item.id);
                        }}
                     >
                        删除
                     </Button>
                  </span>
               </div>
            );
         })}
      </div>
   );
}

export default TaskList;
