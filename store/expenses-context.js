import { createContext, useState } from "react";
import { EXPENSES } from "../data/dummy-expenses";
export const ExpensesContext = createContext();

function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState(EXPENSES);

  const addExpense = (expenseData) => {
    setExpenses((prev) => {
      const id = new Date().toString() + Math.random().toString();
      return [{ ...expenseData, id: id }, ...expenses];
    });
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const updateExpense = (id, expenseData) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...expenseData } : item))
    );
  };

  const value = {
    expenses: expenses,
    addExpense: addExpense,
    removeExpense: removeExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
