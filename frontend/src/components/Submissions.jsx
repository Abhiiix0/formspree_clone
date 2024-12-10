import { Checkbox, Modal, Table, Button } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { getFormSUbmissions } from "../Service/Api";
import { useAppContext } from "../context/AppContext";

const Submissions = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [columnModalVisible, setColumnModalVisible] = useState(false);
  const { selectedForm } = useAppContext();
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const exportToExcel = (jsonData) => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Export workbook to Excel file
    XLSX.writeFile(workbook, "exported_data.xlsx");
  };
  const availableFields = formSubmissions.length
    ? Array.from(
        new Set(
          formSubmissions.flatMap((submission) =>
            Object.keys(submission).filter(
              (key) => key !== "key" && key !== "submittedAt" && key !== "date"
            )
          )
        )
      )
    : [];

  const columns = [
    {
      title: "Index",
      render: (text, record, index) => index + 1,
      width: 80,
      key: "index",
      fixed: true,
    },
    {
      title: "Date",
      dataIndex: "submittedAt",
      key: "submittedAt",
      ellipsis: true,
      width: 150,
      render: (date) => {
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(date));
        return formattedDate; // e.g., "12 Nov 2024"
      },
    },
    ...availableFields
      .filter((field) => field !== "Date" && visibleColumns.includes(field))
      .map((field) => ({
        title: field.charAt(0).toUpperCase() + field.slice(1),
        dataIndex: field,
        key: field,
        ellipsis: true,
      })),
    // {
    //   render: (text, record) => (
    //     <Checkbox
    //       checked={selectedRowKeys.includes(record.key)}
    //       onChange={() => handleSelectChange(record.key)}
    //     />
    //   ),
    //   width: 50,
    //   key: "select",
    //   fixed: true,
    // },
  ];

  const handleSelectChange = (key) => {
    const newSelectedRowKeys = [...selectedRowKeys];
    const index = newSelectedRowKeys.indexOf(key);
    if (index >= 0) {
      newSelectedRowKeys.splice(index, 1);
    } else {
      newSelectedRowKeys.push(key);
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

  const fetchFormSubmissions = async () => {
    try {
      const payload = { formId: selectedForm?.formId };
      const res = await getFormSUbmissions(payload);
      const result = await res.json();

      setFormSubmissions([...result?.data]);
    } catch (error) {
      toast.error(error?.message || error);
    }
  };

  useEffect(() => {
    fetchFormSubmissions();
  }, []);

  return (
    <div>
      <div className="mb-3 flex gap-2 justify-end">
        <button
          className="border py-2 px-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
          onClick={() => setColumnModalVisible(true)}
        >
          Columns Settings
        </button>
        <button
          className="border py-2 px-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
          onClick={() => exportToExcel(formSubmissions)}
        >
          Export Data
        </button>
      </div>

      <div className="overflow-hidden min-h-[400px] md:h-full">
        <Table
          size="small"
          columns={columns}
          dataSource={formSubmissions}
          pagination={{ pageSize: 10 }}
          bordered
          rowKey="key"
          onRow={(record) => ({
            onClick: (e) => handleRowClick(record, e),
          })}
        />
      </div>

      {selectedData && (
        <Modal
          title="Submission Details"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <div>
            {Object.entries(selectedData)
              .filter(([key]) => !["index", "id"].includes(key)) // Exclude these fields
              .map(([key, value]) => (
                <div key={key}>
                  <h3 className="font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </h3>
                  <p className="text-gray-500">{value}</p>
                </div>
              ))}
          </div>
        </Modal>
      )}

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
