import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { KeyboardDatePicker } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import InputLabel from "../components/common/InputLabel";
import { APPOINTMENT_STATUS } from "../config";

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  statusBox: {
    minWidth: 210,
  },
  rightMargin: {
    marginRight: theme.spacing(1),
  },
}));

const AppointmentFilters = ({ filters, handleChangeFilter, onSearchClick }) => {
  const classes = useStyles();
  const { fromDate, toDate, status, term } = filters;

  const renderLabel = (date) => {
    if (date && date.isValid()) {
      return date.format("DD MMM YYYY");
    } else {
      return "";
    }
  };
  return (
    <Grid container spacing={2} className={classes.box}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <Box display="flex" flexGrow={1} alignItems="center">
            <InputLabel className={classes.rightMargin}>From Date</InputLabel>
            <KeyboardDatePicker
              fullWidth
              disableToolbar
              disableFuture
              autoOk
              variant="inline"
              inputVariant="outlined"
              format="DD MMM YYYY"
              labelFunc={renderLabel}
              className={classes.rightMargin}
              value={fromDate}
              onChange={(date) => {
                handleChangeFilter("fromDate", date);
              }}
            />
          </Box>
          <Box display="flex" flexGrow={1} alignItems="center">
            <InputLabel className={classes.rightMargin}>To Date</InputLabel>
            <KeyboardDatePicker
              fullWidth
              disableToolbar
              disableFuture
              autoOk
              variant="inline"
              inputVariant="outlined"
              format="DD MMM YYYY"
              labelFunc={renderLabel}
              className={classes.rightMargin}
              value={toDate}
              onChange={(date) => {
                handleChangeFilter("toDate", date);
              }}
            />
          </Box>
          <Box display="flex" flexGrow={1} alignItems="center">
            <InputLabel className={classes.rightMargin}>Status</InputLabel>
            <TextField
              required
              select
              variant="outlined"
              className={clsx(classes.rightMargin, classes.statusBox)}
              value={status}
              onChange={(e) => handleChangeFilter("status", e.target.value)}
            >
              <MenuItem value="">Please Select</MenuItem>
              {[
                APPOINTMENT_STATUS.NOT_YET_BILLED,
                APPOINTMENT_STATUS.DUE_BILLED,
                APPOINTMENT_STATUS.FULLY_BILLED,
              ].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box display="flex" flexGrow={1} alignItems="center">
            <InputLabel className={classes.rightMargin}>
              Common Search
            </InputLabel>
            <TextField
              className={classes.rightMargin}
              required
              variant="outlined"
              value={term}
              onChange={(e) => handleChangeFilter("term", e.target.value)}
            />
            <Button color="primary" variant="outlined" onClick={onSearchClick}>
              Search
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AppointmentFilters;
