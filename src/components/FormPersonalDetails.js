import React, { Component } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import { TextField, Grid, InputLabel, InputAdornment } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CountrySelect from "./utils/CountrySelect";

export class FormPersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <div>
        <Grid container spacing={3} alignItems="flex">
          <Grid item xs={12}>
            <div>
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
                    htmlFor="component-email"
                  >
                    Email:
                  </InputLabel>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    id="component-email"
                    placeholder="Enter Email"
                    required
                    style={{ width: "100%" }}
                    value={values.personalDetails.para4.values.email}
                    onChange={handleChange(
                      "personalDetails",
                      "para4",
                      "values",
                      "email"
                    )}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2} sm={4}>
                  <InputLabel
                    style={{
                      textAlign: "left",
                      color: "black",
                    }}
                    htmlFor="component-phone-number"
                  >
                    Phone Number:
                  </InputLabel>
                  <MuiPhoneNumber
                    id="component-phone-number"
                    variant="outlined"
                    placeholder="Enter Phone Number"
                    defaultCountry="il"
                    style={{ width: "100%", marginTop: "8px" }}
                    value={values.personalDetails.para3.values.phoneNumber}
                    onChange={(newValue) => {
                      const eventObject = {
                        target: { value: newValue },
                      };
                      handleChange(
                        "personalDetails",
                        "para3",
                        "values",
                        "phoneNumber"
                      )(eventObject);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
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
                    htmlFor="component-country"
                  >
                    Country:
                  </InputLabel>
                  <CountrySelect
                    id="component-country"
                    value={values.personalDetails.para3.values.country.label}
                    onChange={handleChange(
                      "personalDetails",
                      "para3",
                      "values",
                      "country"
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={2} sm={4}>
                  <InputLabel
                    style={{
                      textAlign: "left",
                      color: "black",
                    }}
                    htmlFor="component-city"
                  >
                    City:
                  </InputLabel>
                  <TextField
                    margin="dense"
                    placeholder="Enter City"
                    variant="outlined"
                    style={{ width: "100%", marginTop: "8px" }}
                    id="component-city"
                    required
                    value={values.personalDetails.para3.values.city}
                    onChange={handleChange(
                      "personalDetails",
                      "para3",
                      "values",
                      "city"
                    )}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LocationCityIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Grid
                container
                columnSpacing={4}
                justifyContent="center"
                alignItems="flex-start"
              >
                <Grid item xs={12} md={2} sm={4}>
                  <InputLabel
                    style={{
                      textAlign: "left",
                      color: "black",
                    }}
                    htmlFor="component-linkedIn"
                  >
                    LinkedIn:
                  </InputLabel>
                  <TextField
                    margin="dense"
                    placeholder="Enter LinkedIn"
                    variant="outlined"
                    style={{ width: "100%", marginBottom: "1rem" }}
                    id="component-linkedIn"
                    required
                    value={values.personalDetails.para4.values.linkedIn}
                    onChange={handleChange(
                      "personalDetails",
                      "para4",
                      "values",
                      "linkedIn"
                    )}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LinkedInIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2} sm={4}>
                  <InputLabel
                    style={{
                      textAlign: "left",
                      color: "black",
                    }}
                    htmlFor="component-github"
                  >
                    GitHub:
                  </InputLabel>
                  <TextField
                    margin="dense"
                    placeholder="Enter Github"
                    variant="outlined"
                    style={{ width: "100%", marginTop: "8px" }}
                    id="component-github"
                    required
                    value={values.personalDetails.para4.values.github}
                    onChange={handleChange(
                      "personalDetails",
                      "para4",
                      "values",
                      "github"
                    )}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <GitHubIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default FormPersonalDetails;
