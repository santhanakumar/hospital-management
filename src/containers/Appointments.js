import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Header from "../components/common/Header";

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

const Appointments = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <main className={clsx(classes.layout, classes.content)}>
        <div className={classes.appBarSpacer} />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" gutterBottom color="primary">
            Appointments
          </Typography>
          <Divider />
        </Paper>
      </main>
    </>
  );
};

export default Appointments;
