import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); // État pour le mode sombre

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const dynamicStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Icon name={isDarkMode ? "sunny" : "moon"} size={20} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={[styles.header, dynamicStyles.text]}>My List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, dynamicStyles.input]}
          placeholder="Enter a task..."
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#A9A9A9"}
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.taskList}
        data={tasks}
        renderItem={({ item, index }) => (
          <View style={[styles.taskItem, dynamicStyles.taskItem]}>
            <Text style={[styles.taskText, dynamicStyles.text]}>{item}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeTask(index)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center"
  },
  header: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%"
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16
  },
  addButton: {
    marginLeft: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  addButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  taskList: {
    width: "100%"
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  },
  taskText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 14
  },
  themeButton: {
    alignSelf: "flex-start",
    marginTop: 50,
    marginBottom: 10,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5
  },
  themeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold"
  }
});

const lightStyles = StyleSheet.create({
  container: {
    // backgroundColor: "#E6F7FF"
    backgroundColor: "#F5F5F5"
  },
  text: {
    color: "#000000"
  },
  input: {
    borderColor: "#D3D3D3",
    color: "#000000"
  },
  taskItem: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1
  }
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E"
  },
  text: {
    color: "#FFFFFF"
  },
  input: {
    borderColor: "#555555",
    color: "#FFFFFF"
  },
  taskItem: {
    backgroundColor: "#333333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1
  }
});
