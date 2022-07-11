import { makeStyles } from "@material-ui/core";
import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectButton: {
      border: "1px solid cyan",
      borderRadius: 3,
      padding: 10,
      marginLeft: 20,
      marginRight: 20,
      cursor: "pointer",
      backgroundColor: selected ? "cyan" : "",
      color: selected ? "black" : "",
      "&:hover": {
        backgroundColor: "cyan",
        color: "black",
      },
    },
  });
  const classes = useStyles();
  return (
    <span onClick={onClick} className={classes.selectButton}>
      {children}
    </span>
  );
};

export default SelectButton;
