import { ReactNode, useState } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";

type ModalProps = {
  open: boolean;
  title?: string;
  children: ReactNode;
  onExited: () => void;
  style?: StyleProp<TextStyle>;
};
const PopUpModal = (props: ModalProps) => {
  const { open, title, children, onExited, style } = props;

  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <>
      <Portal>
        <Modal
          visible={open}
          onDismiss={onExited}
          contentContainerStyle={containerStyle}
          style={style}
        >
          <Text
            variant="titleLarge"
            style={{ textAlign: "center", marginBottom: 15 }}
          >
            {title}
          </Text>
          {children}
        </Modal>
      </Portal>
    </>
  );
};

export default PopUpModal;
