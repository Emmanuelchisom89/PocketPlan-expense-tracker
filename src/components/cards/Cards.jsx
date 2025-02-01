import React from 'react'
import "./card.css"
import { Card, Row } from 'antd'
import Button from '../button/Button'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { db } from '../../firebase';

const Cards = ({ showExpenseModal, showIncomeModal, income, expense, totalBalance, resetTransactions, user }) => {
  return (
    <div>
        <Row className='card_row'>
            <Card className='dash_card teal' bordered={true}>
                <div className="card_h2">
                  <AccountBalanceWalletRoundedIcon />
                  <h2>Current Balance</h2>
                  </div>
                  <p>₦ {totalBalance.toLocaleString()}</p>
                  <Button text="Reset Balance" blue={true} onClick={() => resetTransactions(db, user)} />
            </Card>
              <Card className='dash_card green' bordered={true}>
                  <div className="card_h2">
                  <TrendingUpRoundedIcon />
                  <h2>Total Income</h2>
                  </div>
                  <p>₦ {income.toLocaleString()}</p>
                  <Button text="Add Income" blue={true} onClick={showIncomeModal} />
            </Card>
              <Card className='dash_card red' bordered={true}>
                  <div className="card_h2">
                  <TrendingDownRoundedIcon />
                  <h2>Total Expense</h2>
                  </div>
                  <p>₦ {expense.toLocaleString()}</p>
                  <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
            </Card>
        </Row>
    </div>
  )
}

export default Cards
