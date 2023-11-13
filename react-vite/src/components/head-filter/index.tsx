import React from "react";
import { Form, Input, Button } from "antd";

import "./index.scss";

type FieldType = {
   name: string;
   label: string;
};

interface IProps {
   fieldItems: FieldType[];
}

export default function (props: IProps) {
   const { fieldItems = [] } = props;
   const formItemMaps = {
      name: <Input style={{ width: 200 }} placeholder="请输入姓名" />,
   };

   return (
      <div className="filter-wrap">
         <div className="item-wrap">
            {fieldItems.map((item) => {
               return (
                  <Form.Item {...item}>
                     {formItemMaps[item.name as keyof typeof formItemMaps]}
                  </Form.Item>
               );
            })}
            <Form.Item className="filter-search">
               <Button type="primary" htmlType="submit">
                  Submit
               </Button>
            </Form.Item>
         </div>
      </div>
   );
}
