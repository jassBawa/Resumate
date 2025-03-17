// src/app/settings/page.tsx
'use client'
import React, { useState } from 'react';
import PreTrainingUpload from '@/components/PreTrainingUpload';
import MultipleFileUpload from '@/components/MultiFileUpload';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pretraining' | 'rag'>(
    'pretraining'
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('pretraining')}
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === 'pretraining'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-900'
          }`}
        >
          Pre-Training Files
        </button>
        <button
          onClick={() => setActiveTab('rag')}
          className={`px-4 py-2 rounded ${
            activeTab === 'rag'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-900'
          }`}
        >
          RAG Upload
        </button>
      </div>
      {activeTab === 'pretraining' ? (
        <PreTrainingUpload />
      ) : (
        <MultipleFileUpload />
      )}
    </div>
  );
};

export default SettingsPage;
