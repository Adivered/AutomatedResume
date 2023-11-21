import React, { Component } from "react";
import { TextField, Grid, InputLabel } from "@mui/material";

export class FormBio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { values, handleChange } = this.props;

    return (
      <div>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <InputLabel
              style={{
                textAlign: "left",
                color: "black",
              }}
              htmlFor="component-bio"
            >
              About Yourself:
            </InputLabel>
            <TextField
              margin="dense"
              multiline
              variant="outlined"
              id="component-bio"
              rows={7}
              placeholder="Enter Bio"
              style={{ width: "100%" }}
              required
              value={values.bio.para1.values}
              onChange={handleChange("bio", "para1", "values")}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default FormBio;
