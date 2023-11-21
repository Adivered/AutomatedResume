import React from "react";
import PropTypes from "prop-types";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepConnector from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import { Container, Box } from "@mui/material";
import "../css/CustomStepper.css";

const CustomStepper = ({ steps, activeStep }) => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Stepper
          alternativeLabel
          orientation="horizontal"
          className={"root"}
          activeStep={activeStep}
          connector={<StepConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label} sx={{}}>
              <StepLabel className="step-label" color="inherit">
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Container>
  );
};

CustomStepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default CustomStepper;
