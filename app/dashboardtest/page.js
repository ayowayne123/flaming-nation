import React from 'react';
import DashboardLayout from './dashboardlayout';

const Page = () => {
  const cardData = [
    { title: 'Total Users', value: '1,234' },
    { title: 'Total Revenue', value: '$10,345' },
    { title: 'Total Orders', value: '456' }
    // Add more card data as needed
  ];

  const tableData = {
    headers: ['ID', 'Name', 'Email'],
    rows: Array.from(Array(20), (_, index) => [`#${index + 1}`, `User ${index + 1}`, `user${index + 1}@example.com`])
    // Adjust the number of rows as needed
  };

  return (
    <DashboardLayout cardData={cardData} tableData={tableData} />
  );
};

export default Page;
