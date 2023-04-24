import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { stepSliceAction } from "../store/step-slice";
import "../css/main.css";
import {useForm} from 'react-hook-form'

const SecondStep = () => {
  const [valyuta, setValyuta] = useState("");
  const [meqsed, setMeqsed] = useState("");
  const [mebleg, setMebleg] = useState("");
  const [muddet, setMuddet] = useState("");
  const [faiz, setFaiz] = useState("");



  const dispatch = useDispatch();

  const handleNextStep = () => {
    const enteredData = {
      valyuta,
      meqsed,
      mebleg,
      muddet,
      faiz,
    };

    dispatch(stepSliceAction.changeStep(3));
    dispatch(stepSliceAction.getUserData(enteredData));
  };

  const handlePrevStep = () => {
    dispatch(stepSliceAction.changeStep(1));
  };

  const {register , handleSubmit , formState: {errors}} = useForm()

  return (
    <form className="step-form">
      <div className="second-form">
      <div style={{ marginTop: "15px" }} className="third-input">
        <h3>Valyuta</h3>
        <RadioGroup
          className="radio-input"
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          mt
          {...register('radioButton' , {required: 'Valyuta Secin'})}
        >
          <FormControlLabel
            value="AZN"
            onChange={(e) => setValyuta(e.target.value)}
            control={<Radio />}
            label="AZN"
          />
          <FormControlLabel
            value="USD"
            onChange={(e) => setValyuta(e.target.value)}
            control={<Radio />}
            label="USD"
          />
          <FormControlLabel
            value="TRY"
            onChange={(e) => setValyuta(e.target.value)}
            control={<Radio />}
            label="TRY"
          />
          <FormControlLabel
            value="RUBL"
            onChange={(e) => setValyuta(e.target.value)}
            control={<Radio />}
            label="RUBL"
          />
        </RadioGroup>
        <p>{errors.radioButton?.message}</p>
      </div>
      <div className="third-input">
        <input
          {...register('creditPurp' , {required: 'Kredit Meqsedinizi Qeyd Edin'})}
          className="step-input"
          placeholder="Kredit Meqsedi"
          value={meqsed}
          type="text"
          onChange={(e) => setMeqsed(e.target.value)}
        />
        <p>{errors.creditPurp?.message}</p>
      </div>
      <div className="third-input">
        <input
          {...register('totalPrice' , {required: 'Məbləğ Qeyd Edin'})}
          className="step-input"
          placeholder="Məbləğ"
          value={mebleg}
          type="number"
          onChange={(e) => setMebleg(e.target.value)}
        />
        <p>{errors.totalPrice?.message}</p>

      </div>
      <div className="third-input">
        <input
          {...register('totalMonth' , {required: 'Müddət Qeyd Edin' , min: {
            value: 6,
            message: 'Min Ay 6'
          } , max: {
            value: 48,
            message: 'Max Ay 48'
          }})}
          className="step-input"
          placeholder="Müddət"
          value={muddet}
          type="number"
          onChange={(e) => setMuddet(e.target.value)}
        />
        <p>{errors.totalMonth?.message}</p>

      </div>
      <div className="third-input">
        <input
          {...register('totalInterest' , {required: 'Faiz Qeyd Edin' , min: {
            value: 13,
            message: 'Min Faiz 13'
          } , max: {
            value: 36,
            message: 'Max Faiz 36'
          }})}
          className="step-input"
          placeholder="Faiz"
          value={faiz}
          type="number"
          onChange={(e) => setFaiz(e.target.value)}
        />
        <p>{errors.totalInterest?.message}</p>

      </div>
      <div className="second-buttons">
        <Button color="success" variant="contained" onClick={handlePrevStep}>
          Geri
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit(handleNextStep)}>
          Növbəti
        </Button>
      </div>
    </div>
    </form>
  );
};

export default SecondStep;
