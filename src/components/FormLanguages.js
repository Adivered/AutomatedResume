import React, { Component } from "react";
import Card from "./utils/Card";
import { Grid, Tabs, Tab, InputLabel } from "@mui/material";
import { View } from "react-native";
import CustomAutoComplete from "./utils/CustomAutoComplete";
import SwipeableViews from "react-swipeable-views";
import AddIcon from "@mui/icons-material/Add";
import "./css/FormLanguages.css";

export class FormLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touchStart: null,
      touchEnd: null,
      touchDistance: null,
    };
    this.minSwipeDistance = 2;
  }
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
      // Implement your logic for touch end here based on touchDistance
      if (this.state.touchDistance > this.minSwipeDistance) {
        // Handle an up swipe
        this.props.handleTabChange(
          "language",
          this.props.values.languageTabValue - 1
        );
      } else if (this.state.touchDistance < -this.minSwipeDistance) {
        // Handle a down swipe
        this.props.handleTabChange(
          "language",
          this.props.values.languageTabValue + 1
        );
      }
    }
    this.setState({ touchStart: null, touchEnd: null, touchDistance: null });
  };

  render() {
    const { values, handleChange, handleTabChange, handleAddTab } = this.props;

    const lang_options = [
      { label: "English" },
      { label: "Hebrew" },
      { label: "French" },
      { label: "German" },
      { label: "Italian" },
      { label: "Dutch" },
      { label: "Spanish" },
    ];
    const level_options = [
      { label: "Fluent" },
      { label: "Native" },
      { label: "Intermediate" },
      { label: "Beginner" },
    ];
    return (
      <Grid item xs={12}>
        <Card>
          <Grid item container xs={12} className="grid-height">
            <Grid container item xs={4} spacing={2} className="grid-size">
              <Tabs
                className="tab"
                value={values.languageTabValue}
                orientation="vertical"
                variant="scrollable"
                onChange={(event, newValue) => {
                  handleTabChange("language", newValue); // Make sure newValue is used correctly
                }}
              >
                {[...Array(values.languageTabs)].map((_, index) => (
                  <Tab
                    className="tab"
                    key={index}
                    label={`language ${index + 1}`}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid item container xs={8}>
              <Grid item xs={12}>
                <SwipeableViews
                  index={values.languageTabValue}
                  axis="y"
                  className="swipeable"
                  animateHeight={true}
                  resistance
                  onTouchStart={this.onTouchStart}
                  onTouchMove={this.onTouchMove}
                  onTouchEnd={this.onTouchEnd}
                >
                  {Array.from({ length: values.languageTabs }, (_, index) => {
                    const adjustedIndex = index + 1;
                    return (
                      <div
                        key={index}
                        className="view from-location-div"
                        name={adjustedIndex}
                      >
                        <View key={values.languageTabValue}>
                          {
                            <div
                              ref={values.languageTabRefs[index]}
                              name="from-location-div"
                            >
                              <div>
                                <Grid item container spacing={1} key={index}>
                                  <Grid item xs={12}>
                                    <InputLabel
                                      className="input-label"
                                      htmlFor={`component-lang${adjustedIndex}`}
                                    >
                                      Language:
                                    </InputLabel>
                                    <CustomAutoComplete
                                      labels={`component-lang${adjustedIndex}`}
                                      onChange={handleChange(
                                        "languageDetails",
                                        "para2",
                                        "values",
                                        `language${adjustedIndex}`,
                                        `lang${adjustedIndex}`
                                      )}
                                      value={
                                        values.languageDetails.para2.values[
                                          `language${adjustedIndex}`
                                        ][`lang${adjustedIndex}`].label
                                      }
                                      optionlist={lang_options}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    {values.languageDetails.para2.values[
                                      `language${adjustedIndex}`
                                    ][`lang${adjustedIndex}`] && (
                                      <Grid item xs={12}>
                                        <InputLabel
                                          className="input-label"
                                          htmlFor={`component-level${adjustedIndex}`}
                                        >
                                          Level:
                                        </InputLabel>
                                        <CustomAutoComplete
                                          labels={`component-level${adjustedIndex}`}
                                          onChange={handleChange(
                                            "languageDetails",
                                            "para2",
                                            "values",
                                            `language${adjustedIndex}`,
                                            `level${adjustedIndex}`
                                          )}
                                          value={
                                            values.languageDetails.para2.values[
                                              `language${adjustedIndex}`
                                            ][`level${adjustedIndex}`].label
                                          }
                                          optionlist={level_options}
                                        />
                                      </Grid>
                                    )}
                                  </Grid>
                                </Grid>
                              </div>
                            </div>
                          }
                        </View>
                      </div>
                    );
                  })}
                </SwipeableViews>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            style={{
              height: "20px",
              width: "40%",
              marginLeft: "85%",
            }}
          >
            <Grid item>
              <div>
                <span>
                  <AddIcon
                    onClick={(event, newValue) =>
                      handleAddTab("language", newValue)
                    }
                    style={{
                      marginTop: "22px",
                      color: "oklch(70.8% 0.217 351.53)",
                    }}
                  />
                </span>
              </div>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default FormLocation;
