// import React, { useState, useEffect } from 'react';
// import { Route, Routes, Navigate, useLocation, useParams } from 'react-router-dom';

// import ProjectBar from './ProjectBar';
// import Menubar from '../Menubar';
// import DataSheet from './DataSheet';
// import { openDB } from 'idb';

// const DB_NAME = 'AnalyticsDB';

// // const initDB = async (projectId) => {
// //   return openDB(DB_NAME, 1, {
// //     upgrade(db) {
// //       if (!db.objectStoreNames.contains(projectId)) {
// //         db.createObjectStore(projectId);
// //       }
// //     },
// //   });
// // };

// // ✅ object store 존재 보장 함수
// const ensureObjectStoreExists = async (projectId) => {
//   const db = await openDB(DB_NAME, 1);
//   if (!db.objectStoreNames.contains(projectId)) {
//     db.close(); // 꼭 닫아야 upgrade 트리거됨
//     await openDB(DB_NAME, 1, {
//       upgrade(db) {
//         if (!db.objectStoreNames.contains(projectId)) {
//           db.createObjectStore(projectId);
//         }
//       },
//     });
//   }
// };

// // ✅ IndexedDB 조회
// const getDataFromDB = async (projectId) => {
//   await ensureObjectStoreExists(projectId);
//   const db = await openDB(DB_NAME, 1);
//   const tx = db.transaction(projectId, 'readonly');
//   const store = tx.objectStore(projectId);
//   return await store.get('data');
// };

// // ✅ IndexedDB 저장
// const saveDataToDB = async (projectId, data) => {
//   await ensureObjectStoreExists(projectId);
//   const db = await openDB(DB_NAME, 1);
//   const tx = db.transaction(projectId, 'readwrite');
//   const store = tx.objectStore(projectId);
//   await store.put(data, 'data');
//   await tx.done;
// };

// export default function Project() {
//   const { projectId } = useParams();

//   const [data, setData] = useState(null);
//   const [activeTab, setActiveTab] = useState(null);
//   const [addRowFunction, setAddRowFunction] = useState(null);
//   const [addColumnFunction, setAddColumnFunction] = useState(null);
//   const [uploadedFilename, setUploadedFilename] = useState('');
//   const location = useLocation();
//   const projectName = location.state?.projectName || 'Untitled';

//   // fetch
//   useEffect(() => {
//     const fetchDataFromDB = async () => {
//       const storedData = await getDataFromDB(projectId);
//       if (storedData) setData(storedData);
//     };
//     fetchDataFromDB();
//   }, [projectId]);

//   // upload
//   const handleDataUpload = async (uploadedData, filename) => {
//     await saveDataToDB(projectId, uploadedData);
//     const updatedData = await getDataFromDB(projectId);
//     setData(updatedData);
//     setUploadedFilename(filename);
//   };

//   useEffect(() => {
//     const setupAndFetch = async () => {
//       const storedData = await getDataFromDB(projectId);
//       if (storedData) setData(storedData);
//     };
//     if (projectId) setupAndFetch();
//   }, [projectId]);

//   return (
//     <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//       <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1300 }}>
//         <Menubar />
//         <ProjectBar
//           onUpload={handleDataUpload}
//           setActiveTab={setActiveTab}
//           addRow={addRowFunction}
//           addColumn={addColumnFunction}
//         />
//       </div>

//       <div
//         style={{
//           flexGrow: 1,
//           overflowY: 'auto',
//           marginTop: '155px',
//         }}
//       >
//         <DataSheet
//           activeTab={activeTab}
//           setAddRowFunction={setAddRowFunction}
//           setAddColumnFunction={setAddColumnFunction}
//           data={data}
//           filename={uploadedFilename}
//           projectName={projectName}
//           projectId={projectId}
//         />
//       </div>
//     </div>
//   );
// }
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

// object store가 존재하는지 확인하는 함수
// IndexedDB에서 데이터 조회 함수
const getDataFromDB = async (projectId) => {
  try {
    // Ensure the object store exists before performing any transactions
    await ensureObjectStoreExists(projectId); // 먼저 object store가 있는지 확인

    const db = await openDB(DB_NAME, 2); // DB 열기 (버전 2로 설정)
    const tx = db.transaction(projectId, 'readonly'); // 트랜잭션 시작
    const store = tx.objectStore(projectId); // object store 가져오기

    const storedData = await store.get('data'); // 저장된 데이터 조회
    await tx.done; // 트랜잭션 완료

    return storedData; // 조회된 데이터 반환
  } catch (error) {
    console.error('Error fetching data from IndexedDB:', error);
    return null; // 오류 발생 시 null 반환
  }
};

// Ensure Object Store Exists (업그레이드가 필요할 때만 object store 생성)
const ensureObjectStoreExists = async (projectId) => {
  try {
    const db = await openDB(DB_NAME, 2, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(projectId)) {
          console.log(`Creating object store for ${projectId}`);
          db.createObjectStore(projectId);
        }
      },
    });
    console.log(`Object store check complete for ${projectId}`);
  } catch (error) {
    console.error('Error ensuring object store exists:', error);
  }
};

// IndexedDB에 데이터 저장 함수
const saveDataToDB = async (projectId, data) => {
  try {
    const db = await openDB(DB_NAME, 2, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(projectId)) {
          console.log(`Creating object store for ${projectId}`);
          db.createObjectStore(projectId);
        }
      },
    });

    const tx = db.transaction(projectId, 'readwrite');
    const store = tx.objectStore(projectId);

    await store.put(data, 'data');
    await tx.done;

    console.log(`Data saved successfully for project: ${projectId}`);
  } catch (error) {
    console.error('Error saving data to IndexedDB:', error);
  }
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

  // IndexedDB에서 데이터 조회
  useEffect(() => {
    const fetchDataFromDB = async () => {
      try {
        const storedData = await getDataFromDB(projectId);
        if (storedData) {
          setData(storedData);
        } else {
          setData({ headers: [], rows: [] });
        }
      } catch (error) {
        console.error('Error fetching from IndexedDB:', error);
        setData({ headers: [], rows: [] });
      }
    };

    fetchDataFromDB();
  }, [projectId]);

  // 데이터 업로드 처리
  const handleDataUpload = async (uploadedData, filename) => {
    await saveDataToDB(projectId, uploadedData);
    setUploadedFilename(filename);
    setData(uploadedData);
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
