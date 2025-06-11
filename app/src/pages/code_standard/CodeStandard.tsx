import { Button, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { get } from "../../func/crud_request";

interface IOption {
  value: string;
  label: string;
}

interface IViolationType {
  violationId: string;
  description: string;
}
export const CodeStandard = () => {
  const [standardOptions, setStandardOptions] = useState<IOption[]>([]);
  const [currentStandard, setCurrentStandard] = useState<string>("");
  const [violationTypes, setViolationTypes] = useState<IViolationType[]>([]);
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
  useEffect(() => {
    async function getAllCodeStandard() {
      const allStandard = await get("code_standard/get_all_code_standard");
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
    async function getViolationStandard() {
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
    }
    getViolationStandard();
  }, [currentStandard]);

  return (
    <div className="w-full h-full bg-white px-12 pt-12">
      <div className="flex justify-between">
        <Select
          placeholder="Choose code standard"
          style={{ width: 200 }}
          options={standardOptions}
          onChange={(value) => {
            setCurrentStandard(value);
          }}
        />
        <Button type="primary">Add new violation type</Button>
        <Modal></Modal>
      </div>
      <div>
        <Table bordered dataSource={violationTypes} columns={columns} />
      </div>
    </div>
  );
};
