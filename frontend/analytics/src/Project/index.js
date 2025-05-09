import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useParams } from 'react-router-dom';

import ProjectBar from './ProjectBar';
import Menubar from '../Menubar';
import DataSheet from './DataSheet';
import { openDB } from 'idb';

const DB_NAME = 'AnalyticsDB';

// const initDB = async (projectId) => {
//   return openDB(DB_NAME, 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains(projectId)) {
//         db.createObjectStore(projectId);
//       }
//     },
//   });
// };

// ✅ object store 존재 보장 함수
const ensureObjectStoreExists = async (projectId) => {
  const db = await openDB(DB_NAME, 1);
  if (!db.objectStoreNames.contains(projectId)) {
    db.close(); // 꼭 닫아야 upgrade 트리거됨
    await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(projectId)) {
          db.createObjectStore(projectId);
        }
      },
    });
  }
};

// ✅ IndexedDB 조회
const getDataFromDB = async (projectId) => {
  await ensureObjectStoreExists(projectId);
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(projectId, 'readonly');
  const store = tx.objectStore(projectId);
  return await store.get('data');
};

// ✅ IndexedDB 저장
const saveDataToDB = async (projectId, data) => {
  await ensureObjectStoreExists(projectId);
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(projectId, 'readwrite');
  const store = tx.objectStore(projectId);
  await store.put(data, 'data');
  await tx.done;
};

export default function Project() {
  const { projectId } = useParams();

  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [addRowFunction, setAddRowFunction] = useState(null);
  const [addColumnFunction, setAddColumnFunction] = useState(null);
  const [uploadedFilename, setUploadedFilename] = useState('');
  const location = useLocation();
  const projectName = location.state?.projectName || 'Untitled';

  // fetch
  useEffect(() => {
    const fetchDataFromDB = async () => {
      const storedData = await getDataFromDB(projectId);
      if (storedData) setData(storedData);
    };
    fetchDataFromDB();
  }, [projectId]);

  // upload
  const handleDataUpload = async (uploadedData, filename) => {
    await saveDataToDB(projectId, uploadedData);
    const updatedData = await getDataFromDB(projectId);
    setData(updatedData);
    setUploadedFilename(filename);
  };

  useEffect(() => {
    const setupAndFetch = async () => {
      const storedData = await getDataFromDB(projectId);
      if (storedData) setData(storedData);
    };
    if (projectId) setupAndFetch();
  }, [projectId]);

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
          projectId={projectId}
        />
      </div>
    </div>
  );
}
