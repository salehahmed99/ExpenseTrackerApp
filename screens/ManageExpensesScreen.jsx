import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { Colors } from "../constants/colors";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
function ManageExpensesScreen({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseId ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, expenseId]);

  const expensesContext = useContext(ExpensesContext)

  const onCancelHandler = () => {
    navigation.goBack();
  };

  const onAddHandler = () => {
    expensesContext.addExpense({description: 'New Test', amount: 58.343, date: new Date('2025-3-15')})
    navigation.goBack();
  };
  const onUpdateHandler = () => {
    expensesContext.updateExpense(expenseId , {description: 'Updated Test', amount: 33.55, date: new Date('2025-3-1')})
    navigation.goBack();
  };
  const onRemoveHandler = () => {
    expensesContext.removeExpense(expenseId);
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button onPress={onCancelHandler} mode="cancel">
          Cancel
        </Button>
        <Button
          onPress={expenseId ? onUpdateHandler : onAddHandler}
          mode="confirm"
        >
          {expenseId ? "Update" : "Add"}
        </Button>
      </View>
      {expenseId && (
        <View>
          <View style={styles.deleteContainer}>
            <IconButton onPress={onRemoveHandler} name="trash" size={36} color={Colors.error500} />
          </View>
        </View>
      )}
    </View>
  );
}
export default ManageExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 30,
    marginHorizontal: 60,
    height: 50,
  },
  deleteContainer: {
    borderTopColor: Colors.primary200,
    borderTopWidth: 2,
    alignItems: "center",
    marginHorizontal: 20,
    paddingTop: 20,
  },
});
