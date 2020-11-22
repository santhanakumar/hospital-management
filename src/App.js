import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import PatientAndBillingDetails from "./containers/PatientBillingDetails";

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

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <Switch>
            <Route path="/">
              <PatientAndBillingDetails />
            </Route>
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}
