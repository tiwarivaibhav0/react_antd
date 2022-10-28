import { Table } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState();
  const deleteHandler = (event,record) => {
    event.preventDefault();
    console.log(event,record);
    setData(data.filter(item=>item.key!==record.key))
    // data.splice(record, 1);
    // setData([...data]);
  };
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
      render: (text,record) => <a onClick={(event) => deleteHandler(event,record)}>Delete</a>,
    },
  ];

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
            description: item.email,
          };
          temp.push(row);
        });
        setData(temp);
      });
  }, []);
  return (
    <Table
      columns={columns}
      
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.description}
          </p>
        ),
      }}
      dataSource={data}
    />
  );
};
export default App;
