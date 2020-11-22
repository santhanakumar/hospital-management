import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    height: '100%'
  },
}));

const InputLabel = ({ children, className = '' }) => {
  const classes = useStyles();
  return <div className={`${classes.root} ${className}`}>{children}</div>;
};

export default InputLabel;
