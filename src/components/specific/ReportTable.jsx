import React from "react";
import { Button, Image, Row, Table } from "antd";
import {
  AndroidOutlined,
  AppleOutlined,
  DownloadOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const padding = (num) => {
  return num < 10 ? `0${num}` : num;
};

const ReportTable = ({ data, onView, onArchive }) => {
  const columns = [
    { key: "id", title: "ID", dataIndex: "_id", width: 240 },
    {
      key: "user",
      title: "AgentID",
      dataIndex: "user",
      width: 160,
    },
    { key: "appVersion", title: "AppVersion", dataIndex: "appVer", width: 120 },
    { key: "appCode", title: "AppCode", dataIndex: "appCode", width: 120 },
    {
      key: "deviceName",
      title: "DeviceName",
      dataIndex: "deviceName",
      width: 160,
    },
    {
      key: "versionOS",
      title: "VersionOS",
      dataIndex: "versionOS",
      width: 120,
    },
    {
      key: "platform",
      title: "Platform",
      dataIndex: "platform",
      align: "center",
      width: 120,
      render: (text) => {
        return (
          <Row style={{ alignItems: "center", justifyContent: "center" }}>
            {text === "ios" ? (
              <AppleOutlined style={{ fontSize: 24 }} />
            ) : (
              <AndroidOutlined style={{ fontSize: 24 }} />
            )}
          </Row>
        );
      },
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      width: 400,
    },
    {
      key: "createdAt",
      title: "CreatedAt",
      dataIndex: "createdAt",
      width: 280,
      render: (text) => {
        const date = new Date(text);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();
        return (
          // <p>{`${padding(hour)}:${padding(minute)} - ${padding(day)}/${padding(month)}/${year}`}</p>
          <p></p>
        );
      },
    },
    {
      key: "action",
      title: "Actions",
      dataIndex: "action",
      width: 360,
      fixed: "right",
      render: (text, record) => {
        console.log(record);
        return (
          <div>
            <Button
              style={{ marginRight: 8 }}
              type={"primary"}
              onClick={() => onView(record?.steps)}
            >
              View
            </Button>
            <Button
              style={{ marginRight: 8 }}
              onClick={() => onDownload(record)}
            >
              Download
              <DownloadOutlined />
            </Button>
            <Button onClick={() => onArchive(record)}>
              Archive
              <InboxOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

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

  return (
    <Table
      showSorterTooltip={{ target: "sorter-icon" }}
      scroll={{ x: 1500 }}
      dataSource={data}
      columns={columns}
    />
  );
};

const factoryStep = (steps) => {
  let result = ``;

  steps?.forEach?.((step, index) => {
    const { action, id, extra } = step || {};
    switch (action) {
      case "click":
        result += `MobileElement el${index + 1} = driver.findElementByAccessibilityId("${id}");el${index + 1}.${action}();\n`;
        break;
      case "typing":
        result += `MobileElement el${index + 1} = driver.findElementByAccessibilityId("${id}");el${index + 1}.sendKeys("${extra?.inputValue}");\n`;
        break;
      case "scroll":
        result += `MobileElement el${index + 1} = (MobileElement) driver.findElementByAccessibilityId("${id}");el${index + 1}.scroll(${extra?.scroll?.direction});percent(${extra?.scroll?.percent?.toString()});\n`;
        break;
      default:
        result += `MobileElement el${index + 1} = driver.findElementByAccessibilityId("${id}");el${index + 1}.${action}();\n`;
        break;
    }
  });

  return result;
};

export default ReportTable;
