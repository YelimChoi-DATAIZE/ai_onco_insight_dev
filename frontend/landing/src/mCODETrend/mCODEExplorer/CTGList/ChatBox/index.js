// import React, { useState } from "react";
// import {
//   Drawer,
//   Box,
//   TextField,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = () => {
//     if (input.trim() !== "") {
//       setMessages([...messages, { text: input, sender: "user" }]);
//       setInput("");
//       // 여기에서 AI 또는 서버 응답을 추가할 수 있음
//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           { text: "This is an AI response!", sender: "ai" },
//         ]);
//       }, 1000);
//     }
//   };

//   return (
//     <Drawer
//       anchor="right"
//       variant="permanent"
//       sx={{
//         width: 300,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": { width: 300, boxSizing: "border-box" },
//       }}
//     >
//       <Box
//         sx={{
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           padding: 2,
//         }}
//       >
//         <List sx={{ flexGrow: 1, overflowY: "auto" }}>
//           {messages.map((msg, index) => (
//             <ListItem
//               key={index}
//               sx={{
//                 justifyContent:
//                   msg.sender === "user" ? "flex-end" : "flex-start",
//               }}
//             >
//               <ListItemText
//                 sx={{
//                   bgcolor: msg.sender === "user" ? "#1976d2" : "#f0f0f0",
//                   color: msg.sender === "user" ? "#fff" : "#000",
//                   borderRadius: 2,
//                   padding: 1,
//                   maxWidth: "75%",
//                 }}
//                 primary={msg.text}
//               />
//             </ListItem>
//           ))}
//         </List>
//         <Box sx={{ display: "flex", alignItems: "center", paddingTop: 1 }}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             size="small"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <IconButton color="primary" onClick={sendMessage}>
//             <SendIcon />
//           </IconButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default ChatBox;
// import React, { useState } from "react";
// import {
//   Drawer,
//   Box,
//   TextField,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   CircularProgress,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (input.trim() === "") return;

//     const userMessage = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch(
//         "http://3.38.200.207:8000/dataizeai_api/pubmed_vector_search",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             query: input,
//             top_k: 3,
//           }),
//         }
//       );

//       const data = await res.json();
//       const aiMessage = {
//         text: data.response || "No response from AI.",
//         sender: "ai",
//       };
//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (err) {
//       console.error("API Error:", err);
//       setMessages((prev) => [
//         ...prev,
//         { text: "❌ Failed to get AI response.", sender: "ai" },
//       ]);
//     }
//     setLoading(false);
//   };

//   return (
//     <Drawer
//       anchor="right"
//       variant="permanent"
//       sx={{
//         width: 300,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": { width: 300, boxSizing: "border-box" },
//       }}
//     >
//       <Box
//         sx={{
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           padding: 2,
//         }}
//       >
//         <List sx={{ flexGrow: 1, overflowY: "auto" }}>
//           {messages.map((msg, index) => (
//             <ListItem
//               key={index}
//               sx={{
//                 justifyContent:
//                   msg.sender === "user" ? "flex-end" : "flex-start",
//               }}
//             >
//               <ListItemText
//                 sx={{
//                   bgcolor: msg.sender === "user" ? "#1976d2" : "#f0f0f0",
//                   color: msg.sender === "user" ? "#fff" : "#000",
//                   borderRadius: 2,
//                   padding: 1,
//                   maxWidth: "75%",
//                 }}
//                 primary={msg.text}
//               />
//             </ListItem>
//           ))}
//           {loading && (
//             <ListItem>
//               <CircularProgress size={20} />
//             </ListItem>
//           )}
//         </List>

//         {/* 입력창 */}
//         <Box sx={{ display: "flex", alignItems: "center", paddingTop: 1 }}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             size="small"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Ask about PubMed articles..."
//           />
//           <IconButton color="primary" onClick={sendMessage}>
//             <SendIcon />
//           </IconButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default ChatBox;
import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(300);
  const isResizing = useRef(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://3.38.200.207:8000/dataizeai_api/pubmed_vector_search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: input, top_k: 3 }),
        },
      );

      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "ai" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "❌ Failed to get AI response.", sender: "ai" },
      ]);
    }

    setLoading(false);
  };

  const startResize = (e) => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleResizing);
    document.addEventListener("mouseup", stopResize);
  };

  const handleResizing = (e) => {
    if (isResizing.current) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 250 && newWidth <= 600) {
        setDrawerWidth(newWidth);
      }
    }
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleResizing);
    document.removeEventListener("mouseup", stopResize);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100%",
        width: `${drawerWidth}px`,
        backgroundColor: "#fff",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid #ccc",
      }}
    >
      {/* 드래그 핸들 */}
      <Box
        onMouseDown={startResize}
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          cursor: "ew-resize",
          zIndex: 1201,
          backgroundColor: "transparent",
        }}
      />

      {/* 채팅 내용 */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                sx={{
                  bgcolor: msg.sender === "user" ? "#1976d2" : "#f0f0f0",
                  color: msg.sender === "user" ? "#fff" : "#000",
                  borderRadius: 2,
                  p: 1,
                  maxWidth: "75%",
                }}
                primary={msg.text}
              />
            </ListItem>
          ))}
          {loading && (
            <ListItem>
              <CircularProgress size={20} />
            </ListItem>
          )}
        </List>
      </Box>

      {/* 입력 영역 */}
      <Box sx={{ display: "flex", p: 2, borderTop: "1px solid #ccc" }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask PubMed..."
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBox;
