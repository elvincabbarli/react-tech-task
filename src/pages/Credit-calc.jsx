import { Button } from "@mui/material";
import React, { useState } from "react";
import { stepSliceAction } from "../store/step-slice";
import { useDispatch, useSelector } from "react-redux";

const ThirdStep = () => {
  const finalData = useSelector((state) => state.stepReducer.finalData);
  const dispatch = useDispatch();
  const [movementS, setMovements] = useState([]);

  const handlePrevStep = () => {
    dispatch(stepSliceAction.changeStep(3));
  };

  let mebleg = Number(finalData.mebleg);
  let faiz = Number(finalData.faiz) / 1200;
  let muddet = Number(finalData.muddet);

  const annuity = (mebleg, faiz, muddet) =>
    mebleg * (faiz / (1 - (1 + faiz) ** -muddet));

  const balance_t = (mebleg, faiz, P) => {
    const period_movements = {
      base: mebleg,
    };
    period_movements.interest = mebleg * faiz;
    period_movements.amortization = P - mebleg * faiz;
    period_movements.annuity = P;
    period_movements.final_value =
      Math.round((mebleg - period_movements.amortization) * 100) / 100;

    return period_movements;
  };

  const display_mortgage = (mebleg, faiz, muddet) => {
    const payements = annuity(mebleg, faiz, muddet);
    let movements = balance_t(mebleg, faiz, payements);
    let myArray = [];
    while (movements.final_value > -0.01) {
      movements = balance_t(movements.final_value, faiz, payements);
      myArray.push(movements);
    }
    setMovements(myArray);
  };

  const hesablaHandler = () => {
    display_mortgage(mebleg, faiz, muddet);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(stepSliceAction.changeStep(5));
  };

  return (
    <div class="third-form">
      <h3 className="kredit-h3">Kredit Kalkulyatoru</h3>
      <div className="credit-infos">
        <p>Ayliq Faiz: {finalData.faiz}%</p>
        <p>Mebleg: {finalData.mebleg}AZN</p>
        <p>Muddet: {finalData.muddet}Ay</p>
      </div>
      <Button onClick={hesablaHandler}>Kredit Cedvelini Göstər</Button>
      <div>
        <div class="container">
          <ul class="responsive-table">
            {movementS.length > 0 && (
              <li class="table-header">
                <div class="col col-3">Ödəniş Məbləği:</div>
                <div class="col col-3">Əsas Borc:</div>
                <div class="col col-3">Faiz</div>
                <div class="col col-3">Qalıq</div>
              </li>
            )}
            {movementS.length > 0 &&
              movementS.map((item) => (
                <li class="table-row">
                  <div class="col col-3" data-label="Ad">
                    {parseFloat(item.annuity.toFixed(2))}
                  </div>
                  <div class="col col-3" data-label="Soyad">
                    {Math.round(parseFloat(item.amortization.toFixed(2)))}
                  </div>
                  <div class="col col-3">
                    {parseFloat(item.interest.toFixed(2))}
                  </div>
                  <div class="col col-3">
                    {parseFloat(item.base.toFixed(2))}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div style={{ marginBottom: "15px" }} className="third-buttons">
        <Button variant="contained" color="success" onClick={handlePrevStep}>
          Geri
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Növbəti
        </Button>
      </div>
    </div>
  );
};

export default ThirdStep;
