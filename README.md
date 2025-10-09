# 📊 Spendly

Spendly is a personal finance dashboard built with React. It helps you track your income and expenses, visualize spending by category, and manage your transactions.

---

## 🚀 Features
- Dashboard with summary cards for income and expenses
- Add, edit, and delete transactions
- Categorize income & expenses
- Category-based statistics with interactive pie charts (ECharts)
- Month/year navigation for stats
- Responsive and clean UI (Tailwind CSS)
- Dark mode support
- Toast notifications
- Authentication (Login page)

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS, React Router, ECharts (via echarts-for-react), react-hot-toast
- **Backend:** *(Planned: Node.js, Express)*
- **Database:** *(Planned: MongoDB Atlas)*

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/AjithkumarJM/Spendly
cd spendly
```

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure
- `src/App.jsx`: Main app entry, routing, and context providers
- `src/components/`: UI components (Layout, auth, transactions, stats, etc.)
- `src/pages/`: Page-level components (Dashboard, Transactions, Settings)
- `src/context/ScreenSizeContext.js`: Responsive design context

---

## 📝 Customization
- Update categories, colors, and currency in the relevant components.
- Add new pages or features as needed.

---

## 📄 License
MIT
