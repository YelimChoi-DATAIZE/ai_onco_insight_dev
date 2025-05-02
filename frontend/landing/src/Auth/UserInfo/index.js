import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      // 사용자 정보가 없으면 회원가입 페이지로 이동
      navigate("/");
    }
  }, [navigate]);

  if (!userInfo) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>사용자 정보</h1>
      <img
        src={userInfo.picture}
        alt="User Profile"
        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
      />
      <p>
        <strong>Name:</strong> {userInfo.name}
      </p>
      <p>
        <strong>Email:</strong> {userInfo.email}
      </p>
      <p>
        <strong>Nickname:</strong> {userInfo.nickname}
      </p>
      <p>
        <strong>Company:</strong> {userInfo.company}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(userInfo.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default UserInfo;
