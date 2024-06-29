import React, { useState } from "react";
import { Breadcrumb, Form, Input, TreeSelect, Select, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.scss";

const formLayout = {
   labelCol: { span: 4 },
   wrapperCol: { span: 16 },
};

const uploadUrl = "http://localhost:8081/upload"; // 替换为你的Express接口地址

const config = {
   name: "image",
   action: uploadUrl,
   onChange(info) {
      if (info.file.status !== "uploading") {
         console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
         message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === "error") {
         message.error(`${info.file.name} 上传失败`);
      }
   },
};
const TeamCreate = () => {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState<boolean>(false);

   const uploadButton = (
      <button style={{ border: 0, background: "none" }} type="button">
         {loading ? <LoadingOutlined /> : <PlusOutlined />}
         <div style={{ marginTop: 8 }}>Upload</div>
      </button>
   );

   return (
      <div>
         <Breadcrumb
            items={[
               {
                  title: <a href="/#/pages/team/center">球队中心</a>,
               },
               {
                  title: "球队创建",
               },
            ]}
         />
         <Form form={form} {...formLayout} className="form-wrap">
            <Form.Item label="球队主图">
               <Upload {...config}>{uploadButton}</Upload>
            </Form.Item>
            <Form.Item label="球队名称">
               <Input placeholder="请输入球队名称" />
            </Form.Item>
            <Form.Item label="所在城市">
               <TreeSelect />
            </Form.Item>
            <Form.Item label="主场球馆">
               <Input placeholder="请输入主场球馆" />
            </Form.Item>
            <Form.Item label="主教练">
               <Input placeholder="请输入主教练" />
            </Form.Item>
            <Form.Item label="所在分区">
               <Select />
            </Form.Item>
         </Form>
      </div>
   );
};

export default TeamCreate;
