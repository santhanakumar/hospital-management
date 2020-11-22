import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { v4 as uuidv4 } from "uuid";

import TableCell from "./common/TableCell";
import InputLabel from "./common/InputLabel";

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  formContainer: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  rightMargin: {
    marginRight: theme.spacing(1),
  },
  autoCompleteInput: {
    padding: 0,
  },
  scanPrice: {
    minWidth: 100,
  },
}));

const scanList = [
  {
    id: 1,
    label: "CT Brain",
    price: 600,
    maxDiscount: {
      isPercent: false,
      discount: 100,
    },
  },
  {
    id: 2,
    label: "MRI Brain",
    price: 1000,
    maxDiscount: {
      isPercent: false,
      discount: 300,
    },
  },
  {
    id: 3,
    label: "Glucose Fasting",
    price: 100,
    maxDiscount: {
      isPercent: true,
      discount: 10,
    },
  },
];

export default function PatientDetails() {
  const [scanDetails, setScanDetails] = useState([]);
  const [scanType, setScanType] = useState({});
  const [discount, setDiscount] = useState(0);

  const classes = useStyles();
  const saveScanDetails = () => {
    if (scanType) {
      const id = uuidv4();
      const name = scanType.label;
      const amount = scanType.price;
      let scanDiscount = 0;
      if (discount) {
        let maxDiscount = scanType.maxDiscount.discount;
        if (scanType.maxDiscount.isPercent) {
          maxDiscount = amount * (maxDiscount / 100);
        }
        if (discount <= maxDiscount) {
          scanDiscount = discount;
        } else {
          alert("Discount entered is more than Maximum discounted price!");
          return;
        }
      }
      const total = amount - discount;
      setScanDetails([
        ...scanDetails,
        {
          id,
          name,
          amount,
          scanDiscount,
          total,
        },
      ]);
      setDiscount(0);
      setScanType({});
    }
  };
  const deleteScanDetail = (deleteId) => {
    setScanDetails(scanDetails.filter(({ id }) => id !== deleteId));
  };
  console.log(scanType);
  return (
    <Box className={classes.box}>
      <Grid container spacing={2} className={classes.formContainer}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <InputLabel className={classes.rightMargin}>Scan List</InputLabel>
            <Autocomplete
              options={scanList}
              style={{ width: 300 }}
              className={classes.rightMargin}
              value={scanType}
              getOptionLabel={({ label }) => label || ""}
              getOptionSelected={({ id: optionId }, { id }) => optionId === id}
              onChange={(event, newValue) => {
                setScanType(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    className: classes.autoCompleteInput,
                  }}
                  variant="outlined"
                />
              )}
            />
            <InputLabel className={classes.rightMargin}>Scan Amount</InputLabel>
            <Typography
              color="error"
              className={`${classes.rightMargin} ${classes.scanPrice}`}
            >
              {scanType && Object.keys(scanType).length ? scanType.price : "--"}
            </Typography>
            <InputLabel className={classes.rightMargin}>Discount</InputLabel>
            <TextField
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className={classes.rightMargin}
              variant="outlined"
            />
            <Button
              onClick={saveScanDetails}
              disabled={!scanType}
              color="primary"
              variant="outlined"
            >
              Add
            </Button>
          </Box>
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sno</TableCell>
              <TableCell>Scan Name</TableCell>
              <TableCell>Scan Amount</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scanDetails.map(
              ({ id, name, amount, scanDiscount, total }, index) => (
                <TableRow key={id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>{scanDiscount}</TableCell>
                  <TableCell>{total}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => deleteScanDetail(id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
