import React, { Component } from "react";
import "./css/UserForm.css";
import CustomStepper from "./utils/CustomStepper";
import CustomButton from "./utils/CustomButton";
import DownloadButton from "./utils/DownloadButton";
import { appTheme } from ".././themes/theme";
import AppBar from "./utils/AppBar";
import FormUserDetails from "./FormUserDetails.js";
import FormPersonalDetails from "./FormPersonalDetails";
import FormBio from "./FormBio.js";
import FormEducation from "./FormEducation.js";
import FormExperience from "./FormExperience.js";
import FormSkills from "./FormSkills.js";
import Confirm from "./Confirm.js";

import {
  CssBaseline,
  ThemeProvider,
  CardContent,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const styles = {
  XSMALL: "xsmall",
  SMALL: "small",
  SMALL_B: "small_b",
  XLARGE: "xlarge",
  SECTION: "section",
  SUBSECTION: "subsection",
  SUBSECTION_U: "subsection_u",
};

export class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: styles,
      step: 1,
      numberOfLanguageSelections: [1],
      educationTabValue: 0,
      educationTabs: 1,
      educationTabRefs: [React.createRef()],
      experienceTabValue: 0,
      experienceTabs: 1,
      experienceTabRefs: [React.createRef()],
      languageTabValue: 0,
      languageTabs: 1,
      languageTabRefs: [React.createRef()],
      skillTabValue: 0,
      skillTabs: 1,
      skillTabRefs: [React.createRef()],

      personalDetails: {
        para1: {
          values: { firstName: "", lastName: "" },
          style: styles.XLARGE,
          spaceBefore: 0,
          spaceAfter: 0,
          align: "CENTER",
          breakline: false,
          bullet: false,
        },
        para2: {
          values: {
            dateofbirth: {
              label: "",
              value: "",
            },
            sex: { label: "", value: "" },
          },
          style: styles.XSMALL,
          spaceBefore: 0,
          spaceAfter: 0,
          align: "CENTER",
          breakline: false,
          bullet: false,
        },
        para3: {
          values: {
            city: "",
            country: { label: "", value: "" },
            phoneNumber: "",
          },
          style: styles.XSMALL,
          spaceBefore: 0,
          spaceAfter: 0,
          align: "CENTER",
          breakline: false,
          bullet: false,
        },
        para4: {
          values: { email: "", linkedIn: "", github: "" },
          style: styles.XSMALL,
          spaceBefore: 0,
          spaceAfter: 6,
          align: "CENTER",
          breakline: true,
          bullet: false,
        },
      },
      bio: {
        para1: {
          values: "",
          style: styles.SMALL_B,
          spaceBefore: 6,
          spaceAfter: 10,
          align: "",
          breakline: false,
          bullet: false,
        },
      },
      educationalDetails: {
        para1: {
          values: "EDUCATION",
          style: styles.SECTION,
          spaceBefore: 10,
          spaceAfter: 6,
          align: "",
          bullet: false,
          breakline: true,
        },
        para2: {
          values: {
            type1: { label: "", value: "" },
            perim: "in",
            qualification1: "",
          },
          style: styles.SUBSECTION_U,
          spaceBefore: 4,
          spaceAfter: 0,
          align: "",
          breakline: false,
          bullet: false,
          tabs: 1,
        },
        para3: {
          values: {
            college1: "",
            fromyear1: { label: "", value: "" },
            toyear1: { label: "", value: "" },
            description1: "",
          },
          style: styles.SMALL,
          spaceBefore: 0,
          spaceAfter: 0,
          align: "",
          breakline: false,
          bullet: false,
          tabs: 2,
        },
        para4: {
          values: {
            type2: { label: "", value: "" },
            perim: "in",
            qualification2: "",
          },
          style: styles.SUBSECTION_U,
          spaceBefore: 4,
          spaceAfter: 0,
          align: "",
          breakline: false,
          bullet: false,
          tabs: 1,
        },
        para6: {
          values: {
            college2: "",
            fromyear2: { label: "", value: "" },
            toyear2: { label: "", value: "" },
            description2: "",
            tabs: 2,
          },
          style: styles.SMALL,
          spaceBefore: 0,
          spaceAfter: 0,
          align: "",
          breakline: false,
          bullet: false,
        },
      },
      experienceDetails: {
        para1: {
          values: "EXPERIENCE",
          style: styles.SECTION,
          spaceBefore: 10,
          spaceAfter: 6,
          align: "",
          bullet: false,
          breakline: true,
        },
        para2: {
          values: { position1: "" },
          style: styles.SUBSECTION_U,
          spaceBefore: 6,
          spaceAfter: 0,
          align: "",
          breakline: false,
          bullet: false,
          tabs: 1,
        },
        para3: {
          values: {
            institute1: "",
            frommonth1: { label: "", value: "" },
            fromyear1: { label: "", value: "" },
            tomonth1: { label: "", value: "" },
            toyear1: { label: "", value: "" },
          },
          style: styles.SUBSECTION,
          spaceBefore: 0,
          spaceAfter: 0,
          align: "",
          breakline: false,
          bullet: false,
          tabs: 2,
        },
        para4: {
          values: { experienceDetails1: "" },
          style: styles.SMALL,
          spaceBefore: 0,
          spaceAfter: 0,
          align: "",
          breakline: false,
          bullet: true,
        },
        para5: {
          values: { position2: "" },
          style: styles.SUBSECTION_U,
          spaceBefore: 6,
          spaceAfter: 0,
          align: "",
          breakline: false,
          bullet: false,
          tabs: 1,
        },
        para6: {
          values: {
            institute2: "",
            frommonth2: { label: "", value: "" },
            fromyear2: { label: "", value: "" },
            tomonth2: { label: "", value: "" },
            toyear2: { label: "", value: "" },
          },
          style: styles.SUBSECTION,
          spaceBefore: 0,
          spaceAfter: 0,
          align: "",
          breakline: false,
          bullet: false,
          tabs: 2,
        },
        para8: {
          values: { experienceDetails2: "" },
          style: styles.SMALL,
          spaceBefore: 0,
          spaceAfter: 0,
          align: "",
          breakline: false,
          bullet: true,
        },
      },
      skillsDetails: {
        para1: {
          values: "SKILLS",
          style: styles.SECTION,
          spaceBefore: 10,
          spaceAfter: 6,
          align: "",
          bullet: false,
          breakline: true,
        },
        para2: {
          values: {
            skill1: "",
            skill2: "",
            skill3: "",
            skill4: "",
            skill5: "",
            skill6: "",
          },
          style: styles.SMALL_B,
          spaceBefore: 0,
          spaceAfter: 0,
          align: "",
          bullet: true,
          breakline: false,
          tabs: 1,
        },
      },
      languageDetails: {
        para1: {
          values: "LANGUAGES",
          style: styles.SECTION,
          spaceBefore: 10,
          spaceAfter: 6,
          align: "",
          bullet: false,
          breakline: true,
        },
        para2: {
          values: {
            language1: {
              lang1: { label: "", value: "" },
              level1: { label: "", value: "" },
            },
            language2: {
              lang2: { label: "", value: "" },
              level2: { label: "", value: "" },
            },
            language3: {
              lang3: { label: "", value: "" },
              level3: { label: "", value: "" },
            },
          },
          style: styles.SMALL_B,
          spaceBefore: 0,
          spaceAfter: 0,
          align: "",
          breakline: false,
          bullet: true,
        },
      },
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleAddTab = this.handleAddTab.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addLanguage = this.addLanguage.bind(this);
  }

  // Proceed to next step
  nextStep = () => {
    this.setState((nextState) => {
      return {
        step: nextState.step + 1,
      };
    });
  };

  // Go Back to previous step
  prevStep = () => {
    this.setState((prevState) => {
      return {
        step: prevState.step - 1,
      };
    });
  };

  // Function to handle changing the step
  handleStepChange = (newStep) => {
    this.setState({ step: newStep });
  };

  // Function to handle step click
  handleStepClick = (step) => {
    this.handleStepChange(step);
  };

  // Handle field steps
  handleChange =
    (...keys) =>
    (e) => {
      let value = "";
      try {
        value = e.target.value;
      } catch (TypeError) {
        value = e;
      }

      this.setState((prevState) => {
        let newState = { ...prevState };
        let nestedState = newState;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!nestedState[keys[i]]) {
            nestedState[keys[i]] = {};
          }
          nestedState = nestedState[keys[i]];
        }
        nestedState[keys[keys.length - 1]] = value;
        return newState;
      });
    };

  handleTabChange = (tabName, newValue) => {
    if (newValue >= 0 && newValue < this.state[`${tabName}Tabs`]) {
      this.setState({ [`${tabName}TabValue`]: newValue });
    }
  };

  handleAddTab = (tabName) => {
    if (this.state[`${tabName}Tabs`] < 2) {
      const newTabRef = React.createRef();

      this.setState((prevState) => ({
        [`${tabName}TabValue`]: prevState[`${tabName}TabValue`] + 1,
        [`${tabName}Tabs`]: prevState[`${tabName}Tabs`] + 1,
        [`${tabName}TabRefs`]: [...prevState[`${tabName}TabRefs`], newTabRef],
      }));
    }
  };

  addLanguage = () => {
    const newSelection = this.state.numberOfLanguageSelections.length + 1;
    if (this.state.numberOfLanguageSelections.length < 3) {
      this.setState((prevState) => ({
        numberOfLanguageSelections: [
          ...prevState.numberOfLanguageSelections,
          newSelection,
        ],
      }));
    }
  };

  renderSwitch(values) {
    const step = this.state.step;
    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3: //Bio
        return (
          <FormBio
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4: //Educational
        return (
          <FormEducation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleTabChange={this.handleTabChange}
            handleAddTab={this.handleAddTab}
            values={values}
          />
        );

      case 5: //Experience
        return (
          <FormExperience
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleTabChange={this.handleTabChange}
            handleAddTab={this.handleAddTab}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 6: //Skills
        return (
          <FormSkills
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleTabChange={this.handleTabChange}
            handleAddTab={this.handleAddTab}
            values={values}
          />
        );
      //Confirm
      case 7:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            userFormState={this.state}
          />
        );
      default:
        return (
          <div className="App mt-3">
            <div className="container col-lg-10 mx-auto text-center">
              <h1>Resume Builder</h1>;
            </div>
          </div>
        );
    }
  }

  render() {
    const {
      step,
      styles,
      numberOfLanguageSelections,
      languages,
      languageLevels,
      personalDetails,
      bio,
      educationalDetails,
      experienceDetails,
      skillsDetails,
      languageDetails,
      educationTabValue,
      educationTabRefs,
      educationTabs,
      experienceTabValue,
      experienceTabRefs,
      experienceTabs,
      languageTabValue,
      languageTabs,
      languageTabRefs,
      skillTabValue,
      skillTabs,
      skillTabRefs,
    } = this.state;

    const values = {
      styles,
      numberOfLanguageSelections,
      languages,
      languageLevels,
      personalDetails,
      bio,
      educationalDetails,
      experienceDetails,
      skillsDetails,
      languageDetails,
      educationTabValue,
      educationTabRefs,
      educationTabs,
      experienceTabValue,
      experienceTabRefs,
      experienceTabs,
      languageTabValue,
      languageTabs,
      languageTabRefs,
      skillTabValue,
      skillTabs,
      skillTabRefs,
    };

    return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <React.Fragment>
          <div className="class-1">
            <div className="inner-top-class">
              <AppBar step={step} /> {/* Include the AppBar component */}
              <Grid container>
                <Grid item xs={4} sm={12}>
                  <CustomStepper
                    steps={[
                      "About You",
                      "Contact",
                      "Bio",
                      "Education",
                      "Experience",
                      "Skill",
                      "Confirm",
                    ]}
                    activeStep={step - 1}
                  />
                </Grid>
              </Grid>
              <Divider style={{ marginBottom: "25px" }} />
            </div>
            <Paper className="MuiPaper-root paper-1">
              <CardContent>
                <div className="App mt-3">
                  <div className="container col-lg-10 mx-auto text-center">
                    {this.renderSwitch(values)}
                  </div>
                </div>
              </CardContent>
            </Paper>
            <div className="inner-bottom-div">
              <div className="bottom-inner-div1"></div>
              <Grid container justifyContent="center">
                <Grid item sm={4}></Grid>
                <Grid item container sm={4}>
                  {step > 1 ? (
                    <Grid item xs={5}>
                      <div className="button-label">
                        <CustomButton
                          text="Prev"
                          icon={NavigateBeforeIcon}
                          onClick={this.prevStep}
                          rtl={true}
                        />
                      </div>
                    </Grid>
                  ) : (
                    <Grid item xs={5}></Grid>
                  )}
                  <Grid item xs={2}></Grid>
                  {step < 7 ? (
                    <Grid item xs={5}>
                      <div className="button-label">
                        <CustomButton
                          text="Next"
                          icon={NavigateNextIcon}
                          onClick={this.nextStep}
                        />
                      </div>
                    </Grid>
                  ) : (
                    <Grid item xs={5}>
                      <div className="button-label">
                        <DownloadButton />
                      </div>
                    </Grid>
                  )}
                </Grid>

                <Grid item sm={4}></Grid>
              </Grid>
            </div>
          </div>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default UserForm;
