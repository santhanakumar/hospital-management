import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";

import InputLabel from "./common/InputLabel";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  rightMargin: {
    marginRight: theme.spacing(1),
  },
}));

export default function PatientDetails() {
  const classes = useStyles();
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
                  <TextField required select variant="outlined">
                    <MenuItem value={10}>Mr.</MenuItem>
                    <MenuItem value={20}>Mrs.</MenuItem>
                    <MenuItem value={30}>Ms.</MenuItem>
                  </TextField>
                </Box>
                <Box flexGrow={1}>
                  <TextField fullWidth required variant="outlined" />
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
              <RadioGroup row>
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
                variant="inline"
                inputVariant="outlined"
                defaultValue="2017-05-24"
                format="DD MMM YYYY"
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
                  <TextField fullWidth required variant="outlined" />
                </Box>
                <Box flexGrow={1}>
                  <TextField required fullWidth select variant="outlined">
                    <MenuItem value={10}>Years</MenuItem>
                    <MenuItem value={20}>Month</MenuItem>
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
                variant="inline"
                inputVariant="outlined"
                defaultValue="2017-05-24"
                format="DD MMM YYYY"
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
              <TextField required fullWidth variant="outlined" />
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
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required fullWidth select variant="outlined">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
