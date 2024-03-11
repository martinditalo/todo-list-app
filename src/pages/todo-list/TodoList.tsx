import { useState, type ReactElement, useEffect } from "react";
import {
  Button,
  TextInput,
  Text,
  Card,
  RadioButton,
  List,
  IconButton,
} from "react-native-paper";
import DataList from "./todo-data/DataList";
import PopUpModal from "../../components/PopUpModal";
import { TodoParams } from "./types";
import { ScrollView, View } from "react-native";
import { styles } from "./styles";

const TodoList = (): ReactElement => {
  const [todoItem, setItemTodo] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [checked, setChecked] = useState<string>("1");
  const [refresh, setRefresh] = useState(false);

  const [visible, setVisible] = useState<boolean>(false);
  const [arrayData, setArrayData] = useState<TodoParams[]>([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const submit = () => {
    setArrayData([
      ...arrayData,
      {
        id: Date.now() + arrayData.length + 1,
        item: todoItem,
        comment: comment,
        priority: checked,
        status: false,
      },
    ]);
    hideModal();
    setItemTodo("");
    setComment("");
  };

  const sortArray = () => {
    setRefresh(!refresh);
    arrayData.sort(
      (a, b) =>
        Number(a.priority) - Number(b.priority) || a.item.localeCompare(b.item)
    );
  };

  const countStatus = (data: boolean) => {
    return arrayData.filter((obj) => obj.status === data).length;
  };
  const deleteTodo = (index: number) => {
    if (index > -1) {
      arrayData.splice(index, 1);
      setRefresh(!refresh);
    }
  };

  const editTodo = (
    index: number,
    todo: TodoParams,
    editTodoItem: string,
    editComment: string,
    priority: string,
    status: boolean
  ) => {
    arrayData[index] = {
      id: todo.id,
      item: editTodoItem == "" ? todo.item : editTodoItem,
      comment: editComment == "" ? todo.comment : editComment,
      priority: priority,
      status: status ? true : false,
    };
    setRefresh(!refresh);
  };
  useEffect(() => {
    setArrayData(arrayData);
  }, [arrayData, refresh]);
  return (
    <>
      <Card style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text
          variant="titleLarge"
          style={{ marginBottom: 20, marginTop: 50, textAlign: "center" }}
        >
          Todo Application
        </Text>
        <Button
          style={{ borderRadius: 5 }}
          mode="contained"
          onPress={showModal}
        >
          Add Todo
        </Button>
        <List.Section title="Todos">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text variant="labelSmall">Completed: {countStatus(true)}</Text>
            <Text variant="labelSmall">To do: {countStatus(false)}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text variant="labelSmall">Filter data:</Text>
              <IconButton icon="filter-variant" size={20} onPress={sortArray} />
            </View>
          </View>

          <ScrollView style={styles.container}>
            {arrayData.map((todo, index) => {
              return (
                <DataList
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  arrayData={arrayData}
                  todo={todo}
                  index={index}
                  key={todo.id}
                />
              );
            })}
          </ScrollView>
        </List.Section>
      </Card>
      <PopUpModal
        style={{ padding: 50 }}
        title={"Add To Do"}
        open={visible}
        onExited={hideModal}
      >
        <TextInput
          style={{ width: 250, marginBottom: 15 }}
          label="Todo Item"
          value={todoItem}
          onChangeText={(data) => setItemTodo(data)}
        />
        <TextInput
          style={{ width: 250, height: 50, marginBottom: 15 }}
          label="Comment"
          value={comment}
          onChangeText={(data) => setComment(data)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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

        <Button style={{ borderRadius: 5 }} mode="contained" onPress={submit}>
          Submit
        </Button>
      </PopUpModal>
    </>
  );
};

export default TodoList;
