import MdTableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.black}`,
  },
  body: {
    fontSize: 14,
    border: `1px solid ${theme.palette.common.black}`,
  },
}))(MdTableCell);

const TableCell = (props) => <StyledTableCell align="center" {...props} />;

export default TableCell;
