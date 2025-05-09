import { openDB } from 'idb';

const DB_NAME = 'AnalyticsDB';

export const ensureObjectStore = async (projectId) => {
  const db = await openDB(DB_NAME);
  if (!db.objectStoreNames.contains(projectId)) {
    const upgraded = await openDB(DB_NAME, db.version + 1, {
      upgrade(upgradeDB) {
        if (!upgradeDB.objectStoreNames.contains(projectId)) {
          upgradeDB.createObjectStore(projectId);
        }
      },
    });
    return upgraded;
  }
  return db;
};

export const saveDataToDB = async (projectId, data) => {
  const db = await ensureObjectStore(projectId);
  const tx = db.transaction(projectId, 'readwrite');
  const store = tx.objectStore(projectId);
  await store.put(data, 'data');
  await tx.done;
  console.log(`✅ Saved for ${projectId}`);
};

export const deleteDataFromDB = async (projectId) => {
  const db = await ensureObjectStore(projectId);
  const tx = db.transaction(projectId, 'readwrite');
  const store = tx.objectStore(projectId);
  await store.delete('data');
  await tx.done;
  console.log(`🗑 Deleted for ${projectId}`);
};
