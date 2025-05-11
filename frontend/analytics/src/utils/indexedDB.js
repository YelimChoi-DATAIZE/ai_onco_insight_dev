import { openDB } from 'idb';

const DB_NAME = 'AnalyticsDB';
const DB_VERSION = 1;
const STORE_NAME = 'projects';

// 최초 1회 store 생성
export const initIndexedDB = async () => {
  await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
        console.log(`✅ object store 'projects' created`);
      }
    },
  });
};

// 데이터 저장: key = projectId, value = { headers, rows }
export const saveProjectData = async (projectId, data) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).put(data, projectId);
  await tx.done;
};

// 데이터 조회: key = projectId
export const getProjectData = async (projectId) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  const tx = db.transaction(STORE_NAME, 'readonly');
  const data = await tx.objectStore(STORE_NAME).get(projectId);
  await tx.done;
  return data;
};

// 데이터 삭제
export const deleteProjectData = async (projectId) => {
  const db = await openDB('AnalyticsDB', 1);
  const tx = db.transaction('projects', 'readwrite');
  await tx.objectStore('projects').delete(projectId);
  await tx.done;
  console.log(`🗑️ 프로젝트 데이터 삭제됨: ${projectId}`);
};
