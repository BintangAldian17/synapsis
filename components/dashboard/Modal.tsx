import { Modal } from "antd";
import React from "react";

const ModalForm = ({
  children,
  isOpenModal,
  onCancel,
  title,
}: {
  children: React.ReactNode;
  isOpenModal: boolean;
  onCancel: () => void;
  title: string;
}) => {
  return (
    <Modal open={isOpenModal} onCancel={onCancel} title={title} footer={false}>
      {children}
    </Modal>
  );
};

export default ModalForm;
