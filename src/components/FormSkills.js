import React, { Component } from "react";
import { TextField, InputLabel, Grid } from "@mui/material";
import FormLanguages from "./FormLanguages";

export class FormSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSkills = (numSkills, handleChange) => {
    const skillsFields = [];
    for (let i = 1; i <= numSkills; i += 2) {
      skillsFields.push(
        <Grid container spacing={2} key={i}>
          <Grid item sm={2}></Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel
              style={{ color: "black", textAlign: "left" }}
              htmlFor={`component-skill${i}`}
            >
              {`Skill ${i}:`}
            </InputLabel>
            <TextField
              margin="dense"
              variant="outlined"
              id={`component-skill${i}`}
              style={{ width: "100%" }}
              required
              value={this.props.values.skillsDetails.para2.values[`skill${i}`]}
              placeholder="Enter Skill"
              onChange={handleChange(
                "skillsDetails",
                "para2",
                "values",
                `skill${i}`
              )}
            />
          </Grid>
          {i + 1 <= numSkills && (
            <Grid item xs={12} sm={4}>
              <InputLabel
                style={{ color: "black", textAlign: "left" }}
                htmlFor={`component-skill${i + 1}`}
              >
                {`Skill ${i + 1}:`}
              </InputLabel>
              <TextField
                margin="dense"
                variant="outlined"
                id={`component-skill${i + 1}`}
                style={{ width: "100%" }}
                required
                value={
                  this.props.values.skillsDetails.para2.values[`skill${i + 1}`]
                }
                placeholder="Enter Skill"
                onChange={handleChange(
                  "skillsDetails",
                  "para2",
                  "values",
                  `skill${i + 1}`
                )}
              />
            </Grid>
          )}
          <Grid item sm={2}></Grid>
        </Grid>
      );
    }
    return skillsFields;
  };

  render() {
    const { values, handleChange, handleTabChange, handleAddTab } = this.props;
    return (
      <div>
        <Grid container spacing={2} alignItems="flex-start">
          {/* Left Side: Languages */}
          <Grid item xs={12} sm={6}>
            <h5
              style={{
                display: "flex",
                fontSize: "13pt",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Languages:
            </h5>
            <FormLanguages
              values={values}
              handleChange={handleChange}
              handleTabChange={handleTabChange}
              handleAddTab={handleAddTab}
            />
          </Grid>
          {/* Right Side: Skills */}
          <Grid item xs={12} sm={6}>
            <h5
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Skills
            </h5>
            {this.renderSkills(6, handleChange)}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default FormSkills;
