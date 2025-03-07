import { Text, View, StyleSheet, Pressable, Platform } from "react-native";
import { Colors } from "../constants/colors";
import { getFormattedDate } from "../util/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseCard({ id, description, date, amount }) {
  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate("ManageExpenses", {
      expenseId: id,
    });
  };
  return (
    <Pressable
      onPress={onPressHandler}
      style={({ pressed }) =>
        pressed ? styles.buttonPressed : null
      }
    >
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default ExpenseCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    marginVertical: 10,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    justifyContent: "space-between",
  },
  detailsContainer: {
    justifyContent: "space-around",
  },
  description: {
    color: Colors.primary50,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    color: Colors.primary50,
  },
  amountContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  amount: {
    fontWeight: "bold",
    color: Colors.primary500,
    textAlign: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
