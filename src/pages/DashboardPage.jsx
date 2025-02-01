import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashHeader from '../components/header/DashHeader';
import Cards from '../components/cards/Cards';
import AddIncomeModal from '../components/modals/AddIncome';
import AddExpenseModal from '../components/modals/AddExpense';
import { addDoc, collection, getDocs, query, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import TransactionsTable from '../components/TransactionsTable/TransactionsTable';
import User from '../components/user/User';
import Charts from '../components/charts/Charts';
import EmptyChart from '../components/charts/EmptyChart';
import Loader from '../components/loader/Loader';


const DashboardPage = () => {
    const [transactions, setTransactions] = useState([])
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false)
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false)

    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    const [totalBalance, setTotalBalance] = useState(0)
    
    const [chartKey, setChartKey] = useState(0);

    const [isLoading, setIsLoading] = useState(true)

    const showExpenseModal = () => {
        setIsExpenseModalVisible(true)
    }

    const showIncomeModal = () => {
        setIsIncomeModalVisible(true)
    }

    const handleExpenseCancel = () => {
        setIsExpenseModalVisible(false)
    }

    const handleIncomeCancel = () => {
        setIsIncomeModalVisible(false)
}

const [user, loading, error] = useAuthState(auth);

useEffect(() => {
  if (loading) {
    console.log("Authentication loading...");
  } else if (user) {
    console.log("User authenticated: ");
  } else {
    console.log("No user logged in.");
  }
}, [user, loading]);


    

const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
    setIsExpenseModalVisible(false)
    setIsIncomeModalVisible(false)
  };
  

/*     async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
        if (!many) toast.success("Transaction Added!");
        let newArr = transactions;
        newArr.push(transaction)
        calculateBalance()
    } catch (e) {
      console.error("Error adding document: ", e);
        if(!many) toast.error("Couldn't add transaction");
    }
  }
 */
  
  async function addTransaction(transaction, many) {
  try {
    const docRef = await addDoc(
      collection(db, `users/${user.uid}/transactions`),
      transaction
    );
    console.log("Document written with ID: ");
    // Add the generated ID to the transaction object
    const newTransaction = { ...transaction, id: docRef.id };
    // Update state correctly
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    if (!many) toast.success("Transaction Added!");
    calculateBalance();
  } catch (e) {
    console.error("Error adding document: ", e);
    if (!many) toast.error("Couldn't add transaction");
  }
}


  useEffect(() => {
    if (!loading && user) {
      fetchTransactions();
    }
  }, [loading, user]);
  
  
  async function fetchTransactions() {
  setIsLoading(true);
  if (user) {
    const q = query(collection(db, `users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);

    let transactionsArray = [];
    querySnapshot.forEach((doc) => {
      // Combine the document ID with the data
      transactionsArray.push({ id: doc.id, ...doc.data() });
    });

    setTransactions(transactionsArray);
    //console.log("Transactions:");
    //toast.success("Transactions Fetched!");
  }
  setIsLoading(false);
  }

const resetTransactions = async (db, user) => {
  if (!user) {
    toast.error("User is not logged in.");
    return;
  }

    const confirm = window.confirm("Are you sure you want to clear all transactions?");
  if (confirm) {

    try {
      // Reference the transactions collection
      const transactionsRef = collection(db, `users/${user.uid}/transactions`);
    
      // Query all documents in the collection
      const q = query(transactionsRef);
      const querySnapshot = await getDocs(q);

      // Loop through each document and delete it
      const deletePromises = querySnapshot.docs.map((document) =>
        deleteDoc(doc(db, `users/${user.uid}/transactions`, document.id))
      );

      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      toast.success("All transactions deleted successfully!");
      fetchTransactions();
    } catch (error) {
      console.error("Error resetting transactions:", error);
      toast.error("Failed to reset transactions. Please try again.");
    }
  }
};


  
  useEffect(() => {
        calculateBalance()
    }, [transactions])
    
    const calculateBalance = () => {
        let incomeTotal = 0;
        let expenseTotal = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                incomeTotal += transaction.amount
            } else {
                expenseTotal += transaction.amount
            }
        });

        setIncome(incomeTotal)
        setExpense(expenseTotal)
        setTotalBalance(incomeTotal -expenseTotal)
  }
  
    let sortedTransactions = transactions.sort((a,b) => {
      return new Date(a.date) - new Date(b.date)
  })

  const year = new Date().getFullYear();

  return (
    <>
        <ToastContainer />
          <DashHeader />
          {isLoading ? (
            <Loader />
          ) : (
                  
          <>
          <User isLoading={isLoading} user={user} setChartKey={setChartKey} />
          <Cards
              showExpenseModal={showExpenseModal}
              showIncomeModal={showIncomeModal}
              income={income}
              expense={expense}
              totalBalance={totalBalance}
              resetTransactions={resetTransactions}
              user={user}
          />

          {transactions.length !=0 ? <Charts sortedTransactions={sortedTransactions} key={chartKey} /> : <EmptyChart />}
          
          <AddIncomeModal
              isIncomeModalVisible={isIncomeModalVisible}
              handleIncomeCancel={handleIncomeCancel}
              onFinish={onFinish}
          />

          <AddExpenseModal
              isExpenseModalVisible={isExpenseModalVisible}
              handleExpenseCancel={handleExpenseCancel}
              onFinish={onFinish}
          />
          
          <TransactionsTable
              transactions={transactions} addTransaction={addTransaction}
              fetchTransactions={fetchTransactions} setTransactions={setTransactions} user={user}
          />
        </>
      )}
      <footer>
        <p>&copy; copyright {year}.</p>
      </footer>
    </>
  )
}

export default DashboardPage
