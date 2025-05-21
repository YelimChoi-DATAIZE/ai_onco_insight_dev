import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Project from './Project';
import Console from './Console';

const App = () => {
  //get token from localStorage(개발환경에서만)
  // useEffect(() => {
  //   const receiveMessage = (event) => {
  //     if (event.origin === 'http://localhost:3000' && event.data.type === 'TOKEN_TRANSFER') {
  //       localStorage.setItem('accessToken', event.data.token);
  //       // 이후 자동 로그인 로직 실행 가능
  //     }
  //   };

  //   window.addEventListener('message', receiveMessage);
  //   return () => window.removeEventListener('message', receiveMessage);
  // }, []);
  useEffect(() => {
    const receiveMessage = (event) => {
      console.log('📩 메시지 수신됨:', event.origin, event.data); // 디버깅용
      if (event.origin.includes('localhost') && event.data.type === 'TOKEN_TRANSFER') {
        localStorage.setItem('accessToken', event.data.token);
        console.log('✅ accessToken 저장 완료:', event.data.token);
      }
    };

    window.addEventListener('message', receiveMessage);
    return () => window.removeEventListener('message', receiveMessage);
  }, []);

  return (
    <div style={{ minWidth: '1280px', height: '100vh', overflowX: 'auto' }}>
      <Routes>
        <Route path="/console" element={<Console />} />
        <Route path="*" element={<Navigate to="/console" />} />
        <Route path="/project/:projectId" element={<Project />} />
      </Routes>
    </div>
  );
};

export default App;
