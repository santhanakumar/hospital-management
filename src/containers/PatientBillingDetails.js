import { useState } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import dayjs from "dayjs";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Header from "../components/common/Header";
import PatientDetails from "../components/PatientDetails";
import MedicalScanDetails from "../components/MedicalScanDetails";
import { API_URL, APPOINTMENT_STATUS } from "../config";
import { getBillingAmount } from "../utils/helper";

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
  appBarSpacer: theme.mixins.toolbar,
}));

const PatientAndBillingDetails = () => {
  const classes = useStyles();
  const history = useHistory();
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
  const [scanDetails, setScanDetails] = useState([]);

  const saveAppointment = async () => {
    const [amount, discount, total] = getBillingAmount(scanDetails);
    const data = {
      ...patientInfo,
      appointmentDate: dayjs(patientInfo.appointmentDate).startOf("day"),
      amount,
      discount,
      total,
      status: APPOINTMENT_STATUS.NOT_YET_BILLED,
      billingInfo: [
        ...scanDetails.map(({ id, name, ...scanInfo }) => scanInfo),
      ],
    };
    try {
      const response = await axios.put(`${API_URL}/appointments`, data);
      if (response?.data?.status === "success") {
        history.push("/Appointments");
      } else {
        alert(response?.data?.message?.join(', '));
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const canSave =
    !Object.keys(patientInfo).some(
      (key) => patientInfo[key] === "" || patientInfo[key] === null
    ) && scanDetails.length > 0;
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
          <MedicalScanDetails
            scanDetails={scanDetails}
            setScanDetails={setScanDetails}
          />

          <Box className={classes.box} display="flex" justifyContent="center">
            <Button
              color="primary"
              variant="outlined"
              disabled={!canSave}
              onClick={saveAppointment}
            >
              Save
            </Button>
          </Box>
          <Box className={classes.box} display="flex">
            <Typography variant="caption" gutterBottom color="error">
              * All fields are mandatory & Enter atleast one Scan details
            </Typography>
          </Box>
        </Paper>
      </main>
    </>
  );
};

export default PatientAndBillingDetails;
