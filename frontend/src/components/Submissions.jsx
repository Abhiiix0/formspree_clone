import { Checkbox, Modal, Table, Button } from "antd";
import React, { useState } from "react";

const Submissions = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [columnModalVisible, setColumnModalVisible] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState([
    "index",
    "Date",
    "name",
    "email",
    "message",
    "select",
  ]);

  // Dummy data for the table
  const data = [
    {
      key: "1",
      Date: "2024-11-26",
      name: "John Doe",
      email: "johndoe@example.com",
      message: "This is a sample message from John.",
      gender: "Male",
    },
    // ... Add more data objects
  ];

  // Extract unique fields dynamically from data
  const availableFields = Object.keys(data[0] || {}).filter(
    (key) => key !== "key" && key !== "Date"
  );

  const columns = [
    {
      title: "Index",
      render: (text, record, index) => index + 1,
      width: 80,
      key: "index",
      fixed: true,
    },
    {
      title: "Date", // Always visible column
      dataIndex: "Date",
      key: "Date",
      ellipsis: true,
      width: 150, // Optional, adjust width as needed
    },
    ...availableFields
      .filter((field) => field !== "Date" && visibleColumns.includes(field)) // Exclude 'Date' from dynamic fields
      .map((field) => ({
        title: field.charAt(0).toUpperCase() + field.slice(1),
        dataIndex: field,
        key: field,
        ellipsis: true,
      })),
    {
      render: (text, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.key)}
          onChange={() => handleSelectChange(record.key)}
        />
      ),
      width: 50,
      key: "select",
      fixed: true,
    },
  ];

  const handleSelectChange = (key) => {
    const newSelectedRowKeys = [...selectedRowKeys];
    const index = newSelectedRowKeys.indexOf(key);
    if (index >= 0) {
      newSelectedRowKeys.splice(index, 1); // Remove if already selected
    } else {
      newSelectedRowKeys.push(key); // Add if not selected
    }
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleRowClick = (record, e) => {
    if (e.target.type !== "checkbox") {
      setSelectedData(record);
      setIsModalVisible(true);
    }
  };

  const handleColumnVisibilityChange = (field) => {
    const updatedColumns = [...visibleColumns];
    if (updatedColumns.includes(field)) {
      updatedColumns.splice(updatedColumns.indexOf(field), 1);
    } else {
      updatedColumns.push(field);
    }
    setVisibleColumns(updatedColumns);
  };

  return (
    <div className=" ">
      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="py-2 w-full rounded-md border outline-none px-3"
          placeholder="Search Submissions..."
        />
      </div>

      {/* Settings Button */}
      <div className="mb-3 flex justify-end">
        <button
          className=" border py-2 px-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
          onClick={() => setColumnModalVisible(true)}
        >
          Columns Settings
        </button>
      </div>

      {/* Table */}
      <div
        style={{ width: "100%" }}
        className=" overflow-hidden  min-h-[400px] md:h-full"
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          bordered
          rowKey="key"
          onRow={(record) => ({
            onClick: (e) => handleRowClick(record, e),
          })}
          // scroll={{ x: "max-content" }}
        />
      </div>

      {/* Row Detail Modal */}
      {selectedData && (
        <Modal
          title="Submission Details"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          // className=" "
          // width="100%"
        >
          <div>
            {Object.entries(selectedData).map(([key, value]) => (
              <div key={key}>
                <h3 className=" font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </h3>
                <p className=" text-gray-500">{value}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Column Settings Modal */}
      <Modal
        title="Manage Columns"
        open={columnModalVisible}
        onCancel={() => setColumnModalVisible(false)}
        footer={null}
      >
        {availableFields.map((field) => (
          <Checkbox
            key={field}
            checked={visibleColumns.includes(field)}
            onChange={() => handleColumnVisibilityChange(field)}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </Checkbox>
        ))}
      </Modal>
    </div>
  );
};

export default Submissions;
