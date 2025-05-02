import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ProjectBar from "./ProjectBar";
import Menubar from "./Menubar";
import DataSheet from "./DataSheet";
import { openDB } from "idb";

const DB_NAME = "AnalyticsDB";
const STORE_NAME = "uploadedData";

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
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put(data, "data");
  await tx.done;
  console.log("IndexedDB에 데이터 저장 완료:", data);
};

const getDataFromDB = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return await store.get("data");
};

const Analytics = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [addRowFunction, setAddRowFunction] = useState(null);
  const [addColumnFunction, setAddColumnFunction] = useState(null);

  useEffect(() => {
    const fetchDataFromDB = async () => {
      const storedData = await getDataFromDB();
      if (storedData) {
        console.log("새로고침 후 IndexedDB에서 불러온 데이터:", storedData);
        setData(storedData);
      }
    };
    fetchDataFromDB();
  }, []);

  const handleDataUpload = async (uploadedData) => {
    await saveDataToDB(uploadedData);
    const updatedData = await getDataFromDB();
    setData(updatedData);
  };

  return (
    <>
      <Menubar />
      <ProjectBar
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onUpload={handleDataUpload}
        setActiveTab={setActiveTab}
        addRow={addRowFunction}
        addColumn={addColumnFunction}
      />
      <DataSheet
        open={open}
        activeTab={activeTab}
        setAddRowFunction={setAddRowFunction}
        setAddColumnFunction={setAddColumnFunction}
        data={data}
      />
    </>
  );
};

const App = () => {
  return (
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Navigate to="/analytics" />} />
      </Routes>
  );
};

export default App;
