import React from "react";
import useModal from "./useModal";

type OpenModalProps = {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
  modals: {
    modalId: string;
    openId: string;
  }[];
};

export default function OpenModal({ modals, children }: OpenModalProps) {
  const { open } = useModal();

  const handleOpen = () => {
    open(modals);
  };

  return React.cloneElement(children, {
    onClick: handleOpen,
  });
}
