import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Header from "./components/Header";
import CoinPage from "./pages/CoinPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#14161a",
    color: "#f9f9f9",
    minHeight: "100vh",
  },
});

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<CoinPage />}>
            <Route path="/coin-details/:coin_id" element={<CoinPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
