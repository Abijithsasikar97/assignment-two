/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Modal, Form, Input, Button } from "antd";
import { editUser } from "../redux/action/user";

const editFormRules = {
  name: [
    {
      required: true,
      message: "Name is required",
    },
  ],
  email: [
    {
      required: true,
      message: "Email is required",
    },
    {
      type: "email",
      message: "Please enter a valid email!",
    },
  ],
  phone: [
    {
      required: true,
      message: "Phone is required",
    },
    {
      whitespace: true,
      message: "White space is not allowed",
    },
  ],
  website: [
    {
      required: true,
      message: "Website is required",
    },
    {
      whitespace: true,
      message: "White space is not allowed",
    },
  ],
};

const buttonWrapperStyle = {
  display: "flex",
  justifyContent: "end",
  gap: "1rem",
};

const EditModal = ({ open, close, editData }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({
      name: editData?.name,
      email: editData?.email,
      phone: editData?.phone,
      website: editData?.website,
    });
  }, [editData]);

  const onEdit = () => {
    form.validateFields().then((values) => {
      const edited = {
        ...editData,
        ...values,
      };
      dispatch(editUser(edited));
      close();
    });
  };
  return (
    <Modal
      title="Edit User"
      open={open}
      onOk={() => null}
      onCancel={close}
      footer={false}
    >
      <Form
        form={form}
        layout="vertical"
        name="editUser-form"
        onFinish={onEdit}
      >
        <Form.Item name="name" label="Name" rules={editFormRules.name}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={editFormRules.email}>
          <Input type="email" />
        </Form.Item>
        <Form.Item name="phone" label="Phone" rules={editFormRules.phone}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="website" label="Website" rules={editFormRules.website}>
          <Input type="text" />
        </Form.Item>
        <div style={buttonWrapperStyle}>
          <Button size="middle" onClick={close}>
            Cancel
          </Button>
          <Button size="middle" type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  editData: PropTypes.object.isRequired,
};

export default EditModal;
