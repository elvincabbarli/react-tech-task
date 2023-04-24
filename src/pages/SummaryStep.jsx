import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { stepSliceAction } from "../store/step-slice";
import "../css/summary.css";
import Swal from "sweetalert2";
import summary from '../images/summary.png'

const SummaryStep = () => {
  const finalData = useSelector((state) => state.stepReducer.finalData);
  const creditData = useSelector(
    (state) => state.stepReducer.confirmedCreditData
  );
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(stepSliceAction.addCreditData(finalData));
    window.localStorage.setItem(
      "allCreditData",
      JSON.stringify([...creditData, finalData])
    );
    Swal.fire({
      icon: "success",
      showConfirmButton: false,
      title: "Uğrulu Əməliyyat!",
      text: "Kredit Müraciətiniz Qeydə Alındı!",
      footer: '<a  href="/">Ana Səhifəyə Get</a>',
    });
  };

  const rejectHandle = () => {
    Swal.fire({
      title: "Imtina Səbəbiniz Nədir ?",
      input: "select",
      inputOptions: {
        faiz: "Faiz Yüksəkdir",
        məbləg: "Məbləğ Aşağıdır",
        Digər: "Şəxsi Səbəblər",
      },
      inputPlaceholder: "Səbəb Qeyd Edin",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Göndər",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          {
            title: "Səbəb Göndərildi!",
            text: "Bizi Seçdiyiniz üçün Təşəkkür Edirik !",
            icon: "success",
            showConfirmButton: false,
            footer: '<a href="/">Ana Sehifeye Get</a>'
          }
        );
      }
    });
  };

  return (
    <div className="summary-container">
      <h2>Xülasə</h2>
      <div className="summary">
        <div className="personal-info">
          <img src={summary} alt="" />
        </div>
        <div className="credit-info">
        <div>
          <h4>Fəaliyyət sektoru: </h4>
          <span>{finalData.faliyyet}</span>
        </div>
        <div>
          <div>
            <h4>Aylıq gəliri: </h4>
            <span>{finalData.gelirAyliq}</span>
          </div>
          <div>
            <h4>İş təcrübəsi (ay): </h4>
            <span>{finalData.isTecrubesiAy}</span>
          </div>
        </div>
        <div>
          <div>
            <h4>İş təcrübəsi (il): </h4>
            <span>{finalData.isTecrubesiIl}</span>
          </div>
          <div>
            <h4>Region: </h4>
            <span>{finalData.region}</span>
          </div>
        </div>
        <div>
          <div>
            <h4>Biznes ünvanı: </h4>
            <span>{finalData.biznesUnvan}</span>
          </div>
          <div>
            <h4>Valyuta: </h4>
            <span>{finalData.valyuta}</span>
          </div>
        </div>
        <div>
          <div>
            <h4>Biznes kreditin məqsədi: </h4>
            <span>{finalData.meqsed}</span>
          </div>
          <div>
            <h4>Məbləğ: </h4>
            <span>{finalData.mebleg}</span>
          </div>
        </div>
        <div>
          <div>
            <h4>Müddət: </h4>
            <span>{finalData.muddet}</span>
          </div>
          <div>
            <h4>Faiz: </h4>
            <span>{finalData.faiz}</span>
          </div>
        </div>
        </div>
      </div>
      <div className="submit-section">
        <Button onClick={handleConfirm} color="info" variant="contained">
          Təsdiq et
        </Button>
        <Button color="error" onClick={rejectHandle} variant="contained">
          İmtina et
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
