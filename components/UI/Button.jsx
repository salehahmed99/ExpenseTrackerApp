import { Pressable, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ children, mode, onPress }) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.pressable , pressed && styles.buttonPressed] }>
      <View style={[styles.button, mode === "confirm" && styles.buttonConfirm]}>
        <Text
          style={mode === "confirm" ? styles.textConfirm : styles.textCancel}
        >
          {children}
        </Text>
      </View>
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
    borderRadius:8,
  },
  buttonConfirm: {
    backgroundColor: Colors.primary500,
  },
  textCancel: {
    color: Colors.primary200,
  },
  textConfirm: {
    color: "white",
  },
  pressable: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
