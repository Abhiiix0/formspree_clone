import { Checkbox, Modal, Table } from "antd";
import React, { useState } from "react";

const Submissions = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const columns = [
    {
      title: "Index",
      render: (text, record, index) => index + 1, // Display index (row number)
      width: 80,
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true, // Enable ellipsis for long text
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true, // Enable ellipsis for long text
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      ellipsis: true, // Enable ellipsis for long text
    },
    {
      render: (text, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.key)}
          onChange={() => handleSelectChange(record.key)}
        />
      ),
      width: 50, // Only width required for the checkbox
      key: "select",
    },
  ];

  // Dummy data for the table
  const data = [
    {
      key: "1",
      name: "John Doe",
      email: "johndoe@example.com",
      message: "This is a sample message from John.",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "janesmith@example.com",
      message: "Hi, I have a query regarding your services.",
    },
    {
      key: "3",
      name: "Michael Brown",
      email: "michaelbrown@example.com",
      message: "Can you please provide more details?",
    },
    {
      key: "4",
      name: "Emily Johnson",
      email: "emilyjohnson@example.com",
      message: "I am interested in your product.",
    },
    {
      key: "5",
      name: "Chris Davis",
      email: "chrisdavis@example.com",
      message: "Need support for an issue.",
    },
    {
      key: "6",
      name: "Sarah Wilson",
      email: "sarahwilson@example.com",
      message: "When is the next update coming?",
    },
    {
      key: "7",
      name: "David Martinez",
      email: "davidmartinez@example.com",
      message: "Thanks for the quick response!",
    },
    {
      key: "8",
      name: "Jessica Garcia",
      email: "jessicagarcia@example.com",
      message: "How do I access my account?",
    },
    {
      key: "9",
      name: "Daniel Taylor",
      email: "danieltaylor@example.com",
      message: "I am having trouble with the login.",
    },
    {
      key: "10",
      name: "Lisa White",
      email: "lisawhite@example.com",
      message: "Great service, thank you!",
    },
    {
      key: "11",
      name: "Matthew Harris",
      email: "matthewharris@example.com",
      message: "Looking forward to your reply.",
    },
    {
      key: "12",
      name: "Olivia Clark",
      email: "oliviaclark@example.com",
      message: "Please update me on the status.",
    },
    {
      key: "13",
      name: "James Lewis",
      email: "jameslewis@example.com",
      message: "I found an issue with your app.",
    },
    {
      key: "14",
      name: "Sophia Robinson",
      email: "sophiarobinson@example.com",
      message: "Thanks for the information!",
    },
    {
      key: "15",
      name: "Benjamin Walker",
      email: "benjaminwalker@example.com",
      message: "How can I reset my password?",
    },
    {
      key: "16",
      name: "Mia Hall",
      email: "miahall@example.com",
      message: "Can you share the pricing details?",
    },
    {
      key: "17",
      name: "Ethan Young",
      email: "ethanyoung@example.com",
      message: "What are the features of the new update?",
    },
    {
      key: "18",
      name: "Isabella King",
      email: "isabellaking@example.com",
      message: "Is there a trial version available?",
    },
    {
      key: "19",
      name: "Alexander Wright",
      email: "alexanderwright@example.com",
      message: "I am facing issues with the payment process.",
    },
    {
      key: "20",
      name: "Ava Green",
      email: "avagreen@example.com",
      message: "Please send me the documentation.",
    },
  ];
  // Handle row selection
  const handleSelectChange = (key) => {
    const newSelectedRowKeys = [...selectedRowKeys];
    const index = newSelectedRowKeys.indexOf(key);
    if (index >= 0) {
      newSelectedRowKeys.splice(index, 1); // Remove the key if already selected
    } else {
      newSelectedRowKeys.push(key); // Add the key if not selected
    }
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Handle row click to open modal
  const handleRowClick = (record, e) => {
    if (e.target.type !== "checkbox") {
      setSelectedData(record);
      setIsModalVisible(true); // Show modal with the clicked row data
    }
  };
  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          className="py-2 w-full rounded-md border outline-none px-3"
          placeholder="Search Submissions..."
        />
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          bordered
          rowKey="key"
          onRow={(record) => ({
            onClick: (e) => handleRowClick(record, e), // Handle row click
          })}
        />
      </div>

      {/* Modal to show detailed data */}
      {selectedData && (
        <Modal
          title="Submission Details"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <div>
            <h3>Name:</h3>
            <p>{selectedData.name}</p>
            <h3>Email:</h3>
            <p>{selectedData.email}</p>
            <h3>Message:</h3>
            <p>{selectedData.message}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Submissions;
