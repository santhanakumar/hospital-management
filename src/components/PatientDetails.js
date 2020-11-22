import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";

import countries from "../utils/countries";
import InputLabel from "./common/InputLabel";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  rightMargin: {
    marginRight: theme.spacing(1),
  },
}));

const salutations = [
  {
    label: "Mr.",
    value: 1,
  },
  {
    label: "Mrs.",
    value: 2,
  },
  {
    label: "Ms.",
    value: 3,
  },
];

const genderSalutationMap = {
  male: [1],
  female: [2, 3],
};

const PatientDetails = ({ patientInfo, setPatientInfo }) => {
  const classes = useStyles();
  const {
    salutation,
    name,
    gender,
    dob,
    age,
    ageType,
    appointmentDate,
    phoneNo,
    addressLine1,
    addressLine2,
    city,
    state,
    zipcode,
    country,
  } = patientInfo;
  useEffect(() => {
    const mapedSalutationArr = genderSalutationMap[gender];
    if (mapedSalutationArr && !mapedSalutationArr.includes(salutation)) {
      setPatientInfo({
        ...patientInfo,
        salutation: mapedSalutationArr[0],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender]);
  useEffect(() => {
    if (dob && dob.isValid()) {
      const today = dayjs();
      const monthDiff = today.diff(dob, "M");
      let newAge;
      let newAgeType;
      if (monthDiff > 12) {
        const yrDiff = today.diff(dob, "y");
        newAge = yrDiff;
        newAgeType = "yrs";
      } else {
        newAge = monthDiff;
        newAgeType = "months";
      }
      setPatientInfo({
        ...patientInfo,
        age: newAge,
        ageType: newAgeType,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dob]);
  const renderLabel = (date) => {
    if (date && date.isValid()) {
      return date.format("DD MMM YYYY");
    } else {
      return "";
    }
  };
  const getInputHandler = (inputName) => (event) => {
    setPatientInfo({
      ...patientInfo,
      [inputName]: event.target.value,
    });
  };
  return (
    <Box className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <InputLabel>Patient name</InputLabel>
            </Grid>
            <Grid item xs={10}>
              <Box display="flex">
                <Box className={classes.rightMargin}>
                  <TextField
                    required
                    select
                    variant="outlined"
                    value={salutation}
                    onChange={getInputHandler("salutation")}
                  >
                    <MenuItem value="">Please Select</MenuItem>
                    {salutations.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box flexGrow={1}>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    value={name}
                    onChange={getInputHandler("name")}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <InputLabel>Gender</InputLabel>
            </Grid>
            <Grid item xs={10}>
              <RadioGroup
                row
                value={gender}
                onChange={getInputHandler("gender")}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <InputLabel>DOB</InputLabel>
            </Grid>
            <Grid item xs={10}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                disableFuture
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="DD MMM YYYY"
                labelFunc={renderLabel}
                value={dob}
                onChange={(date) =>
                  getInputHandler("dob")({ target: { value: date } })
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <InputLabel>Age</InputLabel>
            </Grid>
            <Grid item xs={10}>
              <Box display="flex">
                <Box className={classes.rightMargin}>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    value={age}
                    onChange={getInputHandler("age")}
                  />
                </Box>
                <Box flexGrow={1}>
                  <TextField
                    required
                    fullWidth
                    select
                    variant="outlined"
                    value={ageType}
                    onChange={getInputHandler("ageType")}
                  >
                    <MenuItem value="yrs">Years</MenuItem>
                    <MenuItem value="months">Month</MenuItem>
                  </TextField>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <InputLabel>Appointment Date</InputLabel>
            </Grid>
            <Grid item xs={10}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                disableFuture
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="DD MMM YYYY"
                labelFunc={renderLabel}
                value={appointmentDate}
                onChange={(date) =>
                  getInputHandler("appointmentDate")({
                    target: { value: date },
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <InputLabel>Phone No</InputLabel>
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                fullWidth
                variant="outlined"
                value={phoneNo}
                onChange={getInputHandler("phoneNo")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <InputLabel>Address</InputLabel>
            </Grid>
            <Grid item xs={11}>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Street Address"
                value={addressLine1}
                onChange={getInputHandler("addressLine1")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Street Address 2"
                value={addressLine2}
                onChange={getInputHandler("addressLine2")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="City"
                value={city}
                onChange={getInputHandler("city")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="State / Province"
                value={state}
                onChange={getInputHandler("state")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Postal / ZipCode"
                value={zipcode}
                onChange={getInputHandler("zipcode")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                variant="outlined"
                value={country}
                onChange={getInputHandler("country")}
              >
                <MenuItem value="">Please Select</MenuItem>
                {countries.map(({ code, name }) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDetails;
