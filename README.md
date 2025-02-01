# PocketPlan

PocketPlan is a smart and intuitive finance tracking application designed to help users manage their expenses, track income, and gain insights into their financial health.

## Features

- **Expense Tracking:** Easily log and categorize your expenses.
- **Income Management:** Keep track of all income sources.
- **Data Visualization:** View financial trends with charts and graphs.
- **CSV Import/Export:** Upload and download financial data using CSV files.
- **Authentication:** Secure sign-up and login using Firebase authentication.
- **Dark Mode Support:** Enjoy a user-friendly interface with light and dark themes.
- **Mobile Responsive:** Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:** React, Vite, Material UI (MUI), Ant Design
- **State Management:** React Hooks
- **Authentication & Database:** Firebase
- **Data Processing:** Moment.js, PapaParse
- **Routing:** React Router DOM
- **Notifications:** React Toastify

## Getting Started

Follow the steps below to set up PocketPlan on your local machine:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (latest version recommended)
- **Git**
- **A Firebase account** (for authentication and data storage)

### Installation

```sh
# Clone the repository
git clone https://github.com/Emmanuelchisom89/PocketPlan-expense-tracker.git

# Navigate to the project directory
cd pocketplan

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## Firebase Setup

To enable authentication and database functionality:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Authentication (Google, Email/Password, etc.).
3. Set up Firestore Database and configure security rules.
4. Add your Firebase configuration to `firebaseConfig.js`.

## Deployment

You can deploy PocketPlan using GitHub Pages, Vercel, or Netlify. Example for GitHub Pages:

```sh
npm run build
git add .
git commit -m "Deploy"
git push origin main
gh-pages -d dist
```

---

### Need Help?

For any issues, feel free to open an issue in the repository or reach out to me on LinkedIn. 🚀
