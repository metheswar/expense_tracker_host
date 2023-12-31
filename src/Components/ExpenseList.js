import React, { useEffect } from 'react';
import './ExpenseList.css';

const TotalIncomes = ({ income }) => {
  return (
    <div className="TotalContainer IncomeContainer">
      <h3>Total Income</h3>
      <p className="TotalAmount IncomeAmount">₹{income}</p>
    </div>
  );
};

const TotalExpense = ({ expenses }) => {
  return (
    <div className="TotalContainer ExpenseContainer">
      <h3>Total Expenses</h3>
      <p className="TotalAmount ExpenseAmount">₹{expenses}</p>
    </div>
  );
};

const ExpenseList = ({
  expenses,
  setTotalExpenses,
  totalExpenses,
  setTotalIncome,
  totalIncome
}) => {
  useEffect(() => {
    const incomeExpenses = expenses.reduce(
      (acc, expense) => {
        if (expense.selectedOption === 'Income') {
          acc.income += expense.amount;
        } else if (expense.selectedOption === 'Expense') {
          acc.expenses += expense.amount;
        }
        return acc;
      },
      { income: 0, expenses: 0 }
    );

    setTotalExpenses(incomeExpenses.expenses);
    setTotalIncome(incomeExpenses.income);
  }, [expenses, setTotalExpenses, setTotalIncome]);

  if (expenses.length === 0) {
    return (
      <div className="ExpenseListContainer">
        <h2>Expenses:</h2>
        <div className="SummaryContainer">
          <TotalIncomes income={totalIncome} />
          <TotalExpense expenses={totalExpenses} />
        </div>
        <p>No items to display</p>
      </div>
    );
  }

  return (
    <div className="ExpenseListContainer">
      <h2>Expenses:</h2>
      <div className="SummaryContainer">
        <TotalIncomes income={totalIncome} />
        <TotalExpense expenses={totalExpenses} />
      </div>
      <table className="ExpenseTable">
        <thead>
          <tr>
            <th>Amount</th>
            <th className="DescriptionHeading">Description</th>
            <th>Expense/Income</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td
                className={`AmountCell ${
                  expense.selectedOption === 'Expense' ? 'Expense' : 'Income'
                }`}
              >
                ₹{expense.amount}
              </td>
              <td>{expense.description}</td>
              <td>
                {expense.selectedOption === 'Expense' ? 'Expense' : 'Income'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
