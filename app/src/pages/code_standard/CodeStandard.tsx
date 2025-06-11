/* eslint-disable react-hooks/exhaustive-deps */
import { App, Button, Form, Input, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { get, post } from "../../func/crud_request";

interface IOption {
  value: string;
  label: string;
}

interface IViolationType {
  violationId: string;
  description: string;
}
export const CodeStandard = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [standardOptions, setStandardOptions] = useState<IOption[]>([]);
  const [currentStandard, setCurrentStandard] = useState<string>("");
  const [violationTypes, setViolationTypes] = useState<IViolationType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const columns = [
    {
      title: "Violation Id",
      dataIndex: "violationId",
      key: "violationId",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const handleSubmit = async (values: any) => {
    const dataToSend = [
      {
        code_standard: currentStandard,
        violation_name: values.violation_id,
        violation_id: values.violation_id,
        description: values.description,
      },
    ];
    try {
      const result = await post(
        "code_standard/add_new_violation_types",
        dataToSend
      );
      if (result) {
        message.success("Add new violation type successfully!");
        getViolationStandard();
      }
    } catch (error) {
      console.log(error);
    }
    form.resetFields();
    setIsModalOpen(false);
  };
  const getViolationStandard = async () => {
    if (currentStandard) {
      const result = await get(
        `code_standard/get_all_violation_type/${currentStandard}`
      );
      if (Array.isArray(result)) {
        const newViolationTypeList = result.map((item) => {
          return {
            violationId: item.violation_id,
            description: item.description,
          };
        });
        setViolationTypes((prev) => {
          return newViolationTypeList;
        });
      }
    }
  };

  useEffect(() => {
    async function getAllCodeStandard() {
      const allStandard = [
        { standard_name: "CERT" },
        { standard_name: "MISRA" },
      ];
      if (Array.isArray(allStandard)) {
        const listOption = allStandard.map((item) => {
          return {
            value: item?.standard_name,
            label: item?.standard_name,
          };
        });
        setStandardOptions((prevState) => {
          return listOption;
        });
      }
    }
    getAllCodeStandard();
  }, []);

  useEffect(() => {
    getViolationStandard();
  }, [currentStandard]);

  return (
    <div className="w-full h-full bg-white px-12 pt-12">
      <div className="flex justify-between mb-3">
        <Select
          placeholder="Choose code standard"
          style={{ width: 200 }}
          options={standardOptions}
          onChange={(value) => {
            setCurrentStandard(value);
          }}
        />
        <Button
          type="primary"
          disabled={currentStandard === ""}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add new violation type
        </Button>
        <Modal
          open={isModalOpen}
          style={{ minWidth: "500px" }}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          footer={[]}
        >
          <Form form={form} className="px-4 py-4" onFinish={handleSubmit}>
            <Form.Item vertical label="Code standard">
              <Input value={currentStandard} disabled />
            </Form.Item>
            <Form.Item
              name="violation_id"
              label="Violation Id"
              rules={[
                { required: true, message: "Please input your violation id!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={null} className="flex justify-end">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div>
        <Table bordered dataSource={violationTypes} columns={columns} />
      </div>
    </div>
  );
};
