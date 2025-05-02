import React from "react";
import treatmentImg from "../../../Images/mcode_icon/Treatment.svg";
import genomicsImg from "../../../Images/mcode_icon/Genomics.svg";
import defaultImg from "../../../Images/mcode_icon/Profile.svg";
import diseaseImg from "../../../Images/mcode_icon/Disease.svg";
import assessmentImg from "../../../Images/mcode_icon/Assessment.svg";
import outcomeImg from "../../../Images/mcode_icon/Outcome.svg";
import patientImg from "../../../Images/mcode_icon/Patient.svg";

export default function CategoryImgRender(params) {
  let imageUrl;

  if (params.data.category === "genomics") {
    imageUrl = genomicsImg;
  } else if (params.data.category === "treatment") {
    imageUrl = treatmentImg;
  } else if (params.data.category === "disease") {
    imageUrl = diseaseImg;
  } else if (params.data.category === "assessment") {
    imageUrl = assessmentImg;
  } else if (params.data.category === "outcome") {
    imageUrl = outcomeImg;
  } else if (params.data.category === "patient") {
    imageUrl = patientImg;
  } else {
    imageUrl = defaultImg;
  }

  return (
    <span
      className="imgSpanLogo"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img
        alt={params.data.category}
        src={imageUrl}
        className="logo"
        style={{
          height: "20px",
          width: "auto",
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImg;
        }}
      />
    </span>
  );
}
