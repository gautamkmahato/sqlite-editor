import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import FilePicker from '../_components/FilePicker';

const FilePickerModal = ({ isOpen, onClose, handleSelectedFolder }) => {
  const [folder, setFolder] = useState(null);
  const [result, setResult] = useState([]);

  const handleSubmit = async (e) => { 
    handleSelectedFolder()
    onClose();
  };

  const handleFilePicker = (folder, result) =>{
    setFolder(folder);
    setResult(result);
    handleSelectedFolder(folder, result);
    //setIsSelectedFolderModalOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl bg-white p-2 rounded-lg">
        <div className="flex justify-between items-center">
          <div></div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className='mb-16'>
            <FilePicker handleFilePicker={handleFilePicker} />
        </div>
      </div>
    </div>
  );
};

export default FilePickerModal;