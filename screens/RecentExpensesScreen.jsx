import { View, StyleSheet, Button } from "react-native";
import ExpensesList from "../components/ExpensesList";
import ExpensesSummary from "../components/ExpensesSummary";
import { EXPENSES } from "../data/dummy-expenses";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function RecentExpensesScreen({ navigation }) {
  const expensesContext = useContext(ExpensesContext);

  const recentExpenses = expensesContext.expenses.filter((item) => {
    const today = new Date();
    const diff = (today - item.date) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  });
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName='Last 7 Days' expenses={recentExpenses} />
      <ExpensesList expenses={recentExpenses} />
    </View>
  );
}
export default RecentExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
