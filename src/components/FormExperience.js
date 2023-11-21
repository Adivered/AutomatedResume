import React, { Component } from "react";
import {
  TextField,
  Button,
  Grid,
  InputLabel,
  Tabs,
  Tab,
  InputAdornment,
} from "@mui/material";
import CustomDatePicker from "./utils/CustomDatePicker";
import DescriptionIcon from "@mui/icons-material/Description";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import BusinessIcon from "@mui/icons-material/Business";
import SwipeableViews from "react-swipeable-views";

export class FormExperience extends Component {
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
    const { values, handleTabChange } = this.props;
    const threshold = 50;
    if (e.deltaX > threshold) {
      // Scrolling right (right swipe)
      const newIndex = Math.min(
        values.experienceTabValue + 1,
        values.experienceTabs - 1
      );
      handleTabChange("experience", newIndex);
    } else if (e.deltaX < -threshold) {
      // Scrolling left (left swipe)
      const newIndex = Math.max(values.experienceTabValue - 1, 0);
      handleTabChange("experience", newIndex);
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
          "experience",
          this.props.values.experienceTabValue + 1
        );
      } else if (this.state.touchDistance < -this.minSwipeDistance) {
        // Handle a right swipe
        this.props.handleTabChange(
          "experience",
          this.props.values.experienceTabValue - 1
        );
      }
    }
    this.setState({ touchStart: null, touchEnd: null, touchDistance: null });
  };

  render() {
    const { values, handleChange, handleTabChange, handleAddTab } = this.props;
    //          <Paper className={classes.padding} style={{ height: '100vh', overflowY: 'scroll' }}>

    return (
      <div name="form-experience-div1">
        <Grid container spacing={3} justifyContent="CENTER" alignItems="center">
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={5}></Grid>
            <Grid item md={2}>
              <Tabs
                value={values.experienceTabValue}
                onChange={(event, newValue) =>
                  handleTabChange("experience", newValue)
                }
              >
                {[...Array(values.experienceTabs)].map((_, index) => (
                  <Tab key={index} label={`Experience ${index + 1}`} />
                ))}
              </Tabs>
            </Grid>
            <Grid item md={5}></Grid>
          </Grid>
          <Grid item xs={12}>
            <SwipeableViews
              index={values.experienceTabValue}
              onWheel={this.handleWheel}
              onTouchStart={this.onTouchStart}
              onTouchMove={this.onTouchMove}
              onTouchEnd={this.onTouchEnd}
            >
              {Array.from({ length: values.experienceTabs }, (_, index) => {
                const adjustedIndex = index + 1;
                return (
                  <div key={index} id="check" name={adjustedIndex}>
                    {values.experienceTabValue === index && (
                      <div ref={values.experienceTabRefs[index]} name="Div3">
                        <div>
                          <Grid container>
                            <Grid item sm={2} name="Grid1"></Grid>
                            <Grid
                              item
                              container
                              sm={8}
                              xs={12}
                              spacing={4}
                              alignItems="center"
                            >
                              <Grid
                                item
                                container
                                spacing={4}
                                xs={12}
                                justifyContent="center"
                                alignItems="flex"
                              >
                                <Grid item xs={12} sm={6}>
                                  <InputLabel
                                    style={{
                                      textAlign: "left",
                                      color: "black",
                                    }}
                                    htmlFor="component-position"
                                  >
                                    Title:
                                  </InputLabel>
                                  <TextField
                                    margin="dense"
                                    variant="outlined"
                                    id="component-position"
                                    placeholder="Enter Title"
                                    style={{ width: "100%" }}
                                    required
                                    {...console.log(
                                      "Adjusted Index: ",
                                      adjustedIndex
                                    )}
                                    {...console.log(
                                      `para${adjustedIndex % 2 === 0 ? 5 : 2}`
                                    )}
                                    value={
                                      values.experienceDetails[
                                        `para${adjustedIndex % 2 === 0 ? 5 : 2}`
                                      ]["values"][`position${adjustedIndex}`]
                                    }
                                    onChange={handleChange(
                                      "experienceDetails",
                                      `para${adjustedIndex % 2 === 0 ? 5 : 2}`,
                                      "values",
                                      `position${adjustedIndex}`
                                    )}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="start">
                                          <EventSeatIcon />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <InputLabel
                                    style={{
                                      textAlign: "left",
                                      color: "black",
                                    }}
                                    htmlFor="component-institute"
                                  >
                                    Institue:
                                  </InputLabel>
                                  <TextField
                                    margin="dense"
                                    variant="outlined"
                                    id="component-institute"
                                    placeholder="Enter institute"
                                    style={{
                                      width: "100%",
                                    }}
                                    required
                                    value={
                                      values.experienceDetails[
                                        `para${adjustedIndex * 3}`
                                      ]["values"][`institute${adjustedIndex}`]
                                    }
                                    onChange={handleChange(
                                      "experienceDetails",
                                      `para${adjustedIndex * 3}`,
                                      "values",
                                      `institute${adjustedIndex}`
                                    )}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="start">
                                          <BusinessIcon />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                container
                                spacing={4}
                                alignItems="flex"
                              >
                                <Grid item container spacing={3} md={6} xs={12}>
                                  <Grid item xs={6} md={6}>
                                    <CustomDatePicker
                                      value={
                                        values.experienceDetails[
                                          `para${adjustedIndex * 3}`
                                        ]["values"][`frommonth${adjustedIndex}`]
                                          .label || null
                                      }
                                      onChange={(newDate) => {
                                        const formattedDate =
                                          new Intl.DateTimeFormat("en-US", {
                                            month: "short",
                                          }).format(newDate);
                                        handleChange(
                                          "experienceDetails",
                                          `para${adjustedIndex * 3}`,
                                          "values",
                                          `frommonth${adjustedIndex}`
                                        )({
                                          label: newDate,
                                          value: formattedDate,
                                        });
                                      }}
                                      htmlFor={`component-frommonth${adjustedIndex}`}
                                      placeholder="Month"
                                      closeOnChoose={true}
                                      views={["month"]}
                                    />
                                  </Grid>
                                  <Grid item xs={6} md={6}>
                                    <CustomDatePicker
                                      value={
                                        values.experienceDetails[
                                          `para${adjustedIndex * 3}`
                                        ]["values"][`fromyear${adjustedIndex}`]
                                          .label || null
                                      }
                                      onChange={(newDate) => {
                                        const formattedDate =
                                          new Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                          }).format(newDate);
                                        handleChange(
                                          "experienceDetails",
                                          `para${adjustedIndex * 3}`,
                                          "values",
                                          `fromyear${adjustedIndex}`
                                        )({
                                          label: newDate,
                                          value: formattedDate,
                                        });
                                      }}
                                      htmlFor={`component-fromyear${adjustedIndex}`}
                                      placeholder="Year"
                                      closeOnChoose={false}
                                      views={["year"]}
                                    />
                                  </Grid>
                                </Grid>
                                <Grid item container spacing={3} md={6} xs={12}>
                                  <Grid item xs={6} md={6}>
                                    <CustomDatePicker
                                      value={
                                        values.experienceDetails[
                                          `para${adjustedIndex * 3}`
                                        ]["values"][`tomonth${adjustedIndex}`]
                                          .label || null
                                      }
                                      onChange={(newDate) => {
                                        const formattedDate =
                                          new Intl.DateTimeFormat("en-US", {
                                            month: "short",
                                          }).format(newDate);
                                        handleChange(
                                          "experienceDetails",
                                          `para${adjustedIndex * 3}`,
                                          "values",
                                          `tomonth${adjustedIndex}`
                                        )({
                                          label: newDate,
                                          value: formattedDate,
                                        });
                                      }}
                                      htmlFor={`component-toonth${adjustedIndex}`}
                                      placeholder="Month"
                                      closeOnChoose={false}
                                      views={["month"]}
                                    />
                                  </Grid>
                                  <Grid item xs={6} md={6}>
                                    <CustomDatePicker
                                      value={
                                        values.experienceDetails[
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
                                          "experienceDetails",
                                          `para${adjustedIndex * 3}`,
                                          "values",
                                          `toyear${adjustedIndex}`
                                        )({
                                          label: newDate,
                                          value: formattedDate,
                                        });
                                      }}
                                      htmlFor={`component-toyear${adjustedIndex}`}
                                      placeholder="Year"
                                      closeOnChoose={true}
                                      views={["year"]}
                                      minDate={
                                        values.experienceDetails[
                                          `para${adjustedIndex * 3}`
                                        ]["values"][`fromyear${adjustedIndex}`]
                                          .label
                                      }
                                    />
                                  </Grid>
                                </Grid>
                                <Grid item md={3}></Grid>
                              </Grid>
                              <Grid
                                item
                                container
                                xs={12}
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
                                    // para 4, para 7

                                    value={
                                      values.experienceDetails[
                                        `para${adjustedIndex * 4}`
                                      ]["values"][`description${adjustedIndex}`]
                                    }
                                    onChange={handleChange(
                                      "experienceDetails",
                                      `para${adjustedIndex * 4}`,
                                      "values",
                                      `description${adjustedIndex}`
                                    )}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="start">
                                          <DescriptionIcon />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                              </Grid>

                              <Grid item xs={12}>
                                <br />
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={(event, newValue) =>
                                    handleAddTab("experience", newValue)
                                  }
                                >
                                  Add Another Tab
                                </Button>
                                <br />
                              </Grid>
                            </Grid>
                            <Grid item sm={2}></Grid>
                          </Grid>
                        </div>
                      </div>
                    )}
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

export default FormExperience;
