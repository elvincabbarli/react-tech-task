import { Button } from "@mui/material";
import React, { useState } from "react";
import { stepSliceAction } from "../store/step-slice";
import { useDispatch, useSelector } from "react-redux";
import { zaminSliceAction } from "../store/zamin-slice";
import Swal from "sweetalert2";
import MaskedInput from "react-text-mask";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form'

const ThirdStep = () => {
  const [adz, setAdz] = useState("");
  const [soyadz, setSoyadz] = useState("");
  const [faktikiUnvanz, setFaktikiz] = useState("");
  const [mobilz, setMobilz] = useState("");
  const [finKodz, setFinKodz] = useState("");
  const dispatch = useDispatch();

  const allZamins = useSelector((state) => state.zaminReducer.zamin);

  const handlePrevStep = () => {
    dispatch(stepSliceAction.changeStep(2));
  };

  const handleRemove = (finkod) => {
    dispatch(zaminSliceAction.removeZamin(finkod))
    const newZamin = allZamins.filter(item => item.finKodz !== finkod)
    window.localStorage.setItem('zamins' ,JSON.stringify(newZamin))
  }

  const handleThirdSubmit = (e) => {
    e.preventDefault();
    dispatch(stepSliceAction.changeStep(4));
  };

  const sendSubmit = () => {
    const defaultValuesz = {
      adz,
      soyadz,
      faktikiUnvanz,
      mobilz,
      finKodz,
    };

    dispatch(zaminSliceAction.addZamin(defaultValuesz));
    window.localStorage.setItem(
      "zamins",
      JSON.stringify([...allZamins, defaultValuesz])
    );
    Swal.fire({
      icon: "success",
      title: "Uğrulu Əməliyyat!",
      text: "Zamin Bazaya Əlavə Olundu",
    });
    setAdz('')
    setSoyadz('')
    setFaktikiz('')
    setMobilz('')
    setFinKodz('')
  };

  const {register , handleSubmit , formState: {errors}} = useForm()

  return (
    <div class="third-form zamin-form">
      <div className="third-input zamin-input">
        <h3>Zamin Əlavə Et</h3>
      </div>
      <form>
        <div class="user-details">
          <div class="input-box zamin-inputs">
            <input
              placeholder="Ad"
              value={adz}
              id="name-input"
              onChange={(e) => setAdz(e.target.value)}
              name="name"
              type="text"
              required
            />
          </div>
          <div class="input-box zamin-inputs">
            <input
            {...register('lastName' , {required: 'Soyad daxil edin'})}
              placeholder="Soyad"
              type="text"
              value={soyadz}
              onChange={(e) => setSoyadz(e.target.value)}
            />
             <p>{errors.lastName?.message}</p>
          </div>
          <div class="input-box zamin-inputs">
            <input
             {...register('finNumber' , {required: 'FIN kod daxil edin' , maxLength: 8})}
              placeholder="FIN"
              type="text"
              value={finKodz}
              onChange={(e) => setFinKodz(e.target.value)}
            />
            <p>{errors.finNumber?.message}</p>
          </div>
          <div class="input-box zamin-inputs">
            <MaskedInput
              mask={["(",/[0-9]/,/\d/,/\d/,")"," ",/\d/,/\d/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/,]}
              placeholder="Cib Telefonu"
              guide={true}
              value={mobilz}
              onChange={(e) => setMobilz(e.target.value)}
            />
          </div>
          <div class="input-box zamin-inputs">
            <input
             {...register('actualAdress' , {required: 'Faktiki Unvan daxil edin'})}
              placeholder="Faktiki Unvan"
              type="text"
              value={faktikiUnvanz}
              onChange={(e) => setFaktikiz(e.target.value)}
            />
            <p>{errors.actualAdress?.message}</p>
          </div>
        </div>
        <div class="button zamin-form-button">
          <input onClick={handleSubmit(sendSubmit)} type="submit" value="Əlavə Et" />
        </div>
      </form>
      <hr />
      <div className="added-zamin">
          <h3>Əlavə Edilmiş Zaminlər</h3>

          <ul class="responsive-table">
              { allZamins.length > 0 && (
                <li class="table-header">
                  <div class="col col-2">Ad:</div>
                  <div class="col col-2">Soyad:</div>
                  <div class="col col-2">FIN Kod</div>
                  <div class="col col-2">Cib</div>
                  <div class="col col-2">Faktiki Unvan</div>
                  <div class="col col-2">Action</div>
                </li>
              )}
              {
                allZamins.length > 0 &&
                allZamins.map((item) => (
                  <li class="table-row">
                    <div class="col col-2" data-label="Ad">{item.adz}</div>
                    <div class="col col-2" data-label="Soyad">{item.soyadz}</div>
                    <div class="col col-2">{item.finKodz}</div>
                    <div class="col col-2">{item.mobilz}</div>
                    <div class="col col-2">{item.faktikiUnvanz}</div>
                    <Link onClick={handleRemove.bind(null , item.finKodz)} class="col-2"><i class="fa fa-trash" aria-hidden="true"></i></Link>
                  </li>
                ))}
            </ul>
      </div>
      <div style={{marginBottom: '15px'}} className="third-buttons">
        <Button variant="contained" color="success" onClick={handlePrevStep}>
          Geri
        </Button>
        <Button variant="contained" color="primary" onClick={handleThirdSubmit}>
          Növbəti
        </Button>
      </div>
    </div>
  );
};

export default ThirdStep;
