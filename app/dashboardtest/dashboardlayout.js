import React from 'react';

const DashboardLayout = ({ children, cardData, tableData }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 flex-none fixed top-0 left-0 h-full">
        {/* Sidebar content */}
        <nav className="mt-10">
          <ul>
            <li className="px-4 py-2 cursor-pointer">Dashboard</li>
            <li className="px-4 py-2 cursor-pointer">Analytics</li>
            {/* Add more sidebar items as needed */}
          </ul>
        </nav>
      </div>
      {/* Main content */}
      <div className="flex-grow">
        {/* Cards section */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {cardData.map((card, index) => (
              <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Table section */}
        <div className="overflow-auto">
          <table className="min-w-full bg-white">
            {/* Table headers */}
            <thead>
              <tr>
                {tableData.headers.map((header, index) => (
                  <th key={index} className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="bg-white">
              {tableData.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
