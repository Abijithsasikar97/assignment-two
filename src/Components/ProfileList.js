import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { Card } from "antd";
import {
  EditOutlined,
  DeleteFilled,
  HeartOutlined,
  HeartFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import EditModal from "./EditModal";

const contentWrapperStyle = {
  display: "flex",
};

const paragraphStyle = {
  marginLeft: "10px",
};

const ProfileList = ({ userDetails, onDelete }) => {
  const [favoriteUser, setFavoriteUser] = useState([]);
  const editInitialState = {
    isOpenModal: false,
    editData: {},
  };
  const [editUser, setEditUser] = useState(editInitialState);

  const addFavorite = (id) => {
    if (favoriteUser.includes(id)) {
      setFavoriteUser([...favoriteUser.filter((item) => item !== id)]);
    } else {
      favoriteUser.push(id);
      setFavoriteUser([...favoriteUser]);
    }
  };

  const openEditModal = (data) => {
    editUser.isOpenModal = true;
    editUser.editData = data;
    setEditUser({ ...editUser });
  };

  const closeModal = () => {
    setEditUser(editInitialState);
  };

  return (
    <>
      <Row>
        {userDetails.map((user) => (
          <Col key={user?.id} flex="1 0 25%" xs={24} xl={6}>
            <Card
              style={{ margin: 15 }}
              cover={
                <div className="cardHeadImage">
                  <img
                    alt={user?.username}
                    src={`https://avatars.dicebear.com/v2/avataaars/${user?.username}.svg?options[mood][]=happy`}
                  />
                </div>
              }
              actions={[
                favoriteUser.includes(user?.id) ? (
                  <HeartFilled
                    style={{ color: "red" }}
                    key="heart"
                    onClick={() => addFavorite(user?.id)}
                  />
                ) : (
                  <HeartOutlined
                    style={{ color: "red" }}
                    key="heart"
                    onClick={() => addFavorite(user?.id)}
                  />
                ),
                <EditOutlined key="edit" onClick={() => openEditModal(user)} />,
                <DeleteFilled
                  key="delete"
                  onClick={() => onDelete(user?.id)}
                />,
              ]}
            >
              <h3>{user?.username}</h3>
              <div style={contentWrapperStyle}>
                <MailOutlined size="18" key="mail" />{" "}
                <p style={paragraphStyle}>{user?.email}</p>
              </div>
              <div style={contentWrapperStyle}>
                <PhoneOutlined size="18" key="phone" />{" "}
                <p style={paragraphStyle}>{user?.phone}</p>
              </div>
              <div style={contentWrapperStyle}>
                <GlobalOutlined size="18" key="phone" />{" "}
                <p style={paragraphStyle}>{user?.website}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      {editUser.isOpenModal ? (
        <EditModal
          open={editUser.isOpenModal}
          close={closeModal}
          editData={editUser.editData}
        />
      ) : null}
    </>
  );
};

ProfileList.propTypes = {
  userDetails: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProfileList;
