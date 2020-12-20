import { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

import TableCell from "../components/common/TableCell";
import Header from "../components/common/Header";

import { getBalance } from "../utils/helper";
import { API_URL } from "../config";
import dayjs from "dayjs";

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
  const [appointments, setAppointments] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API_URL}/appointments`);
      setAppointments(response.data);
    })();
  }, []);
  console.log(appointments);
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sno</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Age-Gender</TableCell>
                  <TableCell>Appointment Date</TableCell>
                  <TableCell>Balance Amount</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map(
                  (
                    {
                      _id,
                      name,
                      age,
                      gender,
                      appointmentDate,
                      total,
                      payments,
                    },
                    index
                  ) => (
                    <TableRow key={_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{`${age} - ${gender}`}</TableCell>
                      <TableCell>
                        {dayjs(appointmentDate).format("DD-MMM-YYYY")}
                      </TableCell>
                      <TableCell>{getBalance(total, payments)} INR</TableCell>
                      <TableCell>
                        <Link to={`/Appointments/${_id}`}>Click to Pay</Link>
                      </TableCell>
                    </TableRow>
                  )
                )}
                {appointments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7}>No Records</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </main>
    </>
  );
};

export default Appointments;
