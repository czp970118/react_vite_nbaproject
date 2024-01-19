import React from "react";
import { Form, Select, Input, Checkbox } from "antd";

const FormItem = Form.Item;

export const HeadFilter = () => {
   return (
      <Form layout="inline">
         <FormItem label="名称/ID">
            <Input style={{ width: 200 }} />
         </FormItem>
         <FormItem label="状态">
            <Select style={{ width: 200 }} />
         </FormItem>
         <FormItem label="是否测试">
            <Checkbox />
         </FormItem>
      </Form>
   );
};
