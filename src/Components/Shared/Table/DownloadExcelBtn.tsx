import React from 'react';
import * as XLSX from 'xlsx';

interface DownloadButtonProps {
  data: Array<Record<string, any>>;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ data }) => {
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  return (
    <button
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 "
      disabled={false}
      onClick={downloadExcel}
    >
      Download Excel
    </button>
  );
};

export default DownloadButton;
