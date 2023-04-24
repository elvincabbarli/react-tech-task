import React from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import SummaryStep from "./SummaryStep";
import { Stepper, StepLabel, Step } from "@mui/material";
import { useSelector } from "react-redux";
import CreditCalc from "./Credit-calc";

const AllSteps = () => {
  // REDUX THINGS
  const step = useSelector((state) => state.stepReducer.step);

  // STEP FUNCTION
  const showStep = (step) => {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      case 4:
        return <CreditCalc />;
      case 5:
        return <SummaryStep />;
      default:
    }
  };

  return (
    <div className="multy-step-app">
      <h3 style={{ marginBottom: "10px" }}>Kredit Müraciəti</h3>
      <div className="center-stepper">
        <Stepper
          style={{ width: "100%" }}
          activeStep={step - 1}
          orientation="horizontal"
        >
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
        </Stepper>
      </div>
      {showStep(step)}
    </div>
  );
};

export default AllSteps;
