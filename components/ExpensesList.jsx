import { View, Text, StyleSheet, FlatList } from "react-native";
import ExpenseCard from "./ExpenseCard";

function ExpensesList({ expenses }) {
  return (
    <View style={styles.listContainer}>
      {expenses.length !== 0 ? (
        <FlatList
          data={expenses}
          keyExtractor={(expense) => expense.id}
          renderItem={({ item }) => (
            <ExpenseCard {...item} /> //
          )}
        />
      ) : (
        <Text style={styles.noExpenses}> No Expenses Found!</Text>
      )}
    </View>
  );
}
export default ExpensesList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent:'center',
  },
  noExpenses:{
    color:'white',
    textAlign:'center',
    fontSize:20,

  }
});
