import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../css/login.css";
import { stepSliceAction } from "../store/step-slice";
import { useForm } from "react-hook-form";

const FirstStep = () => {
  const dispatch = useDispatch();
  const [faliyyet, setFaliyyet] = useState("");
  const [gelirAyliq, setGelirAyliq] = useState("");
  const [isTecrubesiIl, setIsTecrubesiIl] = useState();
  const [isTecrubesiAy, setIsTecrubesiAy] = useState();
  const [region, setRegion] = useState();
  const [biznesUnvan, setBiznesUnvan] = useState();

  const handleChangeStep = () => {
    const enteredData = {
      faliyyet,
      gelirAyliq,
      isTecrubesiIl,
      isTecrubesiAy,
      region,
      biznesUnvan,
    };

    dispatch(stepSliceAction.changeStep(2));
    dispatch(stepSliceAction.getUserData(enteredData));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="step-form">
      <div className="first-form">
        <div className="first-input">
          <input
            {...register("fSektor", {
              required: "Fəaliyyət Sektorunuzu daxil edin",
            })}
            placeholder="Fəaliyyət Sektoru"
            value={faliyyet}
            type="text"
            onChange={(e) => setFaliyyet(e.target.value)}
          />
          <p>{errors.fSektor?.message}</p>
        </div>
        <div className="first-input">
          <input
            {...register("monthIncome", {
              required: "Aylıq Gəlirinizi daxil edin",
            })}
            placeholder="Aylıq Gəlir"
            value={gelirAyliq}
            type="number"
            onChange={(e) => setGelirAyliq(e.target.value)}
          />
          <p>{errors.monthIncome?.message}</p>
        </div>
        <div className="first-input">
          <input
            {...register("expYear", {
              required: "İş Təcrübənizi(il) daxil edin",
            })}
            placeholder="İş Təcrübəsi(il)"
            value={isTecrubesiIl}
            type="number"
            onChange={(e) => setIsTecrubesiIl(e.target.value)}
          />
          <p>{errors.expYear?.message}</p>
        </div>
        <div className="first-input">
          <input
            {...register("expMonth", {
              required: "İş Təcrübənizi(ay) daxil edin",
            })}
            placeholder="İş Təcrübəsi(ay)"
            value={isTecrubesiAy}
            type="number"
            onChange={(e) => setIsTecrubesiAy(e.target.value)}
          />
          <p>{errors.expMonth?.message}</p>
        </div>
        <div className="first-input">
          <input
            {...register("regionn", { required: "Regionunuzu daxil edin" })}
            placeholder="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
          <p>{errors.regionn?.message}</p>
        </div>
        <div className="first-input">
          <input
            {...register("businessPlace", {
              required: "Biznes Ünvanınızı daxil edin",
            })}
            placeholder="Biznes Ünvanı"
            value={biznesUnvan}
            onChange={(e) => setBiznesUnvan(e.target.value)}
          />
          <p>{errors.businessPlace?.message}</p>
        </div>
        <div className="first-button">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleChangeStep)}
          >
            Növbəti
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FirstStep;
