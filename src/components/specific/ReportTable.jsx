import React from "react";
import { Button, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const ReportTable = ({ data }) => {
  const columns = [
    { key: "id", title: "ID", dataIndex: "_id" },
    { key: "user", title: "User", dataIndex: "user" },
    { key: "appVersion", title: "AppVersion", dataIndex: "appVer" },
    {
      key: "action",
      title: "Action",
      dataIndex: "action",
      width: 240,
      render: (text, record) => {
        return (
          <div>
            <Button onClick={() => onDownload(record)}>
              Download
              <DownloadOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const onView = () => {};

  const onDownload = async (record) => {
    const factoryData = factoryStep(record?.steps);
    const blob = new Blob([factoryData], { type: "text/plain" });
    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = "record.txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  };

  return <Table dataSource={data} columns={columns} />;
};

const factoryStep = (steps) => {
  let result = ``;

  steps?.forEach?.((step, index) => {
    const { action, id, extra } = step || {};
    switch (action) {
      case "click":
        result += `MobileElement el${index + 1} = driver.findElementByAccessibilityId("${id}");el${index + 1}.${action}();\n`;
        break;
      case "input":
        result += `MobileElement el${index + 1} = driver.findElementByAccessibilityId("${id}");el${index + 1}.sendKeys("${extra?.inputValue}");\n`;
        break;
      case "scroll":
        result += `MobileElement el${index + 1} = driver.findElementByAccessibilityId("${id}");el${index + 1}.scroll(${extra?.scrollDirection});\n`;
        break;
      default:
        result += `MobileElement el${index + 1} = driver.findElementByAccessibilityId("${id}");el${index + 1}.${action}();\n`;
        break;
    }
  });

  return result;
};

export default ReportTable;
