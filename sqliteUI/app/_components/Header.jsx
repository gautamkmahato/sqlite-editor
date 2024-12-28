// components/sql-editor/Header.js
import { Database } from 'lucide-react';
import Link from 'next/link';
import FilePicker from '../_components/FilePicker'

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <Link href="/">
        <div className="flex items-center space-x-2">
          <Database className="w-6 h-6" />
          <h1 className="text-xl font-semibold">SQL Lab</h1>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-gray-600 hover:text-gray-900">
          Home
        </Link>
        <Link href="/sql" className="text-gray-600 hover:text-gray-900">
          Database
        </Link>
        <Link href="/documentation" className="text-gray-600 hover:text-gray-900">
          Documentation
        </Link>
        {/* <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Connect Database
        </button> */}
      </div>
    </div>

  );
};

export default Header;