import React from "react";
import { Table } from "antd";
import SelectData from "./constants";
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    render: (id) => {
      return <span className="number">{id}</span>;
    },
  },
  {
    title: "提问者",
    dataIndex: "questionInputer",
    key: "questionInputer",
    render: (questionInputer) => {
      return <span className="questionInputer">{questionInputer}</span>;
    },
  },
  {
    title: "他的问题",
    dataIndex: "question",
    key: "question",
    render: (question) => {
      return <span className="question">{question}</span>;
    },
  },
  {
    title: "提问时间",
    dataIndex: "questionTime",
    key: "questionTime",
    render: (questionTime) => (
      <span className="questionTime">{questionTime}</span>
    ),
  },
  {
    title: "问题类型",
    dataIndex: "questionType",
    key: "questionType",
    render: (questionType) => (
      <span className="questionType">
        {SelectData["questionType"][questionType]}
      </span>
    ),
  },
  {
    title: "问题状态",
    dataIndex: "questionState",
    key: "questionState",
    render: (questionState) => (
      <span
        className={`questionState ${SelectData["className"][questionState]}`}
      >
        {SelectData["questionState"][questionState]}
      </span>
    ),
  },
  {
    title: "操作",
    dataIndex: "",
    key: "",
    render: (name, record) => {
      return (
        <span className="button">
          {record.questionState === 2 ? "查看" : "回答"}
        </span>
      );
    },
  },
];
export default function BYTable(props) {
  return (
    <div>
      <Table
        dataSource={props.data}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}
