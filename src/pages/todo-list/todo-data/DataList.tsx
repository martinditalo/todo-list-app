import { TodoParams } from "../types";
import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  Button,
  IconButton,
  MD3Colors,
  RadioButton,
  TextInput,
  Text,
  Checkbox,
} from "react-native-paper";
import { List } from "react-native-paper";
import PopUpModal from "../../../components/PopUpModal";
import { styles } from "../styles";

type DataListProps = {
  arrayData: TodoParams[];
  index: number;
  todo: TodoParams;
  deleteTodo: (index: number) => void;
  editTodo: (
    index: number,
    todo: TodoParams,
    editTodoItem: string,
    editComment: string,
    priority: string,
    status: boolean
  ) => void;
};

const DataList = (props: DataListProps) => {
  const { arrayData, index, todo, deleteTodo, editTodo } = props;
  const [openEditModal, setEditModal] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [editTodoItem, setEditTodoItem] = useState<string>("");
  const [editComment, setEditComment] = useState<string>("");
  const [checked, setChecked] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<TodoParams[]>([]);

  const showEditModal = () => {
    setChecked(todo.priority);
    setEditModal(true);
  };
  const hideEditModal = () => {
    setEditModal(false);
  };

  const showDeleteModal = () => {
    setDeleteModal(true);
  };
  const hideDeleteModal = () => setDeleteModal(false);

  useEffect(() => {
    setTodoList(arrayData);
  }, [arrayData, todoList]);

  return (
    <>
      <List.Accordion title={todo.item} style={{ width: 350 }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text variant="labelMedium">Priority:</Text>
            <Text variant="labelSmall" style={{ paddingLeft: 5 }}>
              {todo.priority}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <IconButton
              icon="playlist-edit"
              iconColor={MD3Colors.primary50}
              size={20}
              onPress={() => showEditModal()}
            />
            <IconButton
              icon="delete"
              iconColor={MD3Colors.error50}
              size={20}
              onPress={() => showDeleteModal()}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
        >
          <Text variant="labelMedium">Comment:</Text>
          <Text variant="labelSmall" style={{ paddingLeft: 5 }}>
            {todo.comment}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
        >
          <Text variant="labelMedium">Status:</Text>
          <Text
            variant="labelSmall"
            style={{
              paddingLeft: 5,
              color: todo.status ? "green" : MD3Colors.primary50,
            }}
          >
            {todo.status ? "Completed" : "To do"}
          </Text>
        </View>
      </List.Accordion>

      <PopUpModal
        style={{ padding: 50 }}
        title={"Edit To Do"}
        open={openEditModal}
        onExited={hideEditModal}
      >
        <TextInput
          style={{ width: 250, marginBottom: 15 }}
          label={todo.item}
          value={editTodoItem}
          onChangeText={(data) => setEditTodoItem(data)}
        />
        <TextInput
          style={{ width: 250, height: 50, marginBottom: 15 }}
          label={todo.comment}
          value={editComment}
          onChangeText={(data) => setEditComment(data)}
        />
        <View style={styles.priority}>
          <RadioButton
            value="1"
            status={checked === "1" ? "checked" : "unchecked"}
            onPress={() => setChecked("1")}
          />
          <Text variant="bodySmall">Priority</Text>
          <RadioButton
            value="2"
            status={checked === "2" ? "checked" : "unchecked"}
            onPress={() => setChecked("2")}
          />
          <Text variant="bodySmall">Less Priority</Text>
        </View>
        <View style={styles.priority}>
          <Text variant="bodySmall">Completed</Text>
          <Checkbox
            status={status ? "checked" : "unchecked"}
            onPress={() => {
              setStatus(!status);
            }}
          />
        </View>
        <Button
          style={{ borderRadius: 5 }}
          mode="contained"
          onPress={() => {
            arrayData[index] = {
              id: todo.id,
              item: editTodoItem == "" ? todo.item : editTodoItem,
              comment: editComment == "" ? todo.comment : editComment,
              priority: checked,
              status: status ? true : false,
            };
            editTodo(index, todo, editTodoItem, editComment, checked, status);
            hideEditModal();
            setEditComment("");
            setEditTodoItem("");
          }}
        >
          Save
        </Button>
      </PopUpModal>
      <PopUpModal
        style={{ marginHorizontal: 30 }}
        title={"Are you sure to delete?"}
        open={openDeleteModal}
        onExited={hideDeleteModal}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            style={{ borderRadius: 5, marginRight: 10 }}
            buttonColor="#de0404"
            mode="contained"
            onPress={() => {
              deleteTodo(index);
              hideDeleteModal();
            }}
          >
            Yes
          </Button>
          <Button
            style={{ borderRadius: 5 }}
            mode="contained"
            onPress={hideDeleteModal}
          >
            No
          </Button>
        </View>
      </PopUpModal>
    </>
  );
};

export default DataList;
