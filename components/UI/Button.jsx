import { Pressable, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ children, mode, onPress }) {
  const isConfirm = mode === "confirm";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isConfirm && styles.buttonConfirm,
        pressed && styles.buttonPressed,
        pressed && !isConfirm && styles.buttonPressedCancel,
      ]}
    >
      <Text style={isConfirm ? styles.textConfirm : styles.textCancel}>
        {children}
      </Text>
    </Pressable>
  );
}
export default Button;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonConfirm: {
    backgroundColor: Colors.primary500,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  buttonPressedCancel: {
    backgroundColor: Colors.primary50,
  },
  textCancel: {
    color: Colors.primary200,
  },
  textConfirm: {
    color: "white",
  },
});
