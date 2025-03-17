// src/components/FileUpload.tsx
'use client'
import React, { useState, ChangeEvent } from 'react';
import { Button } from './ui/button';

const FileUpload: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      // Further file processing can be added here.
    }
  };

  return (
    <div className="flex items-center space-x-3 mb-2">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <Button variant="outline">Upload File</Button>
      </label>
      {fileName && (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {fileName}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
