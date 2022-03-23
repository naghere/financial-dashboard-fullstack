//@ts-nocheck

import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const ExpensesFunctions = () => {
  //Setup CONSTANTS for month and year
  const currentMonth = "0" + (new Date().getMonth() + 1);
  const prevMonth = "0" + new Date().getMonth();
  const prevTwoMonths = "0" + (new Date().getMonth() - 1);
  const currentYear = new Date().getFullYear();
  const currentMonthYear = currentYear + "-" + currentMonth;
  const lastMonthYear = currentYear + "-" + prevMonth;
  const lastTwoMonthYear = currentYear + "-" + prevTwoMonths;
  // Set initial value for calculations
  let initialValue = 0;

  //Get userData from Redux Store
  const userData = useSelector((state: RootState) => state.user.user);
  //Variable that displays the expense date as YYYY-MM
  const dateExpense = userData.expense.map((expense: any) =>
    expense.date.slice(0, 7)
  );

  //FILTER FUNCTIONS

  // Filter function to get current month expenses
  const filteredByMonth = userData.expense.filter(
    (expense: any) => expense.date.slice(0, 7) === currentMonthYear
  );

  // Filter function to get prev month expenses
  const filteredByPrevMonth = userData.expense.filter(
    (expense: any) => expense.date.slice(0, 7) === lastMonthYear
  );

  // Filter function to get 2months ago expenses
  const filteredByPrevTwoMonth = userData.expense.filter(
    (expense: any) => expense.date.slice(0, 7) === lastTwoMonthYear
  );

  // Get total expense value
  const totalExpenses = userData.expense.reduce(
    (sum: Number, currentValue: Number) => {
      //@ts-ignore
      return sum + currentValue.amount;
    },
    initialValue
  );

  // Get total monthly expenses for current month
  const monthlyExpenses = filteredByMonth.reduce(
    (sum: Number, currentValue: Number) => {
      //@ts-ignore
      return sum + currentValue.amount;
    },
    initialValue
  );

  // Get total monthly expenses for previous month
  const prevMonthlyExpenses = filteredByPrevMonth.reduce(
    (sum: Number, currentValue: Number) => {
      //@ts-ignore
      return sum + currentValue.amount;
    },
    initialValue
  );

  // Get total monthly expenses for two months ago

  const prevTwoMonthlyExpenses = filteredByPrevTwoMonth.reduce(
    (sum: Number, currentValue: Number) => {
      //@ts-ignore
      return sum + currentValue.amount;
    },
    initialValue
  );

  // Get difference in expenses between current and previous month
  const monthlyDifference = monthlyExpenses - prevMonthlyExpenses;

  // Get difference in expenses between prev and previous month
  const prevTwoMonthlyDifference = monthlyExpenses - prevTwoMonthlyExpenses;

  // Get previous year expenses
  // Get difference between current and last year expenses

  //Get expenses by category
  //Get all items with same category and store in object
  const expensesByCategory = {};
  userData.expense.forEach((item: Object) => {
    if (expensesByCategory[item.tag] === undefined) {
      expensesByCategory[item.tag] = [];
    }
    expensesByCategory[item.tag].push(item);
  });

  // Filter the categories and put into array
  const categoriesArray = Object.entries(expensesByCategory).filter((item) =>
    item.map((item) => item[1])
  );

  //Get the category names for the separated categories
  const categoryName = categoriesArray.map((item) => {
    return item.filter((item) => item[0][0]);
  });

  //Get totals per category -- will only return the total as number
  const totalsByCategory = categoriesArray.map((item) => {
    return item[1].reduce((sum: Number, currentValue: Number) => {
      //@ts-ignore
      const total = sum + currentValue.amount;
      return total;
    }, initialValue);
  });

  //Create object with category names and totals
  const totalExpenseByCategory = {
    name: categoryName,
    value: totalsByCategory,
  };

  return {
    prevMonthlyExpenses,
    prevTwoMonthlyDifference,
    monthlyExpenses,
    currentYear,
    monthlyDifference,
    totalExpenses,
    dateExpense,
    totalExpenseByCategory,
  };
};

export default ExpensesFunctions;
