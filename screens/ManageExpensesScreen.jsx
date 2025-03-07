import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Colors } from "../constants/colors";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import Input from "../components/Input";
import { getFormattedDate } from "../util/date";

function ManageExpensesScreen({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const expensesContext = useContext(ExpensesContext);
  const expense = expensesContext.expenses.find(
    (item) => item.id === expenseId
  );

  const addingNewExpense = expenseId === undefined;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: addingNewExpense ? "Add Expense" : "Edit Expense",
    });
  }, [navigation, addingNewExpense]);

  const [inputs, setInputs] = useState(() => ({
    amount: addingNewExpense
      ? {
          value: "",
          isValid: true,
        }
      : {
          value: expense.amount.toString(),
          isValid: true,
        },
    description: addingNewExpense
      ? {
          value: "",
          isValid: true,
        }
      : {
          value: expense.description,
          isValid: true,
        },
    date: addingNewExpense
      ? {
          value: "",
          isValid: true,
        }
      : {
          value: getFormattedDate(expense.date),
          isValid: true,
        },
  }));

  const handleInputChange = (newValue, inputType) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputType]: {
        value: newValue,
        isValid: true,
      },
    }));
  };

  const inputValidator = ({ amount, description, date }) => {
    const isAmountValid = !isNaN(amount) && amount > 0;
    const isDescriptionValid = description.trim().length > 0;
    const isDateValid = date.toString() !== "Invalid Date";

    setInputs((prevInputs) => ({
      amount: {
        value: prevInputs.amount.value,
        isValid: isAmountValid,
      },
      date: {
        value: prevInputs.date.value,
        isValid: isDateValid,
      },
      description: {
        value: prevInputs.description.value,
        isValid: isDescriptionValid,
      },
    }));

    return isAmountValid && isDateValid && isDescriptionValid;
  };

  const onSubmitHandler = () => {
    const expenseData = {
      amount: parseFloat(inputs.amount.value),
      description: inputs.description.value,
      date: new Date(inputs.date.value),
    };
    if (inputValidator(expenseData)) {
      if (addingNewExpense) expensesContext.addExpense(expenseData);
      else expensesContext.updateExpense(expenseId, expenseData);
      navigation.goBack();
    }
  };
  const onRemoveHandler = () => {
    expensesContext.removeExpense(expenseId);
    navigation.goBack();
  };
  const onCancelHandler = () => {
    navigation.goBack();
  };

  const invalidForm =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.formContainer}>
          <View style={styles.detailsContainer}>
            <Input
              value={inputs.amount.value}
              isValid={inputs.amount.isValid}
              title="Amount"
              textInputConfig={{ keyboardType: "decimal-pad" }}
              handleTextChange={(newValue) =>
                handleInputChange(newValue, "amount")
              }
            />
            <Input
              value={inputs.date.value}
              isValid={inputs.date.isValid}
              title="Date"
              textInputConfig={{ placeholder: "YYYY-MM-DD", maxLength: 10 }}
              handleTextChange={(newValue) =>
                handleInputChange(newValue, "date")
              }
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Input
              value={inputs.description.value}
              isValid={inputs.description.isValid}
              title="Description"
              textInputConfig={{ multiline: true }}
              handleTextChange={(newValue) =>
                handleInputChange(newValue, "description")
              }
            />
          </View>
        </View>
        {invalidForm && (
          <Text style={styles.invalidInputText}>Invalid input values!</Text>
        )}
        <View style={styles.buttonsContainer}>
          <Button onPress={onCancelHandler} mode="cancel">
            Cancel
          </Button>
          <Button onPress={onSubmitHandler} mode="confirm">
            {addingNewExpense ? "Add" : "Update"}
          </Button>
        </View>
        {!addingNewExpense && (
          <View>
            <View style={styles.deleteContainer}>
              <IconButton
                onPress={onRemoveHandler}
                name="trash"
                size={36}
                color={Colors.error500}
              />
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
export default ManageExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    color: "white",
    marginTop: 50,
    marginBottom: 30,
    fontWeight: "bold",
  },
  formContainer: {
    height: 200,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    flex: 2,
    // borderColor: "red",
    // borderWidth: 1,
  },
  descriptionContainer: {
    flex: 5,
    // borderColor: "red",
    // borderWidth: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 30,
    marginHorizontal: 60,
    height: 40,
  },
  deleteContainer: {
    borderTopColor: Colors.primary200,
    borderTopWidth: 2,
    alignItems: "center",
    paddingTop: 20,
  },
  invalidInputText: {
    textAlign: "center",
    color: Colors.error500,
    fontSize: 20,
  },
});
