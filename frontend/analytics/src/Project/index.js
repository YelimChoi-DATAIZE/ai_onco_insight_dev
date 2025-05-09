import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import ProjectBar from './ProjectBar';
import Menubar from '../Menubar';
import DataSheet from './DataSheet';
import { openDB } from 'idb';

const DB_NAME = 'AnalyticsDB';
const STORE_NAME = 'uploadedData';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

const saveDataToDB = async (data) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.put(data, 'data');
  await tx.done;
  console.log('IndexedDB에 데이터 저장 완료:', data);
};

const getDataFromDB = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return await store.get('data');
};

export default function Project() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [addRowFunction, setAddRowFunction] = useState(null);
  const [addColumnFunction, setAddColumnFunction] = useState(null);
  const [uploadedFilename, setUploadedFilename] = useState('');
  const location = useLocation();
  const projectName = location.state?.projectName || 'Untitled';

  useEffect(() => {
    const fetchDataFromDB = async () => {
      const storedData = await getDataFromDB();
      if (storedData) {
        setData(storedData);
      }
    };
    fetchDataFromDB();
  }, []);

  const handleDataUpload = async (uploadedData, filename) => {
    await saveDataToDB(uploadedData);
    const updatedData = await getDataFromDB();
    setData(updatedData);
    setUploadedFilename(filename);
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1300 }}>
        <Menubar />
        <ProjectBar
          onUpload={handleDataUpload}
          setActiveTab={setActiveTab}
          addRow={addRowFunction}
          addColumn={addColumnFunction}
        />
      </div>

      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          marginTop: '155px',
        }}
      >
        <DataSheet
          activeTab={activeTab}
          setAddRowFunction={setAddRowFunction}
          setAddColumnFunction={setAddColumnFunction}
          data={data}
          filename={uploadedFilename}
          projectName={projectName}
        />
      </div>
    </div>
  );
}
