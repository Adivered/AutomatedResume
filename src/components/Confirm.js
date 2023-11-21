import React, { Component } from "react";
import { Grid } from "@mui/material";
import MyDocument from "./utils/MyDocument";
import Loader from "./utils/Loader";

export class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, pdfUrl: null };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const { userFormState } = this.props;
      const clonedState = JSON.parse(JSON.stringify(userFormState));
      delete clonedState.loading;
      delete clonedState.step;
      delete clonedState.styles;
      delete clonedState.numberOfLanguageSelections;
      delete clonedState.educationTabValue;
      delete clonedState.educationTabs;
      delete clonedState.educationTabRefs;
      delete clonedState.experienceTabValue;
      delete clonedState.experienceTabs;
      delete clonedState.experienceTabRefs;
      delete clonedState.languageTabValue;
      delete clonedState.languageTabs;
      delete clonedState.languageTabRefs;
      delete clonedState.skillTabValue;
      delete clonedState.skillTabs;
      delete clonedState.skillTabRefs;
      const response = await fetch("/api/receive_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: clonedState }),
      });

      if (response.status === 200) {
        const data = await response.json();
        this.setState({ pdfUrl: data.pdf_url });
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, pdfUrl } = this.state;

    return (
      <div>
        <Grid container spacings={4}>
          <Grid item sm={2}></Grid>
          <Grid item xs={12} sm={8}>
            <div
              className="box"
              style={{
                height: "100%",
                overflow: "scroll",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <Loader />
              ) : (
                <div style={{ height: "100%" }}>
                  {pdfUrl && <MyDocument fileName={pdfUrl} />}
                </div>
              )}
            </div>
          </Grid>
          <Grid item sm={2}></Grid>
        </Grid>
      </div>
    );
  }
}

export default Confirm;
