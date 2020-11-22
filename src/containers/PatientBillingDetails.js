import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Header from "../components/common/Header";
import PatientDetails from "../components/PatientDetails";
import MedicalScanDetails from "../components/MedicalScanDetails";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
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
  return (
    <>
      <Header />
      <main className={classes.layout}>
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
        </Paper>
      </main>
    </>
  );
};

export default PatientAndBillingDetails;
