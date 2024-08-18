import React, { useState, useEffect } from "react";
import { Upload, message, Image } from "antd";
import { LoadingOutlined, PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import "./index.scss";

const uploadUrl = "http://localhost:8081/upload";
const beforeUpload = (file: any) => {
   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
   if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
   }
   const isLt10M = file.size / 1024 / 1024 < 10;
   if (!isLt10M) {
      message.error("Image must smaller than 10MB!");
   }
   return isJpgOrPng && isLt10M;
};

interface IProps {
   onChange?: (img: string) => void;
   name?: string;
   value?: string;
   style?: React.CSSProperties;
   disabled?: boolean;
}

const UploadImage = (props: IProps) => {
   const { onChange, value, disabled } = props;
   const [loading, setLoading] = useState<boolean>(false);
   const [imageUrl, setImageUrl] = useState<string>(value);
   const [showActions, setShowActions] = useState<boolean>(false);
   const [preview, setPreview] = useState<boolean>(false);

   const config = {
      action: uploadUrl,
      onChange(info: any) {
         if (info.file.status === "uploading") {
            setLoading(true);
            return;
         }
         if (info.file.status === "done" && info.file.response.url) {
            message.success("图片上传成功");
            const url = info.file.response.url;
            setImageUrl(url);
            setLoading(false);
            onChange && onChange(url);
         } else if (info.file.status === "error") {
            message.error("上传失败");
            setLoading(false);
         }
      },
      onRemove: (e) => {
         console.log("e--->", e);
      },
   };

   const uploadButton = (
      <button style={{ border: 0, background: "none" }} type="button">
         {loading ? <LoadingOutlined /> : <PlusOutlined />}
         <div style={{ marginTop: 8 }}>Upload</div>
      </button>
   );

   const onRemove = (e) => {
      e.stopPropagation();
      setImageUrl("");
      onChange && onChange("");
   };

   const onPreview = (e) => {
      e.stopPropagation();
      setPreview(true);
   };

   useEffect(() => setImageUrl(value), [value]);

   return (
      <Upload
         {...config}
         beforeUpload={beforeUpload}
         showUploadList={false}
         listType="picture-card"
         className="avatar-uploader"
         accept="image"
         openFileDialogOnClick={!imageUrl}
         disabled={disabled}
      >
         {imageUrl ? (
            <div
               className="image-wrap"
               onMouseEnter={() => {
                  setShowActions(true);
               }}
               onMouseLeave={() => {
                  setShowActions(false);
               }}
            >
               <Image
                  src={imageUrl}
                  style={{ width: 100, height: 100, borderRadius: 8, objectFit: "cover" }}
                  preview={
                     !disabled
                        ? {
                             visible: preview,
                             onVisibleChange: (visible) => {
                                setPreview(visible);
                             },
                          }
                        : false
                  }
               />
               {showActions && !disabled ? (
                  <div className="image-actions">
                     <span className="action-item" onClick={onPreview}>
                        <EyeOutlined style={{ fontSize: 16, color: "#fff" }} />
                     </span>
                     <span className="action-item" onClick={onRemove}>
                        <DeleteOutlined style={{ fontSize: 16, color: "#fff" }} />
                     </span>
                  </div>
               ) : null}
            </div>
         ) : (
            uploadButton
         )}
      </Upload>
   );
};

export default UploadImage;
