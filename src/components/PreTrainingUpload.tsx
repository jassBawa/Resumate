// src/components/PreTrainingUpload.tsx
'use client'
import React, { useState, ChangeEvent } from 'react';
import { Button } from './ui/button';

const PreTrainingUpload: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      // Implement your pre-training file upload logic here.
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">Upload Pre-Training File</h2>
      <div className="flex items-center space-x-3">
        <input
          type="file"
          id="pretraining-upload"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="pretraining-upload" className="cursor-pointer">
          <Button variant="outline">Choose File</Button>
        </label>
        {fileName && (
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {fileName}
          </span>
        )}
      </div>
    </div>
  );
};

export default PreTrainingUpload;
