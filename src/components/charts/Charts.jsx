import { Line, Pie } from '@ant-design/charts';
import { useEffect, useState } from 'react';

const Charts = ({ sortedTransactions }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Listen for theme change in localStorage
  useEffect(() => {
    const updateTheme = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("storage", updateTheme);
    return () => window.removeEventListener("storage", updateTheme);
  }, []);

  console.log("Theme",theme)
  
  const darkModeColors = {
    text: '#ffffff !important',
    background: '#2c2c2c !important',
    axis: '#a3a3a3 !important',
  };

  const lightModeColors = {
    text: '#000000 !important',
    background: '#ffffff !important',
    axis: '#4a4a4a !important',
  };

  const colors = theme === 'dark' ? darkModeColors : lightModeColors;

  const data = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  const spendingData = sortedTransactions.filter(
    (transaction) => transaction.type === 'expense'
  );

    let newSpending = [
        { tag: "utilities", amount: 0},
        { tag: "salary", amount: 0},
        { tag: "purchase", amount: 0},
        { tag: "supplies", amount: 0},
        { tag: "others", amount: 0},
    ];

    spendingData.forEach((item) => {
        if (item.tag == "utilities") {
            newSpending[0].amount += item.amount;
        } else if (item.tag == "salary") {
            newSpending[1].amount += item.amount;
        } else if(item.tag == "purchase") {
            newSpending[2].amount += item.amount;
        } else if (item.tag == "supplies") {
            newSpending[3].amount += item.amount;
        } else {
            newSpending[4].amount += item.amount;
        }
    })


  const lineConfig = {
    data,
    height: 320,
    xField: 'date',
    yField: 'amount',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: colors.text, // Dynamically change text color
        fontSize: 12,
      },
    },
    xAxis: {
      label: {
        style: {
          fill: colors.axis, // Axis label color
          fontSize: 12,
        },
      },
      title: {
        text: 'Date',
        style: {
          fill: colors.text,
          fontSize: 14,
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: colors.axis, // Axis label color
          fontSize: 12,
        },
      },
      title: {
        text: 'Amount',
        style: {
          fill: colors.text,
          fontSize: 14,
        },
      },
    },
    tooltip: {
      domStyles: {
        'g2-tooltip': {
          color: colors.text, // Tooltip text color
          backgroundColor: colors.background, // Tooltip background color
        },
      },
    },
    theme: theme, // Explicitly set the theme for Ant Design charts
  };

  const pieConfig = {
    data: newSpending,
    height: 320,
    angleField: 'amount',
    colorField: 'tag',
    label: {
      //type: 'inner',
      offset: '-30%',
      content: '{name}: {value}',
      style: {
        fontSize: 12,
        fill: colors.text, // Label text color
      },
    },
    tooltip: {
      domStyles: {
        'g2-tooltip': {
          color: colors.text, // Tooltip text color
          backgroundColor: colors.background, // Tooltip background color
        },
      },
    },
    theme: theme, // Explicitly set the theme for Ant Design charts
  };

  return (
    <div className="chart-wrapper">
      <div className="analytics">
        <h1>Analytics</h1>
        <div className="line-container">
          <Line {...lineConfig} />
        </div>
      </div>
      <div className="pi-chart">
        <h1>Your Spendings</h1>
        <div className="chart-container">
          <Pie {...pieConfig} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
