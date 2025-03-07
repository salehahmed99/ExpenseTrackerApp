import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { EXPENSES } from "../data/dummy-expenses";

function ExpensesSummary({ periodName, expenses }) {
  const totalExpensesAmount = expenses.reduce((accumulator,crnt) => accumulator + crnt.amount, 0)
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.amount}>${totalExpensesAmount.toFixed(2)}</Text>
    </View>
  );
}
export default ExpensesSummary;

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: Colors.primary100,
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 8,
  },
  period:{
    color: Colors.primary400,
  },
  amount:{
    fontWeight:'bold',
    fontSize:16,
    color: Colors.primary500,
  }
});
