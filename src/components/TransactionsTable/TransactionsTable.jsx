import React, { useState } from 'react'
import "./transactionsTable.css"
import { Radio, Table, Select } from 'antd';
const { Option } = Select;
import { parse } from 'papaparse';
import { unparse } from 'papaparse';
import { toast } from 'react-toastify';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";


const TransactionsTable = ({
  transactions,
  addTransaction,
  fetchTransactions,
  setTransactions,
  user
}) => {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [sortKey, setSortKey] = useState("")

  let filteredTransactions = transactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter));

  let sortedTransactions = filteredTransactions.sort((a,b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date)
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  })

  const exportToCsv = () => {
    var csv = unparse({
      fields: ["name", "type", "tag", "date", "amount"],
      data: transactions,
    });
    var data = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    var csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'transactions.csv');
    document.body.appendChild(tempLink)
    tempLink.click();
    document.body.removeChild(tempLink)
  }

  function importFromCsv(event) {
  event.preventDefault();
  try {
    const file = event.target.files[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    parse(file, {
      header: true,
      complete: async function (results) {
        // Filter out rows where all fields are empty
        const validData = results.data.filter(row => {
          return Object.values(row).some(value => value.trim() !== "");
        });
        // Process the valid rows
        for (const transaction of validData) {
          console.log("Processing transaction:");

          const newTransaction = {
            ...transaction,
            amount: parseFloat(transaction.amount), // Ensure 'amount' is numeric
          };

          await addTransaction(newTransaction, true);
        }

        toast.success("All Transactions Added");
        fetchTransactions();
      },
      error: function (error) {
        console.error("Error parsing CSV:", error);
        toast.error("Error importing CSV file.");
      },
    });

    // Reset the file input
    event.target.value = null;
  } catch (e) {
    console.error("Error in importFromCsv:", e.message);
    toast.error(e.message);
  }
  }
  
  async function handleDelete(transactionId) {
    const confirm = window.confirm("Are you sure you want to delete this transaction?");
    if (confirm) {
      try {
        if (!transactionId) {
          throw new Error("Transaction ID is undefined");
        }

        // Reference the document by its ID
        const transactionDocRef = doc(db, `users/${user.uid}/transactions`, transactionId);

        // Delete the document
        await deleteDoc(transactionDocRef);

        // Remove the transaction from the state (optional, but for immediate feedback)
        setTransactions((prev) => prev.filter((transaction) => transaction.id !== transactionId));

        toast.success("Transaction deleted successfully!");
        fetchTransactions(); // Refresh the transactions list after deletion
      } catch (error) {
        console.error("Error deleting transaction:", error);
        toast.error("Error deleting transaction. Please try again.");
      }
    }
}

 

/*   const searchIcon = "/src/assets/search.svg"
 */
    const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <button
        onClick={() => handleDelete(record.id)}
        style={{
          color: '#FF4E4E',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <DeleteSweepRoundedIcon />
      </button>
    ),
  },
];

  return (
    <div className='transaction-table'>
      <div className="tab-inputs">
      <div className="input-flex">
        <SearchRoundedIcon />
{/*         <img src={searchIcon} alt="Search Icon" className='search_icon' />
 */}        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search by name' />
      </div>

       <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      
      <div className="my_table">
        <div className="table-heading">

          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>

          <div
            className='table-heading-btn'
          >
            <button className="btn" onClick={exportToCsv}>
              Export to CSV
            </button>
            <label htmlFor="file-csv" className="btn btn-blue" >
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              onChange={importFromCsv}
              style={{ display: "none" }}
            />
          </div>

        </div>
        <div className="table_data">
          <Table dataSource={sortedTransactions.reverse()} columns={columns} scroll={{ x: 700 }} rowKey="id" />
        </div>
      </div>
    </div>
  )
}

export default TransactionsTable
