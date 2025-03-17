// src/components/MultipleFileUpload.tsx
'use client'
import React, { useState, ChangeEvent } from 'react';
import { Button } from './ui/button';

const MultipleFileUpload: React.FC = () => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) => file.name);
      setFileNames(files);
      // Implement your multiple file upload logic here.
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">Upload Files for RAG</h2>
      <div className="flex items-center space-x-3">
        <input
          type="file"
          id="rag-upload"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
        <label htmlFor="rag-upload" className="cursor-pointer">
          <Button variant="outline">Choose Files</Button>
        </label>
      </div>
      {fileNames.length > 0 && (
        <ul className="mt-4 space-y-1">
          {fileNames.map((name, idx) => (
            <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultipleFileUpload;
