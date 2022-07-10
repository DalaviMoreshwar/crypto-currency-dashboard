import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "./../CryptoContext";
import { SingleCoin } from "./../config/api";
import axios from "axios";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({});

const CoinPage = () => {
  const { coin_id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(coin_id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [coin_id]);

  return <div>CoinPage{coin_id}</div>;
};

export default CoinPage;
