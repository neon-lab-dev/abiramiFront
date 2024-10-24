/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as XLSX from 'xlsx';
import { ICONS } from '../../../assets';

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
      className=" px-4 flex items-center gap-2 py-2 text-sm bg-primary-10 text-white rounded-xl disabled:opacity-50 "
      disabled={false}
      onClick={downloadExcel}
    >
      <img src={ICONS.download} alt="" className='w-6 h-6'/>
      Download Excel
    </button>
  );
};

export default DownloadButton;
