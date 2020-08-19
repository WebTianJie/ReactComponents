import React, { useState, useCallback, useMemo } from "react";

export default function From() {
  const allHoppy = ["电影", "游戏", "看书", "步行", "游泳", "搏击"];
  const radioBox = [
    { value: "0", text: "女" },
    { value: "1", text: "男" },
  ];
  const [name, setName] = useState("");
  const [sex, setSex] = useState(0);
  const [hoppy, setHoppy] = useState([]);
  const [address, setAddress] = useState("");
  const changeObj = {
    name: setName,
    hoppy: setHoppy,
    address: setAddress,
    sex: setSex,
  };
  const onChange = useCallback(
    (e) => {
      const { name, value, checked } = e.target;
      if (name === "hoppy") {
        if (checked) {
          let newHoppy = [...hoppy, value];
          setHoppy(newHoppy);
        } else {
          let newHoppy = hoppy.filter((item) => item !== value);
          setHoppy(newHoppy);
        }
      } else {
        changeObj[name](value);
      }
    },
    [name, sex, address, hoppy]
  );
  const checkBoxGroup = useMemo(() => {
    return () => {
      return allHoppy.map((item) => (
        <span key={item}>
          <input
            type="checkbox"
            value={item}
            name="hoppy"
            checked={hoppy.includes(item)}
            onChange={(e) => {
              onChange(e);
            }}
          />
          {item}
        </span>
      ));
    };
  }, [hoppy]);
  const radioBoxGroup = useMemo(() => {
    return () => {
      return radioBox.map((item) => (
        <span key={item.value}>
          <input
            type="radio"
            value={item.value}
            name="sex"
            checked={item.value === sex}
            onChange={(e) => {
              onChange(e);
            }}
          />
          {item.text}
        </span>
      ));
    };
  }, [sex]);
  return (
    <div className="form">
      <div className="form-item">
        <label>姓名:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>
      <div className="form-item">
        <label>性别:</label>
        {radioBoxGroup()}
      </div>
      <div className="form-item">
        <label>爱好:</label>
        {checkBoxGroup()}
      </div>
      <div className="form-item">
        <label>地址:</label>
        <select
          type="select"
          name="address"
          value={address}
          onChange={(e) => {
            onChange(e);
          }}
        >
          <option value="北京">北京</option>
          <option value="上海">上海</option>
          <option value="广州">广州</option>
          <option value="河南">河南</option>
        </select>
      </div>
    </div>
  );
}
