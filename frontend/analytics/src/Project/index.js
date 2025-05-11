import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ProjectBar from './ProjectBar';
import Menubar from '../Menubar';
import DataSheet from './DataSheet';
import { initIndexedDB, saveProjectData, getProjectData } from '../utils/indexedDB.js';

export default function Project() {
  const { projectId } = useParams();
  const location = useLocation();
  const projectName = location.state?.projectName || 'Untitled';

  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [addRowFunction, setAddRowFunction] = useState(null);
  const [addColumnFunction, setAddColumnFunction] = useState(null);
  const [uploadedFilename, setUploadedFilename] = useState('');
  const [isDataSaved, setIsDataSaved] = useState(false);

  // 파일 업로드 전 더미데이터
  const generateDummyData = () => {
    const headers = Array.from({ length: 10 }, (_, i) => `Column${i + 1}`);
    const rows = Array.from({ length: 20 }, () =>
      headers.reduce((acc, h) => ({ ...acc, [h]: '' }), {})
    );
    return { headers, rows, filename: '' };
  };

  // 데이터 업로드시 indexed db에 저장, 조회, 뒤로 갔다 와도 유지
  const handleDataUpload = async (uploadedData, filename) => {
    const dataToSave = {
      ...uploadedData,
      filename,
    };

    // 1. 저장
    await saveProjectData(projectId, dataToSave);
    console.log(`saved to indexed db object: ${projectId}`);

    // 2. 조회
    const stored = await getProjectData(projectId);
    if (stored && stored.headers && stored.rows) {
      setData({ headers: stored.headers, rows: stored.rows });
      setUploadedFilename(stored.filename || '');
    } else {
      console.warn(`fail to indexed db object: ${projectId}`);
    }
  };

  // project page 진입시 실행함수(데이터 load)
  useEffect(() => {
    if (projectId) {
      loadData();
    }
  }, [projectId, location.key]);

  // const loadData = async () => {
  //   await initIndexedDB();
  //   const stored = await getProjectData(projectId);
  //   if (stored && stored.headers && stored.rows) {
  //     setData({ headers: stored.headers, rows: stored.rows });
  //     setUploadedFilename(stored.filename || '');
  //   }
  // };
  const loadData = async () => {
    await initIndexedDB();
    let stored = await getProjectData(projectId);

    // 없는 경우 더미 데이터 저장
    if (!stored || !stored.headers || !stored.rows) {
      const dummy = generateDummyData();
      await saveProjectData(projectId, dummy);
      stored = dummy;
      console.log(`📦 더미 데이터 저장됨: ${projectId}`);
    }

    setData({ headers: stored.headers, rows: stored.rows });
    setUploadedFilename(stored.filename || '');
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
          projectId={projectId}
        />
      </div>
    </div>
  );
}
