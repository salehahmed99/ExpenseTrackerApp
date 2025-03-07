import { TextInput, Text, View, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

function Input({
  title: label,
  textInputConfig,
  handleTextChange,
  value,
  isValid,
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, !isValid && styles.inputTextInvalid]}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          !isValid && styles.inputContainerInValid,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={handleTextChange}
          {...textInputConfig}
          style={[styles.inputText, !isValid && styles.inputTextInvalid]}
        />
      </View>
    </View>
  );
}
export default Input;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    color: Colors.primary100,
    fontSize: 12,
    marginVertical: 5,
  },
  inputContainer: {
    borderRadius: 4,
    padding: 8,
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  inputContainerInValid: {
    backgroundColor: Colors.error50,
  },
  inputText: {
    fontSize: 17,
    color: Colors.primary500,
  },
  inputTextInvalid: {
    color: Colors.error500,
  },
});
