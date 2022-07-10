import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "./../CryptoContext";
import { SingleCoin } from "./../config/api";
import axios from "axios";
import { makeStyles, Typography, LinearProgress } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import CoinInfo from "../components/CoinInfo";
import DOMPurify from "dompurify";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    description: {
      padding: 15,
      color: "darkgrey",
      paddingBottom: 25,
      paddingTop: 0,
      textAlign: "justify",
    },

    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      //   market is responsive
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  })
);

const CoinPage = () => {
  const { coin_id } = useParams();
  const [coin, setCoin] = useState();
  const classes = useStyles();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(coin_id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [coin_id]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "cyan" }} />;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img
            src={coin.image.large}
            alt={coin.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3">{coin.name}</Typography>

          <Typography
            variant="subtitle1"
            className={classes.description}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(coin.description.en.split(". ")[0]),
            }}
          ></Typography>
          <div className={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Rank:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="h5">{coin.market_cap_rank}</Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Current Price:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="h5">
                {symbol}{" "}
                {coin.market_data.current_price[currency.toLowerCase()]}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Market Cap:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="h5">
                {symbol}{" "}
                {coin.market_data.market_cap[currency.toLowerCase()]
                  .toLocaleString()
                  .slice(0, -6)}{" "}
                M
              </Typography>
            </span>
          </div>
        </div>
        {/* chart */}
        <CoinInfo coin={coin} />
      </div>
    </>
  );
};

export default CoinPage;
