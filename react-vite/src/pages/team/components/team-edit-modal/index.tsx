import { useEffect } from "react";
import { Modal, Form, Input, TreeSelect, Select } from "antd";
import { AMERICA_CITY_DATA, PARTTITION_DATA } from "@/constan";
import UploadImage from "@/components/upload";

import "./index.scss";

interface IProps {
   open: boolean;
   onClose: () => void;
   values: any;
}

const formLayout = {
   labelCol: { span: 4 },
   wrapperCol: { span: 20 },
};

export default (props: IProps) => {
   const { open, onClose, values } = props;
   const [form] = Form.useForm();
   const formValus = form.getFieldsValue();

   useEffect(() => {
      if (open && values) {
         form.setFieldsValue(values);
      }
   }, [form, open, values]);

   return (
      <Modal open={open} onCancel={onClose} title="球队编辑">
         <Form {...formLayout} form={form}>
            <div className="edit-team-logo">
               <Form.Item noStyle name="logo">
                  <UploadImage value={formValus?.logo} />
               </Form.Item>
            </div>
            <Form.Item label="球队名称" name="teamName">
               <Input />
            </Form.Item>
            <Form.Item label="主教练" name="manager">
               <Input />
            </Form.Item>
            <Form.Item label="主场球馆" name="homeArena">
               <Input />
            </Form.Item>
            <Form.Item label="所在城市" name="city">
               <TreeSelect treeData={AMERICA_CITY_DATA} />
            </Form.Item>
            <Form.Item label="所在分区" name="partition">
               <Select options={PARTTITION_DATA} />
            </Form.Item>
         </Form>
      </Modal>
   );
};
