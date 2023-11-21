import React, { Component } from "react";
import { View } from "react-native";
import {
  TextField,
  Button,
  InputLabel,
  InputAdornment,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import SwipeableViews from "react-swipeable-views";
import CustomAutoComplete from "./utils/CustomAutoComplete.js";
import CustomDatePicker from "./utils/CustomDatePicker.js";

export class FormEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touchStart: null,
      touchEnd: null,
      touchDistance: null,
    };
    this.minSwipeDistance = 50;
  }

  handleWheel = (e) => {
    //PC
    const { values, handleTabChange } = this.props;
    const threshold = 50;
    if (e.deltaX > threshold) {
      // Scrolling right (right swipe)
      const newIndex = Math.min(
        values.educationTabValue + 1,
        values.educationTabs - 1
      );
      handleTabChange("education", newIndex);
    } else if (e.deltaX < -threshold) {
      // Scrolling left (left swipe)
      const newIndex = Math.max(values.educationTabValue - 1, 0);
      handleTabChange("education", newIndex);
    }
  };

  onTouchStart = (e) => {
    this.setState({ touchEnd: null, touchDistance: null });
    this.setState({ touchStart: e.targetTouches[0].clientX });
  };

  onTouchMove = (e) => {
    if (this.state.touchStart) {
      const touchEnd = e.targetTouches[0].clientX;
      const touchDistance = this.state.touchStart - touchEnd;
      this.setState({ touchEnd, touchDistance });
    }
  };

  onTouchEnd = () => {
    if (this.state.touchDistance) {
      if (this.state.touchDistance > this.minSwipeDistance) {
        this.props.handleTabChange(
          "education",
          this.props.values.educationTabValue + 1
        );
      } else if (this.state.touchDistance < -this.minSwipeDistance) {
        // Handle a right swipe
        this.props.handleTabChange(
          "education",
          this.props.values.educationTabValue - 1
        );
      }
    }
    this.setState({ touchStart: null, touchEnd: null, touchDistance: null });
  };

  render() {
    const { values, handleChange, handleTabChange, handleAddTab } = this.props;

    const options = [
      { label: "High School" },
      { label: "GED" },
      { label: "Associates" },
      { label: "Bachelors" },
      { label: "Bachelor of Art (BA)" },
      { label: "Bachelor of Science (BSc)" },
      { label: "Bachelor of Medicine (BM)" },
      { label: "Masters" },
      { label: "Doctorate" },
      { label: "PH.D" },
      { label: "Diploma" },
    ];

    return (
      <div name="Div1">
        <Grid
          name="Main Grid"
          container
          spacing={3}
          justifyContent="CENTER"
          alignItems="center"
        >
          <Grid
            name="Tab Grid"
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sm={5}></Grid>
            <Grid item sm={2}>
              <Tabs
                value={values.educationTabValue}
                onChange={(event, newValue) => {
                  handleTabChange("education", newValue);
                }}
              >
                {[...Array(values.educationTabs)].map((_, index) => (
                  <Tab key={index} label={`Education ${index + 1}`} />
                ))}
              </Tabs>
            </Grid>
            <Grid item sm={5}></Grid>
          </Grid>
          <Grid name="Education Grid" item xs={12}>
            <SwipeableViews
              index={values.educationTabValue}
              onTouchStart={this.onTouchStart}
              onTouchMove={this.onTouchMove}
              onTouchEnd={this.onTouchEnd}
              onWheel={this.handleWheel}
            >
              {Array.from({ length: values.educationTabs }, (_, index) => {
                const adjustedIndex = index + 1;
                return (
                  <div key={index} name={adjustedIndex}>
                    <View key={values.educationTabValue}>
                      {values.educationTabValue === index && (
                        <div ref={values.educationTabRefs[index]} name="Div3">
                          <div>
                            <Grid name="Body Grid" item container>
                              <Grid item sm={2} name="EmptySpaceLeft"></Grid>
                              <Grid
                                name="Middle Span Grid"
                                sm={8}
                                item
                                container
                                spacing={4}
                              >
                                <Grid
                                  name="First Row"
                                  item
                                  container
                                  spacing={4}
                                >
                                  <Grid sm={6} item xs={12}>
                                    <InputLabel
                                      style={{
                                        textAlign: "left",
                                        color: "black",
                                      }}
                                      htmlFor="component-type"
                                    >
                                      Type:
                                    </InputLabel>
                                    <CustomAutoComplete
                                      labels="component-type"
                                      onChange={handleChange(
                                        "educationalDetails",
                                        `para${adjustedIndex * 2}`,
                                        "values",
                                        `type${adjustedIndex}`
                                      )}
                                      value={
                                        values.educationalDetails[
                                          `para${adjustedIndex * 2}`
                                        ]["values"][`type${adjustedIndex}`]
                                          .label || null
                                      }
                                      optionlist={options}
                                      style={{ width: "100%" }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <InputLabel
                                      style={{
                                        textAlign: "left",
                                        color: "black",
                                        width: "100%",
                                      }}
                                      htmlFor="component-qualification"
                                    >
                                      Qualification:
                                    </InputLabel>
                                    <TextField
                                      margin="dense"
                                      variant="outlined"
                                      id="component-qualification"
                                      placeholder="Enter Qualification"
                                      style={{
                                        width: "100%",
                                      }}
                                      required
                                      value={
                                        values.educationalDetails.para2.values[
                                          `qualification${adjustedIndex}`
                                        ]
                                      }
                                      onChange={handleChange(
                                        "educationalDetails",
                                        "para2",
                                        "values",
                                        `qualification${adjustedIndex}`
                                      )}
                                    />
                                  </Grid>
                                </Grid>
                                <Grid
                                  name="Second Row"
                                  item
                                  container
                                  spacing={4}
                                >
                                  <Grid item xs={12} sm={6}>
                                    <InputLabel
                                      style={{
                                        textAlign: "left",
                                        color: "black",
                                      }}
                                      htmlFor="component-college"
                                    >
                                      College:
                                    </InputLabel>
                                    <TextField
                                      margin="dense"
                                      variant="outlined"
                                      id="component-college"
                                      placeholder="Enter College"
                                      style={{ width: "100%" }}
                                      required
                                      value={
                                        values.educationalDetails[
                                          `para${adjustedIndex * 3}`
                                        ]["values"][`college${adjustedIndex}`]
                                      }
                                      onChange={handleChange(
                                        "educationalDetails",
                                        `para${adjustedIndex * 3}`,
                                        "values",
                                        `college${adjustedIndex}`
                                      )}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="start">
                                            <SchoolIcon />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    sm={6}
                                    item
                                    container
                                    spacing={3}
                                    xs={12}
                                  >
                                    <Grid item xs={6}>
                                      <CustomDatePicker
                                        value={
                                          values.educationalDetails[
                                            `para${adjustedIndex * 3}`
                                          ]["values"][
                                            `fromyear${adjustedIndex}`
                                          ].label || null
                                        }
                                        onChange={(newDate) => {
                                          const formattedDate =
                                            new Intl.DateTimeFormat("en-US", {
                                              year: "numeric",
                                            }).format(newDate);
                                          handleChange(
                                            "educationalDetails",
                                            `para${adjustedIndex * 3}`,
                                            "values",
                                            `fromyear${adjustedIndex}`
                                          )({
                                            label: newDate,
                                            value: formattedDate,
                                          });
                                        }}
                                        views={["year"]}
                                        htmlFor={`component-fromyear`}
                                        placeholder="From"
                                        closeOnChoose={false}
                                      />
                                    </Grid>
                                    <Grid item xs={6}>
                                      <CustomDatePicker
                                        value={
                                          values.educationalDetails[
                                            `para${adjustedIndex * 3}`
                                          ]["values"][`toyear${adjustedIndex}`]
                                            .label || null
                                        }
                                        onChange={(newDate) => {
                                          const formattedDate =
                                            new Intl.DateTimeFormat("en-US", {
                                              year: "numeric",
                                            }).format(newDate);
                                          handleChange(
                                            "educationalDetails",
                                            `para${adjustedIndex * 3}`,
                                            "values",
                                            `toyear${adjustedIndex}`
                                          )({
                                            label: newDate,
                                            value: formattedDate,
                                          });
                                        }}
                                        views={["year"]}
                                        htmlFor={`component-toyear`}
                                        placeholder="To"
                                        closeOnChoose={false}
                                        minDate={
                                          values.educationalDetails[
                                            `para${adjustedIndex * 3}`
                                          ]["values"][
                                            `fromyear${adjustedIndex}`
                                          ].label
                                        }
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid
                                  name="Third Row"
                                  item
                                  container
                                  spacing={4}
                                  alignItems="flex"
                                >
                                  <Grid item xs={12}>
                                    <InputLabel
                                      style={{
                                        textAlign: "left",
                                        color: "black",
                                      }}
                                      htmlFor="component-desc"
                                    >
                                      Description:
                                    </InputLabel>
                                    <TextField
                                      margin="dense"
                                      variant="outlined"
                                      id="component-desc"
                                      multiline
                                      rows={7}
                                      placeholder="Description"
                                      style={{ width: "100%" }}
                                      required
                                      value={
                                        values.educationalDetails[
                                          `para${adjustedIndex * 3}`
                                        ]["values"][
                                          `description${adjustedIndex}`
                                        ].label
                                      }
                                      onChange={handleChange(
                                        "educationalDetails",
                                        `para${adjustedIndex * 3}`,
                                        "values",
                                        `description${adjustedIndex}`
                                      )}
                                    />
                                  </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                  <br />
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(event, newValue) =>
                                      handleAddTab("education", newValue, 2)
                                    }
                                  >
                                    Add Another Tab
                                  </Button>
                                  <br />
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                sm={2}
                                name="EmptySpaceRight Grid"
                              ></Grid>
                            </Grid>
                          </div>
                        </div>
                      )}
                    </View>
                  </div>
                );
              })}
            </SwipeableViews>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default FormEducation;
