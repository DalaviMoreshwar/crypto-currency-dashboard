import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const NoPage = () => {
  const useStyles = makeStyles({
    noPage: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "white",
    },
  });

  const classes = useStyles();
  return (
    <div className={classes.noPage}>
      <img
        src={
          "https://cdni.iconscout.com/illustration/premium/thumb/404-error-5227304-4377020.png"
        }
        alt="page not found"
      />
      <Typography variant="h5">Page not found!</Typography>
    </div>
  );
};

export default NoPage;
