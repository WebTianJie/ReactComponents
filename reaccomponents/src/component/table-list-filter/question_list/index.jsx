import React, { useState, useEffect, useCallback } from "react";
import { getAllQuestionsList } from "../../service/service.js";
import { DatePicker, Pagination } from "antd";
import "./style.css";
import "antd/lib/time-picker/style/css";
import "antd/lib/table/style/css";
import BYTable from "./table";
import SelectData from "./constants";
const { RangePicker } = DatePicker;

const filter = [
  {
    label: "提问者",
    type: "input",
    dataIndex: "questionInputer",
  },
  {
    label: "问题类型",
    type: "select",
    dataIndex: "questionType",
  },
  {
    label: "问题状态",
    type: "select",
    dataIndex: "questionState",
  },
  {
    label: "提问时间",
    type: "data-range",
    dataIndex: "questionTime",
  },
];

function renderFilter(onChange, props) {
  return filter.map(function (item, index) {
    if (item.type === "input") {
      return (
        <div className="filter-item" key={item.dataIndex}>
          <label>{item.label}</label>
          <input
            type="text"
            name={item.dataIndex}
            value={props.keyWords}
            onChange={(e) => onChange(e)}
          />
        </div>
      );
    } else if (item.type === "select") {
      return (
        <div className="filter-item" key={item.dataIndex}>
          <label>{item.label}</label>
          <select
            value={props[item.dataIndex]}
            onChange={(e) => onChange(e)}
            name={item.dataIndex}
          >
            {renderOptions(item.dataIndex)}
          </select>
        </div>
      );
    } else if (item.type === "data-range") {
      return (
        <div className="filter-item dataRange" key={item.dataIndex}>
          <label>{item.label}</label>
          <RangePicker
            value={props[item.dataIndex]}
            onChange={(moment, dateString) => onChange(moment, dateString)}
            getCalendarContainer={function (ele) {
              console.log("ele", ele);
            }}
          />
        </div>
      );
    }
    return <></>;
  });
}
function renderOptions(prop) {
  if (!prop) return;
  const options = [];
  const data = SelectData[prop];
  for (let item in data) {
    if (data.hasOwnProperty(item)) {
      options.push(
        <option value={item} key={item}>
          {data[item]}
        </option>
      );
    }
  }
  return options;
}
export default function QuestionsList() {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [count, setCount] = useState(0);
  const [keyWords, setkeyWords] = useState("");
  const [questionType, setQuestionType] = useState(0);
  const [questionState, setQuestionState] = useState(0);
  const [questionTime, setQuestionTime] = useState(["", ""]);
  const filterList = {
    questionInputer: setkeyWords,
    questionType: setQuestionType,
    questionState: setQuestionState,
  };
  useEffect(() => {
    (async function () {
      const quetion_list = await getAllQuestionsList({
        pageNum,
        pageSize,
        keyWords,
        questionType,
        questionState,
        questionTime,
      });
      setData(quetion_list.data);
      setCount(quetion_list.count);
    })();
  }, [pageNum, pageSize, keyWords, questionType, questionState, questionTime]);
  const onChange = useCallback(
    (e, dateString) => {
      if (typeof dateString === "object") {
        setQuestionTime(e);
      } else {
        e.persist();
        const { name, value } = e.target;
        filterList[name](value);
      }
    },
    [filterList]
  );
  const onPageNumChange = useCallback((e) => {
    setPageNum(e);
  }, []);
  const onPageSizeChange = useCallback((current, size) => {
    setPageSize(size);
  }, []);
  const handleClick = useCallback(() => {
    setPageNum(1);
    setPageSize(5);
    setkeyWords("");
    setQuestionState(0);
    setQuestionType(0);
    setQuestionTime(["", ""]);
  }, []);
  return (
    <div className="answer-wrap">
      <h2>回答问题列表</h2>
      <div className="filter">
        {renderFilter(onChange, {
          keyWords,
          questionType,
          questionState,
          questionTime,
        })}
        <button
          onClick={(e) => {
            handleClick();
          }}
        >
          重置
        </button>
      </div>
      <div className="table-wrap">
        <BYTable data={data} />
      </div>
      <div className="page-select">
        <Pagination
          showQuickJumper
          defaultCurrent={pageNum}
          defaultPageSize={pageSize}
          hideOnSinglePage={true}
          current={pageNum}
          pageSize={pageSize}
          showSizeChanger={true}
          pageSizeOptions={["5", "10", "20"]}
          total={count}
          onChange={(e) => {
            onPageNumChange(e);
          }}
          onShowSizeChange={(current, size) => {
            onPageSizeChange(current, size);
          }}
        />
      </div>
    </div>
  );
}
