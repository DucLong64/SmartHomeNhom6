import { Row, Col } from 'antd';
import React from 'react';
import ProfileCard from "./ProfileCard";
import "./Profiles.scss";

function Profiles() {
  const profiles = [
    {
      id: 1,
      name: "Lê Đức Long",
      className: "D21CNPM01",
      studentId: "B21DCCN494",
      avatarUrl: "https://i.pinimg.com/originals/a4/ec/25/a4ec2589b6ec9b0883d3f84678890de2.jpg",
      coverUrl: "https://cdn.sgtiepthi.vn/wp-content/uploads/2022/08/295668626_2343891112417305_8394540339713625809_n.jpg",
      githubUrl: "https://github.com/Cmloopy?tab=repositories",
    },
    {
      id: 2,
      name: "Vũ Huy Hoàng",
      className: "D21CNPM1",
      studentId: "B21DCCN398",
      avatarUrl: "https://i.pinimg.com/564x/f1/43/64/f1436415a2a208043bdef80c73d66b4a.jpg",
      coverUrl: "https://cdn2.fptshop.com.vn/unsafe/800x0/anh_bia_dep_16_27665fd2c6.jpg",
      githubUrl: "https://github.com/vuhuyhoang12abm",
    },
    {
      id: 3,
      name: "Nguyễn Quang Minh",
      className: "D21CNPM01",
      studentId: "B21DCCN319",
      avatarUrl: "https://i.ytimg.com/vi/2pcki4UiUDQ/hqdefault.jpg",
      coverUrl: "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473615Pmt/image-200-anh-hoang-hon-dep-buon-co-don-lang-man-cuc-chill-167642975045324.jpg",
      githubUrl: "https://github.com/HaiNguyen1910CN  ",
    },
    {
      id: 4,
      name: "Lê Minh Quang",
      className: "D21CNPM01",
      studentId: "B21DCCN032",
      avatarUrl: "https://i.pinimg.com/736x/94/9b/14/949b14e1393dc760351a4ab04a6c88cd.jpg",
      coverUrl: "https://inkythuatso.com/uploads/thumbnails/800/2022/04/anh-bia-thien-nhien-12-08-28-31.jpg",
      githubUrl: "https://github.com/HaiNguyen1910CN  ",
    },
  ];

  return (
    <div className="profiles-container">
      <Row gutter={16}>
        {profiles.map(profile => (
          <Col span={8} key={profile.id}>
            <ProfileCard
              name={profile.name}
              className={profile.className}
              studentId={profile.studentId}
              avatarUrl={profile.avatarUrl}
              coverUrl={profile.coverUrl}
              githubUrl={profile.githubUrl}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Profiles;
