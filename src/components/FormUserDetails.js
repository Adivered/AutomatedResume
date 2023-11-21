import React, { Component } from "react";
import { TextField, Grid, InputLabel } from "@mui/material";
import CustomAutoComplete from "./utils/CustomAutoComplete";
import CustomDatePicker from "./utils/CustomDatePicker";

export class FormUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <div>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="start"
            >
              <Grid item xs={12} md={2} sm={4}>
                <InputLabel
                  style={{
                    textAlign: "left",
                    color: "black",
                  }}
                  htmlFor="component-first-name"
                >
                  First Name:
                </InputLabel>
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="component-first-name"
                  placeholder="First Name"
                  required
                  style={{ width: "100%" }}
                  value={values.personalDetails.para1.values.firstName}
                  onChange={handleChange(
                    "personalDetails",
                    "para1",
                    "values",
                    "firstName"
                  )}
                />
              </Grid>
              <Grid item xs={12} md={2} sm={4}>
                <InputLabel
                  style={{
                    textAlign: "left",
                    color: "black",
                  }}
                  htmlFor="component-last-name"
                >
                  Last Name:
                </InputLabel>
                <TextField
                  margin="dense"
                  placeholder="Last Name"
                  variant="outlined"
                  id="component-last-name"
                  required
                  style={{ width: "100%" }}
                  value={values.personalDetails.para1.values.lastName}
                  onChange={handleChange(
                    "personalDetails",
                    "para1",
                    "values",
                    "lastName"
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item xs={12} md={2} sm={4}>
                <InputLabel
                  style={{
                    textAlign: "left",
                    color: "black",
                  }}
                  htmlFor="component-gender"
                >
                  Gender:
                </InputLabel>
                <CustomAutoComplete
                  labels={"component-gender"}
                  onChange={handleChange(
                    "personalDetails",
                    "para2",
                    "values",
                    "sex"
                  )}
                  value={values.personalDetails.para2.values.sex.label}
                  optionlist={[{ label: "Male" }, { label: "Female" }]}
                />
              </Grid>
              <Grid item xs={12} md={2} sm={4}>
                <CustomDatePicker
                  value={
                    values.personalDetails.para2.values.dateofbirth.label ||
                    null
                  }
                  onChange={(newDate) =>
                    handleChange(
                      "personalDetails",
                      "para2",
                      "values",
                      "dateofbirth"
                    )({
                      label: newDate,
                      value: newDate.toISOString().split("T")[0],
                    })
                  }
                  views={["month", "year", "day"]}
                  htmlFor={`component-dob`}
                  placeholder={"Date of Birth"}
                  closeOnChoose={false}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
      </div>
    );
  }
}
export default FormUserDetails;
