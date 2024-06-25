import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { getTrackings } from "../services/trackingService";
import ReportTable from "../components/specific/ReportTable";

const Home = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    getTrackingFiles();
  }, []);
  const getTrackingFiles = async () => {
    const res = await getTrackings();
    setFiles(res);
  };
  return (
    <Col
      style={{
        padding: 16,
      }}
    >
      <ReportTable data={files} />
    </Col>
  );
};

export default Home;
