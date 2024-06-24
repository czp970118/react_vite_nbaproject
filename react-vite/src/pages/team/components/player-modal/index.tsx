import React, { useState } from "react";
import {
   Spin,
   Table,
   Form,
   Modal,
   Input,
   Select,
   InputNumber,
   message,
   Tag,
   Space,
   Button,
   Image,
   Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { POSITION_DATASOURCE } from "@/constan";
import "./index.scss";

interface IProps {
   open: boolean;
   onClose: () => void;
   onOk: (values: any) => void;
   initValues?: any;
}

const formLayout = {
   labelCol: { span: 4 },
};

const uploadButton = (
   <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
   </button>
);

const imageUrl = "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

const PlayerModal = (props: IProps) => {
   const { open, onClose, onOk, initValues } = props;
   const [form] = Form.useForm();

   const onSubmit = async () => {
      form
         .validateFields()
         .then((values) => {
            onOk(values);
         })
         .catch((err) => {
            console.log("err", err);
         });
   };

   return (
      <Modal title="Create player" open={open} onCancel={onClose} onOk={onSubmit}>
         <Form form={form} className="create-form" initialValues={initValues} {...formLayout}>
            <Form.Item name="avatar" className="avatar-item">
               <Upload
                  listType="picture-circle"
                  showUploadList={false}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
               >
                  {imageUrl ? (
                     <Image preview={false} style={{ borderRadius: "100%" }} src={imageUrl} />
                  ) : (
                     uploadButton
                  )}
               </Upload>
            </Form.Item>
            <Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入姓名" }]}>
               <Input placeholder="请输入" style={{ width: 300 }} />
            </Form.Item>
            <Form.Item
               name="position"
               label="位置"
               rules={[{ required: true, message: "请至少选择一个位置" }]}
            >
               <Select options={POSITION_DATASOURCE} mode="tags" style={{ width: 300 }} />
            </Form.Item>
            <Form.Item
               name="number"
               label="号码"
               rules={[{ required: true, message: "请输入号码" }]}
            >
               <InputNumber min={0} style={{ width: 150 }} />
            </Form.Item>
            <Form.Item name="age" label="年龄">
               <InputNumber min={1} style={{ width: 150 }} />
            </Form.Item>
            <Form.Item name="capability" label="能力值">
               <InputNumber min={1} style={{ width: 150 }} />
            </Form.Item>
            <Form.Item name="describe" label="介绍">
               <Input.TextArea rows={4} />
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default PlayerModal;
