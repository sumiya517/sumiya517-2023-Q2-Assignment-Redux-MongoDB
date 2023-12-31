import React from "react";
import "../styles/dashboard.css";
import { Row, Col, Card } from "antd";
import SalesChart from "../components/salesChart";
import CustomerCharts from "../components/customerChart";
import ActivityChart from "../components/activityChart";
import CategoriesChart from "../components/categoriesChart";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Overview</h2>

      <Row gutter={16}>
        <Col span={16}>
          <Card title="Activity">
            <ActivityChart />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Total Users">
            <CustomerCharts />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Total Categories">
            <CategoriesChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Sales Chart">
            <SalesChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
