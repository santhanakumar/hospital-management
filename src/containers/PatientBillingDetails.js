import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Header from "../components/common/Header";
import PatientDetails from "../components/PatientDetails";
import MedicalScanDetails from "../components/MedicalScanDetails";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
  },
  paper: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  box: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar
}));

const PatientAndBillingDetails = () => {
  const classes = useStyles();
  const [patientInfo, setPatientInfo] = useState({
    salutation: "",
    name: "",
    gender: "",
    dob: null,
    age: "",
    ageType: "yrs",
    appointmentDate: null,
    phoneNo: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });
  const canSave = !Object.keys(patientInfo).some(
    (key) => patientInfo[key] === "" || patientInfo[key] === null
  );
  return (
    <>
      <Header />
      <main className={clsx(classes.layout, classes.content)}>
        <div className={classes.appBarSpacer} />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" gutterBottom color="primary">
            Patient Details
          </Typography>
          <Divider />
          <PatientDetails
            patientInfo={patientInfo}
            setPatientInfo={setPatientInfo}
          />

          <Typography component="h1" variant="h5" gutterBottom color="primary">
            Medical Scan Details
          </Typography>
          <Divider />
          <MedicalScanDetails />

          <Box className={classes.box} display="flex" justifyContent="center">
            <Button color="primary" variant="outlined" disabled={!canSave}>
              Save
            </Button>
          </Box>
          <Box className={classes.box} display="flex">
            <Typography
              variant="caption"
              gutterBottom
              color="error"
            >
              * All fields are mandatory
            </Typography>
          </Box>
        </Paper>
      </main>
    </>
  );
};

export default PatientAndBillingDetails;
