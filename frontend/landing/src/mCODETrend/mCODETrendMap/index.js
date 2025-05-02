import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import CustomNode from "./NodeViz";

let id = 1;
const getId = () => `${id++}`;
const nodeOrigin = [0.5, 0];

const initialNodes = [
  // Central CancerPatient
  {
    id: "CancerPatient",
    data: { label: "Cancer Patient", paperCount: 23 },
    position: { x: 400, y: 400 },
    type: "custom",
    style: {
      background: "#92DAD8",
      fontWeight: "bold",
      border: "2px solid #92DAD8",
      width: 180,
      height: 120,
    },
  },
  {
    id: "HumanSpecimen",
    data: { label: "Human Specimen", paperCount: 3 },
    type: "custom",
    position: { x: 200, y: 400 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },
  {
    id: "Name",
    data: { label: "Name" },
    position: { x: 700, y: 300 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },
  {
    id: "Identifier",
    data: { label: "Identifier" },
    position: { x: 0, y: 400 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },
  {
    id: "CollectionSite",
    data: { label: "Collection Site" },
    position: { x: 0, y: 450 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },
  {
    id: "SpecimenType",
    data: { label: "Specimen Type" },
    position: { x: 0, y: 500 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },
  {
    id: "Contract Info",
    data: { label: "ContractInfo" },
    position: { x: 700, y: 50 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },
  {
    id: "Birth Date",
    data: { label: "BirthDate" },
    position: { x: 700, y: 100 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },
  {
    id: "Gender",
    data: { label: "Gender" },
    position: { x: 700, y: 150 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },
  {
    id: "Zip Code",
    data: { label: "ZipCode" },
    position: { x: 700, y: 200 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },
  {
    id: "US Core Race",
    data: { label: "USCoreRace" },
    position: { x: 700, y: 250 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },
  {
    id: "US Core BirthSex",
    data: { label: "USCoreBirthSex" },
    position: { x: 700, y: 300 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },
  {
    id: "US Core Ethnicity",
    data: { label: "USCoreEthnicity" },
    position: { x: 700, y: 350 },
    style: { background: "#92DAD8", border: "2px solid #92DAD8" },
  },

  // Disease Group #Part1
  {
    id: "CancerStage",
    data: { label: "Cancer Stage" },
    position: { x: -250, y: -250 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "LymphomaStage",
    data: { label: "Lymphoma Stage" },
    position: { x: -250, y: -340 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "StagingMethod",
    data: { label: "Staging Method" },
    position: { x: -250, y: -250 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "StageType",
    data: { label: "Stage Type" },
    position: { x: -250, y: -260 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },

  {
    id: "TNMStageGroup",
    data: { label: "TNM Stage Group" },
    position: { x: 200, y: -50 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "TCategory",
    data: { label: "T Category" },
    position: { x: 200, y: 0 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "NCategory",
    data: { label: "N Category" },
    position: { x: 200, y: 50 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "MCategory",
    data: { label: "M Category" },
    position: { x: 200, y: 100 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },

  {
    id: "HistologicGrade",
    data: { label: "Histologic Grade" },
    position: { x: 200, y: 150 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "TumorMorphology",
    data: { label: "Tumor Morphology" },
    position: { x: 200, y: 200 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  // Disease Group #Part2
  {
    id: "CancerRiskAssessment",
    data: { label: "Cancer Risk Assessment" },
    position: { x: 0, y: -80 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "PrimaryCancerCondition",
    data: { label: "Primary Cancer Condition" },
    position: { x: 0, y: 20 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "SecondaryCancerCondition",
    data: { label: "Secondary Cancer Condition" },
    position: { x: 0, y: 100 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "TumorMarkerTest",
    data: { label: "Tumor Marker Test" },
    position: { x: 0, y: 180 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  // Disease Group #Part3
  {
    id: "RiskMethod",
    data: { label: "Risk Method" },
    position: { x: -200, y: -50 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "RiskType",
    data: { label: "Risk Type" },
    position: { x: -200, y: 0 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },

  {
    id: "AssertedDate",
    data: { label: "Asserted Date" },
    position: { x: -200, y: 0 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "HistologyMorphology",
    data: { label: "Histology/Morphology" },
    position: { x: -200, y: 50 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "BodySite",
    data: { label: "Body Site" },
    position: { x: -200, y: 100 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "LateralityOrange",
    data: { label: "Laterality" },
    position: { x: -200, y: 150 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "LocationQualifierOrange",
    data: { label: "Location Qualifier" },
    position: { x: -200, y: 200 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },

  {
    id: "TestType",
    data: { label: "Test Type" },
    position: { x: 0, y: 250 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },
  {
    id: "ResultValue",
    data: { label: "Result Value" },
    position: { x: 0, y: 300 },
    style: { background: "#EDB369", border: "2px solid #EDB369" },
  },

  // Outcom Group
  {
    id: "Method",
    data: { label: "Method" },
    position: { x: 400, y: 150 },
    style: { background: "#E69CFF", border: "2px solid #E69CFF" },
  },
  {
    id: "TumorSize",
    data: { label: "Tumor Size" },
    position: { x: 400, y: 200 },
    style: { background: "#E69CFF", border: "2px solid #E69CFF" },
  },
  {
    id: "Tumor",
    data: { label: "Tumor" },
    position: { x: 400, y: 250 },
    style: { background: "#E69CFF", border: "2px solid #E69CFF" },
  },
  {
    id: "DeathDate",
    data: { label: "Death Date" },
    position: { x: 400, y: 300 },
    style: { background: "#E69CFF", border: "2px solid #E69CFF" },
  },
  {
    id: "LongestDimension",
    data: { label: "Longest Dimension" },
    position: { x: 600, y: 200 },
    style: { background: "#E69CFF", border: "2px solid #E69CFF" },
  },
  {
    id: "OtherDimension",
    data: { label: "Other Dimension" },
    position: { x: 600, y: 250 },
    style: { background: "#E69CFF", border: "2px solid #E69CFF" },
  },
  {
    id: "TumorIdentifier",
    data: { label: "Tumor Identifier" },
    position: { x: 600, y: 300 },
    style: { background: "#E69CFF", border: "2px solid #E69CFF" },
  },
  {
    id: "BodyLocation",
    data: { label: "Body Location" },
    position: { x: 600, y: 350 },
    style: { background: "#E69CFF", border: "2px solid #E69CFF" },
  },
  {
    id: "DiseaseStatus",
    data: { label: "Disease Status" },
    position: { x: 600, y: 400 },
    style: {
      background: "#E69CFF",
      border: "2px solid #E69CFF",
      transition: "all 0.3s ease",
    },
  },
  {
    id: "EvidenceType",
    data: { label: "Evidence Type" },
    position: { x: 600, y: 450 },
    style: {
      background: "#E69CFF",
      border: "2px solid #E69CFF",
      transition: "all 0.3s ease",
    },
  },

  // Treatment group #part1
  {
    id: "CancerRelatedMedicationAdministration",
    data: { label: "Cancer-Related Medication Administration" },
    position: { x: 800, y: -200 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "MedicationAdminMedication",
    data: { label: "Medication" },
    position: { x: 800, y: -150 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "CancerRelatedSurgicalProcedure",
    data: { label: "Cancer-Related Surgical Procedure" },
    position: { x: 800, y: -100 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "RadiotherapyCourseSummary",
    data: { label: "Radiotherapy Course Summary" },
    position: { x: 800, y: -50 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },

  // Treatment group #part2
  {
    id: "MedicationAdminReason",
    data: { label: "Reason" },
    position: { x: 1000, y: -140 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "MedicationAdminIntent",
    data: { label: "Procedure Intent" },
    position: { x: 1000, y: -100 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "MedicationAdminStatusReason",
    data: { label: "Status Reason" },
    position: { x: 1000, y: -60 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "MedicationAdminNormalizationBasis",
    data: { label: "Normalization Basis" },
    position: { x: 1000, y: -20 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "ProcedureCode",
    data: { label: "Procedure Code" },
    position: { x: 1000, y: -250 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "BodySite",
    data: { label: "Body Site" },
    position: { x: 1000, y: 100 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "Laterality",
    data: { label: "Laterality" },
    position: { x: 1000, y: 140 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "LocationQualifier",
    data: { label: "Location Qualifier" },
    position: { x: 1000, y: 180 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "NoSessions",
    data: { label: "No. Sessions" },
    position: { x: 1000, y: 250 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "ModalityTechnique",
    data: { label: "Modality/Technique" },
    position: { x: 1000, y: 290 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "Modality",
    data: { label: "Modality" },
    position: { x: 1000, y: 330 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "Technique",
    data: { label: "Technique" },
    position: { x: 1000, y: 370 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "DosesDelivered",
    data: { label: "Doses Delivered" },
    position: { x: 1000, y: 410 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "TotalDose",
    data: { label: "Total Dose" },
    position: { x: 1000, y: 450 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "NoFractions",
    data: { label: "No. Fractions" },
    position: { x: 1000, y: 490 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "BodyVolume",
    data: { label: "Body Volume" },
    position: { x: 1000, y: 530 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },

  {
    id: "RadiotherapyVolume",
    data: { label: "Radiotherapy Volume" },
    position: { x: 1000, y: 0 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "VolumeType",
    data: { label: "Volume Type" },
    position: { x: 1000, y: 600 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "VolumeLocation",
    data: { label: "Location" },
    position: { x: 1000, y: 640 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },
  {
    id: "VolumeLocationQualifier",
    data: { label: "Location Qualifier" },
    position: { x: 1000, y: 680 },
    style: { background: "#E9E600", border: "2px solid #E9E600" },
  },

  // Assessment group
  {
    id: "BodySurfaceArea",
    data: { label: "Body Surface Area" },
    position: { x: 830, y: 500 },
    style: { background: "#94B0FF", border: "2px solid #94B0FF" },
  },
  {
    id: "HistoryMetastaticCancer",
    data: { label: "History of Metastatic Cancer" },
    position: { x: 830, y: 550 },
    style: { background: "#94B0FF", border: "2px solid #94B0FF" },
  },
  {
    id: "Comorbidities",
    data: { label: "Comorbidities" },
    position: { x: 830, y: 600 },
    style: { background: "#94B0FF", border: "2px solid #94B0FF" },
  },
  {
    id: "ConditionPresent",
    data: { label: "Condition Present" },
    position: { x: 830, y: 580 },
    style: { background: "#94B0FF", border: "2px solid #94B0FF" },
  },
  {
    id: "ConditionAbsent",
    data: { label: "Condition Absent" },
    position: { x: 830, y: 620 },
    style: { background: "#94B0FF", border: "2px solid #94B0FF" },
  },
  {
    id: "ECOGStatus",
    data: { label: "ECOG/Karnofsky/Lansky Status" },
    position: { x: 830, y: 660 },
    style: { background: "#94B0FF", border: "2px solid #94B0FF" },
  },
  {
    id: "DeauvilleScale",
    data: { label: "Deauville Scale" },
    position: { x: 830, y: 720 },
    style: { background: "#94B0FF", border: "2px solid #94B0FF" },
  },
  {
    id: "RiskScore",
    data: { label: "Risk Score" },
    position: { x: 830, y: 660 },
    style: { background: "#94B0FF", border: "2px solid #94B0FF" },
  },
  {
    id: "Score",
    data: { label: "Score" },
    position: { x: 830, y: 700 },
    style: { background: "#94B0FF", border: "2px solid #94B0FF" },
  },
  {
    id: "Interpretation",
    data: { label: "Interpretation" },
    position: { x: 830, y: 740 },
    style: { background: "#94B0FF", border: "2px solid #94B0FF" },
  },

  // Genomics group
  {
    id: "GenomicRegionStudied",
    data: { label: "Genomic Region Studied" },
    position: { x: 500, y: 600 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "GenomicsReport",
    data: { label: "Genomics Report" },
    position: { x: 270, y: 600 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "GenomicVariant",
    data: { label: "Genomic Variant" },
    position: { x: 70, y: 600 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },

  // Genomic Variant Components
  {
    id: "PresentAbsent",
    data: { label: "Present/Absent" },
    position: { x: -100, y: 700 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "VariationCode",
    data: { label: "Variation Code" },
    position: { x: -100, y: 750 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "GenomicHGVS",
    data: { label: "Genomic HGVS" },
    position: { x: -100, y: 800 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "CodingChangeType",
    data: { label: "Coding Change Type" },
    position: { x: -100, y: 850 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "ProteinHGVS",
    data: { label: "Protein HGVS" },
    position: { x: -100, y: 900 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "AminoAcidChangeType",
    data: { label: "Amino Acid Change Type" },
    position: { x: -100, y: 950 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "MolecularConsequence",
    data: { label: "Molecular Consequence" },
    position: { x: -100, y: 1000 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "CytogenNomenclature",
    data: { label: "Cytogen. Nomenclature" },
    position: { x: -100, y: 1050 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },

  {
    id: "GeneStudied",
    data: { label: "Gene Studied", paperCount: 23 },
    position: { x: 100, y: 700 },
    type: "custom",
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "GenomicSourceClass",
    data: { label: "Genomic Source Class" },
    position: { x: 100, y: 750 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "CopyNumber",
    data: { label: "Copy Number" },
    position: { x: 100, y: 800 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "AllelicFrequency",
    data: { label: "Allelic Frequency" },
    position: { x: 100, y: 850 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "AllelicState",
    data: { label: "Allelic State" },
    position: { x: 100, y: 900 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "CytogeneticLocation",
    data: { label: "Cytogenetic Location" },
    position: { x: 100, y: 950 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },

  // Genomics Report Components
  {
    id: "TestCode",
    data: { label: "Test Code" },
    position: { x: 220, y: 650 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },

  // Genomic Region Studied Components
  {
    id: "GeneMutations",
    data: { label: "Gene Mutations" },
    position: { x: 400, y: 650 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "GeneStudied",
    data: { label: "Gene Studied" },
    position: { x: 400, y: 700 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "CoordinateSystem",
    data: { label: "Coordinate System" },
    position: { x: 400, y: 750 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "RangesExamined",
    data: { label: "Ranges Examined" },
    position: { x: 600, y: 650 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "RegionDescription",
    data: { label: "Region Description" },
    position: { x: 600, y: 700 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
  {
    id: "ReferenceSequence",
    data: { label: "Reference Sequence" },
    position: { x: 600, y: 750 },
    style: { background: "#AAD190", border: "2px solid #AAD190" },
  },
];

const nodeSize = { width: 150, height: 40 };
const initialEdges = [
  // Orange group
  { id: "o1", source: "CancerStage", target: "LymphomaStage" },
  { id: "o2", source: "CancerStage", target: "StagingMethod" },
  { id: "o3", source: "CancerStage", target: "StageType" },
  { id: "o4", source: "CancerStage", target: "TNMStageGroup" },
  { id: "o5", source: "TNMStageGroup", target: "TCategory" },
  { id: "o6", source: "TNMStageGroup", target: "NCategory" },
  { id: "o7", source: "TNMStageGroup", target: "MCategory" },

  { id: "o8", source: "CancerRiskAssessment", target: "RiskMethod" },
  { id: "o9", source: "CancerRiskAssessment", target: "RiskType" },

  { id: "o10", source: "PrimaryCancerCondition", target: "AssertedDate" },
  {
    id: "o11",
    source: "PrimaryCancerCondition",
    target: "HistologyMorphology",
  },
  { id: "o12", source: "PrimaryCancerCondition", target: "BodySite" },
  { id: "o13", source: "PrimaryCancerCondition", target: "LateralityOrange" },
  {
    id: "o14",
    source: "PrimaryCancerCondition",
    target: "LocationQualifierOrange",
  },

  {
    id: "o15",
    source: "PrimaryCancerCondition",
    target: "SecondaryCancerCondition",
  },
  { id: "o16", source: "PrimaryCancerCondition", target: "TumorMarkerTest" },
  { id: "o17", source: "TumorMarkerTest", target: "TestType" },
  { id: "o18", source: "TumorMarkerTest", target: "ResultValue" },

  // Yellow group (Treatment) edges
  {
    id: "t1",
    source: "CancerRelatedMedicationAdministration",
    target: "MedicationAdminMedication",
  },
  {
    id: "t2",
    source: "CancerRelatedMedicationAdministration",
    target: "MedicationAdminReason",
  },
  {
    id: "t3",
    source: "CancerRelatedMedicationAdministration",
    target: "MedicationAdminIntent",
  },
  {
    id: "t4",
    source: "CancerRelatedMedicationAdministration",
    target: "MedicationAdminStatusReason",
  },
  {
    id: "t5",
    source: "CancerRelatedMedicationAdministration",
    target: "MedicationAdminNormalizationBasis",
  },

  {
    id: "t6",
    source: "CancerRelatedSurgicalProcedure",
    target: "ProcedureCode",
  },
  { id: "t7", source: "CancerRelatedSurgicalProcedure", target: "BodySite" },
  { id: "t8", source: "CancerRelatedSurgicalProcedure", target: "Laterality" },
  {
    id: "t9",
    source: "CancerRelatedSurgicalProcedure",
    target: "LocationQualifier",
  },

  { id: "t10", source: "RadiotherapyCourseSummary", target: "NoSessions" },
  {
    id: "t11",
    source: "RadiotherapyCourseSummary",
    target: "ModalityTechnique",
  },
  { id: "t12", source: "RadiotherapyCourseSummary", target: "Modality" },
  { id: "t13", source: "RadiotherapyCourseSummary", target: "Technique" },
  { id: "t14", source: "RadiotherapyCourseSummary", target: "DosesDelivered" },
  { id: "t15", source: "RadiotherapyCourseSummary", target: "TotalDose" },
  { id: "t16", source: "RadiotherapyCourseSummary", target: "NoFractions" },
  { id: "t17", source: "RadiotherapyCourseSummary", target: "BodyVolume" },

  {
    id: "t18",
    source: "RadiotherapyVolume",
    target: "VolumeType",
    style: {
      stroke: "#E9E600",
      strokeWidth: 2,
      strokeDasharray: "5,5",
    },
  },
  {
    id: "t19",
    source: "RadiotherapyVolume",
    target: "VolumeLocation",
    style: {
      stroke: "#E9E600",
      strokeWidth: 2,
      strokeDasharray: "5,5",
    },
  },
  {
    id: "t20",
    source: "RadiotherapyVolume",
    target: "VolumeLocationQualifier",
  },

  // Tumor purple group edges
  { id: "e19", source: "TumorSize", target: "LongestDimension" },
  { id: "e20", source: "TumorSize", target: "OtherDimension" },
  { id: "e21", source: "TumorSize", target: "TumorIdentifier" },
  { id: "e22", source: "TumorSize", target: "BodyLocation" },
  { id: "e23", source: "DiseaseStatus", target: "EvidenceType" },
  { id: "e24", source: "DeathDate", target: "CancerPatient" },

  // Green group (Genomics) edges
  { id: "g1", source: "HumanSpecimen", target: "CancerPatient" },
  { id: "g2", source: "GenomicVariant", target: "GenomicsReport" },
  { id: "g3", source: "GenomicsReport", target: "GenomicRegionStudied" },
  { id: "g4", source: "GenomicsReport", target: "CancerPatient" },
  { id: "g5", source: "GenomicVariant", target: "PresentAbsent" },
  { id: "g6", source: "GenomicVariant", target: "VariationCode" },
  { id: "g7", source: "GenomicVariant", target: "GenomicHGVS" },
  { id: "g8", source: "GenomicVariant", target: "CodingChangeType" },
  { id: "g9", source: "GenomicVariant", target: "ProteinHGVS" },
  { id: "g10", source: "GenomicVariant", target: "AminoAcidChangeType" },
  { id: "g11", source: "GenomicVariant", target: "MolecularConsequence" },
  { id: "g12", source: "GenomicVariant", target: "CytogenNomenclature" },
  { id: "g13", source: "GenomicsReport", target: "TestCode" },
  { id: "g14", source: "GenomicRegionStudied", target: "GeneStudied" },
  { id: "g15", source: "GenomicRegionStudied", target: "GeneMutations" },
  { id: "g16", source: "GenomicRegionStudied", target: "CoordinateSystem" },
  { id: "g17", source: "GenomicRegionStudied", target: "RangesExamined" },
  { id: "g18", source: "GenomicRegionStudied", target: "RegionDescription" },
  { id: "g19", source: "GenomicRegionStudied", target: "ReferenceSequence" },

  // Blue group edges
  { id: "b1", source: "BodySurfaceArea", target: "CancerPatient" },
  {
    id: "b2",
    source: "HistoryMetastaticCancer",
    target: "CancerPatient",
    type: "bidirectional",
  },
  {
    id: "b3",
    source: "Comorbidities",
    target: "CancerPatient",
    type: "bidirectional",
  },
  {
    id: "b4",
    source: "Comorbidities",
    target: "ConditionPresent",
    type: "bidirectional",
  },
  {
    id: "b5",
    source: "Comorbidities",
    target: "ConditionAbsent",
    type: "bidirectional",
  },
  {
    id: "b6",
    source: "ECOGStatus",
    target: "CancerPatient",
    type: "bidirectional",
  },
  {
    id: "b7",
    source: "ECOGStatus",
    target: "RiskScore",
    type: "bidirectional",
  },
  {
    id: "b8",
    source: "DeauvilleScale",
    target: "Score",
    type: "bidirectional",
  },
  {
    id: "b9",
    source: "DeauvilleScale",
    target: "Interpretation",
    type: "bidirectional",
  },
];

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const navigate = useNavigate();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [expandedNodeId, setExpandedNodeId] = useState(null);

  const onNodeClick = useCallback(
    (event, node) => {
      const label = node.data?.label;
      if (label) {
        navigate(`/mcodesearch?query=${encodeURIComponent(label)}`);
      }

      setExpandedNodeId((prevId) => {
        if (prevId === node.id) {
          setNodes((nds) =>
            nds.map((n) =>
              n.id === node.id
                ? {
                    ...n,
                    data: { ...n.data, keywordInfo: null },
                    style: {
                      ...n.style,
                      width: nodeSize.width,
                      height: nodeSize.height,
                      zIndex: 1,
                      transition: "all 0.3s ease",
                    },
                  }
                : n,
            ),
          );
          return null;
        } else {
          setNodes((nds) =>
            nds.map((n) =>
              n.id === node.id
                ? {
                    ...n,
                    data: {
                      ...n.data,
                      keywordInfo: [
                        { name: "GDPR", percentage: 70 },
                        { name: "Biomarker", percentage: 50 },
                        { name: "Tumor", percentage: 40 },
                        { name: "Genomics", percentage: 60 },
                        { name: "mCODE", percentage: 80 },
                      ],
                    },
                    style: {
                      ...n.style,
                      width: 300,
                      height: 300,
                      zIndex: 10,
                      transition: "all 0.3s ease",
                    },
                  }
                : {
                    ...n,
                    data: { ...n.data, keywordInfo: null },
                    style: {
                      ...n.style,
                      width: nodeSize.width,
                      height: nodeSize.height,
                      zIndex: 1,
                      transition: "all 0.3s ease",
                    },
                  },
            ),
          );
          return node.id;
        }
      });
    },
    [setNodes, navigate],
  );

  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        transform: "scale(1.2)",
        transformOrigin: "0 0",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: 200, y: 200, zoom: 0.8 }}
        fitView={false}
      >
        <MiniMap zoomable pannable />
        <Controls />
        <Background gap={12} color="#eee" />
      </ReactFlow>
    </div>
  );
};

export default function WrappedFlow() {
  return (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
  );
}
