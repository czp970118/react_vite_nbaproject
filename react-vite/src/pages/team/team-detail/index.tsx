import React, { useEffect, useState } from "react";
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
} from "antd";
import { useParams } from "react-router-dom";
import http from "@/request/http";
import { TeamItem, TableParams } from "@/types";
import { ParttitionEnum } from "@/enum";
import { useAntdTable } from "ahooks";
import HeadFilter from "@/components/head-filter";
import { POSITION_DATASOURCE, PositionEnum } from "@/constan";

import "./index.scss";

interface TeamDetailType extends TeamItem {}

function TeamDetail() {
   const params = useParams();
   const { id } = params || {};
   const [form] = Form.useForm();
   const [createForm] = Form.useForm();
   const [teamDetail, setTeamDetail] = useState<TeamDetailType>();
   const [loading, setLoading] = useState<boolean>(false);
   const [createModal, setCreateModal] = useState<boolean>(false);

   const getTeamDetail = async (id: number) => {
      setLoading(true);
      const res: any = await http("get", "/api/getTeamDetails", { id });
      const { success, data } = res;
      if (success) {
         setTeamDetail(data);
      }
      setLoading(false);
   };

   const getPlayers = async ({ current, pageSize }: TableParams, formValues: any) => {
      const res: any = await http("get", "/api/getAllPlayers", {
         current,
         pageSize,
         teamId: id,
         ...formValues,
      });
      const { success, data, total } = res;
      console.log("res--->", res);
      if (success) {
         return {
            list: data,
            total: total,
         };
      }
      return {
         list: [],
         total: 0,
      };
   };

   const onCreateClick = () => {
      setCreateModal(true);
   };

   const onCreate = async () => {
      createForm.validateFields().then(async (params) => {
         const res = await http("post", "/api/createPlayer", { ...params, teamId: id });
         if (res.success) {
            message.success("创建成功");
         }
         setCreateModal(false);
         submit();
      });
   };

   const onClose = () => setCreateModal(false);

   const onRemove = (id: number) => {
      Modal.confirm({
         title: "你确认要删除该球员吗?",
         content: "被删除的球员不会出现在该球队中，但是你依然可以再此添加回此球员",
         onOk: async () => {
            return new Promise<void>((resolve, reject) => {
               http("post", "/api/player/removePlayerFromTeam", { id })
                  .then((res: any) => {
                     if (res.success) {
                        message.success("删除成功");
                        submit();
                     } else {
                        message.error("删除失败");
                     }
                     resolve();
                  })
                  .catch((error) => {
                     reject(error);
                  });
            });
         },
      });
   };

   const columns = [
      {
         title: "姓名",
         dataIndex: "name",
         align: "center",
      },
      {
         title: "年龄",
         align: "center",
         dataIndex: "age",
      },
      {
         title: "号码",
         align: "center",
         dataIndex: "number",
      },
      {
         title: "位置",
         align: "center",
         dataIndex: "position",
         render: (text: string) => {
            const positionArr = text?.split(",") || [];
            return positionArr.map((item) => {
               return <Tag color={PositionEnum[item]}>{item}</Tag>;
            });
         },
      },
      {
         title: "能力值",
         align: "center",
         dataIndex: "capability",
      },
      {
         title: "操作",
         align: "center",
         render: (text: string, record: any) => {
            return (
               <Space>
                  <Button type="link">编辑</Button>
                  <Button
                     type="link"
                     onClick={() => {
                        onRemove(record.id);
                     }}
                  >
                     删除
                  </Button>
               </Space>
            );
         },
      },
   ];

   useEffect(() => {
      getTeamDetail(Number(id));
   }, []);

   const { tableProps, search } = useAntdTable(getPlayers, { form });
   const { submit } = search;

   return (
      <Spin spinning={loading}>
         <Form form={form} onFinish={submit}>
            <div className="team-detail-container">
               <div className="team-detail-top">
                  <div className="team-detail-info">
                     <div className="team-logo-wrap">
                        <img src={teamDetail?.logo} className="team-logo" />
                     </div>
                     <div className="team-info">
                        <span className="team-detail-title">{teamDetail?.teamName}</span>
                        <div className="team-info-item">
                           <span className="team-info-item-label">主教练:</span>
                           <span className="team-info-item-text">{teamDetail?.manager}</span>
                        </div>
                        <div className="team-info-item">
                           <span className="team-info-item-label">主场球馆:</span>
                           <span className="team-info-item-text">{teamDetail?.homeArena}</span>
                        </div>
                        <div className="team-info-item">
                           <span className="team-info-item-label">所在城市:</span>
                           <span className="team-info-item-text">{teamDetail?.city}</span>
                        </div>
                        <div className="team-info-item">
                           <span className="team-info-item-label">所在分区:</span>
                           <span className="team-info-item-text">
                              {ParttitionEnum[teamDetail?.partition as keyof typeof ParttitionEnum]}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="team-player-table">
                  <HeadFilter onCreate={onCreateClick} />
                  <Table
                     style={{ width: "100%" }}
                     {...tableProps}
                     columns={columns as any}
                     rowKey="id"
                  />
               </div>
            </div>
         </Form>
         <Modal title="Create player" open={createModal} onCancel={onClose} onOk={onCreate}>
            <Form form={createForm} className="create-form">
               <Form.Item
                  name="name"
                  label="姓名"
                  rules={[{ required: true, message: "请输入姓名" }]}
               >
                  <Input placeholder="请输入" style={{ width: 200 }} />
               </Form.Item>
               <Form.Item
                  name="position"
                  label="位置"
                  rules={[{ required: true, message: "请至少选择一个位置" }]}
               >
                  <Select options={POSITION_DATASOURCE} mode="tags" style={{ width: 200 }} />
               </Form.Item>
               <Form.Item
                  name="number"
                  label="号码"
                  rules={[{ required: true, message: "请输入号码" }]}
               >
                  <InputNumber min={0} />
               </Form.Item>
               <Form.Item name="age" label="年龄">
                  <InputNumber min={1} />
               </Form.Item>
               <Form.Item name="capability" label="能力值">
                  <InputNumber min={1} />
               </Form.Item>
               <Form.Item name="descript" label="介绍">
                  <Input.TextArea rows={4} />
               </Form.Item>
            </Form>
         </Modal>
      </Spin>
   );
}

export default TeamDetail;
