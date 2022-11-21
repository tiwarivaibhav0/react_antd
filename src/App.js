import { Table } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <a>Delete</a>,
  },
];

const App = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        let temp = [];
        data.map((item, index) => {
          let row = {
            key: item.id,
            name: item.name,
            phone: item.phone,
            address: item.address.city,
          };
          temp.push(row);
        });
        setData(temp);
      });
  }, []);
  return (
    <Table
      rowSelection={true}
      columns={columns}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (event.target.tagName === "A") {
              data.splice(rowIndex, 1);
              setData([...data]);
            }
          }, 
        };
      }}
    
      dataSource={data}
    />
  );
};
export default App;
