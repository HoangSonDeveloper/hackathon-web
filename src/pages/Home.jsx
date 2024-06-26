import React, { useEffect, useMemo, useState } from "react";
import { Col, Input, Modal, Row, Typography } from "antd";
import { archiveTracking, getTrackings } from "../services/trackingService";
import ReportTable from "../components/specific/ReportTable";
import _ from "lodash";
import ReactJson from "react-json-view";

const { Text } = Typography;

const Home = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    getTrackingFiles(searchTerm);
  }, [searchTerm]);

  const getTrackingFiles = async (user) => {
    const res = await getTrackings(user);
    setFiles(res);
  };

  const onSearch = useMemo(
    () =>
      _.debounce((e) => {
        const { value } = e.target;
        setSearchTerm(value);
      }, 500),
    [],
  );

  const onView = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const onArchive = async (record) => {
    const res = await archiveTracking(record?._id);
    getTrackingFiles(searchTerm);
  };

  return (
    <Col
      style={{
        padding: 16,
        background: "#f2f2f6",
        height: "100vh",
      }}
    >
      <Row
        style={{
          padding: 12,
          background: "white",
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Tìm kiếm theo user
        </Text>
        <Input
          style={{ height: 40 }}
          placeholder={"Tìm kiếm"}
          onChange={onSearch}
        />
      </Row>
      <ReportTable onArchive={onArchive} onView={onView} data={files} />
      <Modal onCancel={() => setOpen(false)} open={open}>
        <ReactJson src={selectedItem} />
      </Modal>
    </Col>
  );
};

export default Home;
