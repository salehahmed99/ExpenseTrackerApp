import { View, StyleSheet, Button } from "react-native";
import ExpensesList from "../components/ExpensesList";
import ExpensesSummary from "../components/ExpensesSummary";
import { EXPENSES } from "../data/dummy-expenses";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpensesScreen({ navigation }) {
  const expensesContext = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName="Total" expenses={expensesContext.expenses} />
      <ExpensesList expenses={expensesContext.expenses} />
    </View>
  );
}
export default AllExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
