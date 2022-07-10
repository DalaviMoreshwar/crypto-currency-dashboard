import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "./../../config/api";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },

  courselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "#f9f9f9",
  },
});

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  console.log(trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.courselItem} to={`/coin-details/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span style={{ color: "#ff9" }}>
          {coin.symbol} &nbsp;
          {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}%{" "}
          <span
            style={{
              color: profit > 0 ? " rgb(14, 203, 129) " : "#ff0c0c",
              fontWeight: "500",
            }}
          >
            {profit > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} &nbsp;
          {coin.current_price.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 5,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
