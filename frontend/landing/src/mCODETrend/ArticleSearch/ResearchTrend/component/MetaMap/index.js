import React from "react";
import ReactFlow, { MiniMap, Controls, Background, Handle } from "reactflow";
import "reactflow/dist/style.css";

const nodeTypes = {
  default: ({ data }) => (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#f0f9ff",
        minWidth: "150px",
        textAlign: "center",
      }}
    >
      <Handle type="target" position="top" />
      <div>{data.label}</div>
      <Handle type="source" position="bottom" />
    </div>
  ),
};

const initialNodes = [
  {
    id: "1",
    type: "default",
    position: { x: 300, y: 50 },
    data: { label: "Cross-Cultural Challenges" },
  },
  {
    id: "2",
    type: "default",
    position: { x: 100, y: 150 },
    data: { label: "Communication Barriers" },
  },
  {
    id: "3",
    type: "default",
    position: { x: 500, y: 150 },
    data: { label: "Team Dynamics" },
  },
  {
    id: "4",
    type: "default",
    position: { x: 300, y: 350 },
    data: { label: "Management Styles" },
  },
  {
    id: "5",
    type: "default",
    position: { x: 100, y: 500 },
    data: { label: "Training and Development" },
  },
  {
    id: "6",
    type: "default",
    position: { x: 500, y: 500 },
    data: { label: "Global Strategy" },
  },

  // Additional Nodes for each category
  {
    id: "7",
    type: "default",
    position: { x: 0, y: 250 },
    data: { label: "Language Differences" },
  },
  {
    id: "8",
    type: "default",
    position: { x: 200, y: 250 },
    data: { label: "Nonverbal Communication" },
  },
  {
    id: "9",
    type: "default",
    position: { x: 400, y: 250 },
    data: { label: "Diverse Perspectives" },
  },
  {
    id: "10",
    type: "default",
    position: { x: 600, y: 250 },
    data: { label: "Conflict Resolution" },
  },
  {
    id: "11",
    type: "default",
    position: { x: 200, y: 450 },
    data: { label: "Leadership Approaches" },
  },
  {
    id: "12",
    type: "default",
    position: { x: 400, y: 450 },
    data: { label: "Decision-Making Processes" },
  },
  {
    id: "13",
    type: "default",
    position: { x: 0, y: 600 },
    data: { label: "Cultural Competence Training" },
  },
  {
    id: "14",
    type: "default",
    position: { x: 200, y: 600 },
    data: { label: "Continuous Learning" },
  },
  {
    id: "15",
    type: "default",
    position: { x: 400, y: 600 },
    data: { label: "Local Market Adaptation" },
  },
  {
    id: "16",
    type: "default",
    position: { x: 600, y: 600 },
    data: { label: "Flexibility in Policies" },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e1-4", source: "1", target: "4" },
  { id: "e1-5", source: "1", target: "5" },
  { id: "e1-6", source: "1", target: "6" },
  { id: "e2-7", source: "2", target: "7" },
  { id: "e2-8", source: "2", target: "8" },
  { id: "e3-9", source: "3", target: "9" },
  { id: "e3-10", source: "3", target: "10" },
  { id: "e4-11", source: "4", target: "11" },
  { id: "e4-12", source: "4", target: "12" },
  { id: "e5-13", source: "5", target: "13" },
  { id: "e5-14", source: "5", target: "14" },
  { id: "e6-15", source: "6", target: "15" },
  { id: "e6-16", source: "6", target: "16" },
];

const CrossCulturalChallengesMindMap = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        style={{ background: "#e0f7fa" }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default CrossCulturalChallengesMindMap;
