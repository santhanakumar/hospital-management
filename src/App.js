import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';


import PatientAndBillingDetails from "./containers/PatientBillingDetails";
import Appointments from "./containers/Appointments";

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      input: {
        paddingTop: 10,
        paddingBottom: 10,
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            <Switch>
              <Route path="/" exact>
                <PatientAndBillingDetails />
              </Route>
              <Route path="/Appointments">
                <Appointments />
              </Route>
            </Switch>
          </Router>
        </MuiPickersUtilsProvider>
      </div>
    </ThemeProvider>
  );
}
