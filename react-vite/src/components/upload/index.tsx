import { useState } from "react";
import { Upload, message, Image } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

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
   onChange: (img: string | string[]) => void;
   name?: string;
}

const UploadImage = (props: IProps) => {
   const { onChange } = props;
   const [loading, setLoading] = useState<boolean>(false);
   const [imageUrl, setImageUrl] = useState<string>();

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

   return (
      <Upload
         {...config}
         beforeUpload={beforeUpload}
         showUploadList={false}
         listType="picture-card"
         className="avatar-uploader"
         accept="image"
      >
         {imageUrl ? (
            <Image src={imageUrl} style={{ width: 100, height: 100, borderRadius: 8 }} />
         ) : (
            uploadButton
         )}
      </Upload>
   );
};

export default UploadImage;
