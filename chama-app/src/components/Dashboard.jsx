import React, { useState } from "react";

const Dashboard = () => {
  // Sample data
  const savingsData = [
    { month: "Jan", amount: 45000 },
    { month: "Feb", amount: 52000 },
    { month: "Mar", amount: 49000 },
    { month: "Apr", amount: 63000 },
    { month: "May", amount: 58000 },
    { month: "Jun", amount: 71000 },
  ];

  // Custom hook for chart hover
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Calculate chart dimensions
  const chartWidth = 600;
  const chartHeight = 300;
  const padding = 40;
  const graphWidth = chartWidth - 2 * padding;
  const graphHeight = chartHeight - 2 * padding;

  // Calculate scales
  const maxAmount = Math.max(...savingsData.map((d) => d.amount));
  const points = savingsData.map((d, i) => ({
    x: i * (graphWidth / (savingsData.length - 1)) + padding,
    y: chartHeight - (d.amount / maxAmount) * graphHeight - padding,
    amount: d.amount,
    month: d.month,
  }));

  return (
    <div className="p-4 bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Chama Dashboard</h1>
        <p className="text-slate-600">Welcome back, James Kamau</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Total Savings",
            value: "KSh 285,400",
            change: "+12.5%",
            positive: true,
          },
          {
            title: "Active Loans",
            value: "KSh 125,000",
            change: "3 loans",
            positive: false,
          },
          {
            title: "Members",
            value: "24",
            change: "+2 new",
            positive: true,
          },
          {
            title: "Next Meeting",
            value: "5 Days",
            change: "Dec 5th",
            positive: true,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-slate-200"
          >
            <h3 className="text-sm text-slate-600">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-800 mt-1">
              {stat.value}
            </p>
            <p
              className={`text-sm mt-1 ${
                stat.positive ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Custom SVG Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4">Savings Trend</h3>
          <div className="relative">
            <svg width={chartWidth} height={chartHeight} className="max-w-full">
              {/* Grid lines */}
              {[...Array(5)].map((_, i) => (
                <g key={i}>
                  <line
                    x1={padding}
                    y1={padding + (i * graphHeight) / 4}
                    x2={chartWidth - padding}
                    y2={padding + (i * graphHeight) / 4}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                  <text
                    x={padding - 10}
                    y={padding + (i * graphHeight) / 4}
                    textAnchor="end"
                    className="text-xs fill-slate-500"
                  >
                    {Math.round((maxAmount - (i * maxAmount) / 4) / 1000)}K
                  </text>
                </g>
              ))}

              {/* X-axis labels */}
              {savingsData.map((d, i) => (
                <text
                  key={i}
                  x={padding + i * (graphWidth / (savingsData.length - 1))}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  className="text-xs fill-slate-500"
                >
                  {d.month}
                </text>
              ))}

              {/* Line */}
              <path
                d={`M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}`}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
              />

              {/* Data points */}
              {points.map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#2563eb"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {hoveredPoint === i && (
                    <g>
                      <rect
                        x={point.x - 40}
                        y={point.y - 40}
                        width="80"
                        height="30"
                        fill="white"
                        stroke="#e2e8f0"
                        rx="4"
                      />
                      <text
                        x={point.x}
                        y={point.y - 20}
                        textAnchor="middle"
                        className="text-sm"
                      >
                        KSh {point.amount.toLocaleString()}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              {
                type: "Contribution",
                amount: 5000,
                member: "Jane Doe",
                date: "Today",
              },
              {
                type: "Loan Payment",
                amount: 15000,
                member: "John Smith",
                date: "Yesterday",
              },
              {
                type: "Project Expense",
                amount: -25000,
                member: "Admin",
                date: "2 days ago",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-slate-800">
                    {transaction.type}
                  </p>
                  <p className="text-sm text-slate-600">{transaction.member}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount.toLocaleString()} KSh
                  </p>
                  <p className="text-sm text-slate-600">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
