import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSliceAction } from "../store/user-slice";
import { useForm} from 'react-hook-form'
import MaskedInput from "react-text-mask";
import '../css/login.css'
import Swal from "sweetalert2";

const Form = () => {
  // MY STATES
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [ataAdi, setAtaadi] = useState("");
  const [qeydiyyatUnvan, setQeydiyyat] = useState("");
  const [faktikiUnvan, setFaktiki] = useState("");
  const [dogumTarixi, setTarix] = useState("");
  const [mobil, setMobil] = useState("");
  const [evNom, setEvnom] = useState("");
  const [finKod, setFinKod] = useState("");

  // REDUX THINGS
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userReducer.users);


  // MY FUNCTIONS
  const myFunc = () => {
    const defaultValues = {ad,soyad,ataAdi,qeydiyyatUnvan,faktikiUnvan,dogumTarixi,mobil,evNom,finKod};

    dispatch(userSliceAction.addUser(defaultValues));
    window.localStorage.setItem('users' , JSON.stringify([...allUsers , defaultValues]))
    Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      title: 'Uğrulu Əməliyyat!',
      text: 'Müştəri Bazaya Əlavə Olundu',
      footer: '<a  href="/">Ana Səhifəyə Get</a>'
    })
  };


  // REACT HOOK FORM
  const {register , handleSubmit , formState: {errors}} = useForm()


  return (   
    <div className="containerr">
    <div className="title">Müştəri Qeydiyyatı</div>
    <div className="content">
      <form onSubmit={handleSubmit((data) => {
        return myFunc()
      })}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Ad</span>
            <input placeholder="Ad"
             id="name-input"
             {...register('firstName' , {required: 'Adınızı daxil edin'})}
             type="text"
             value={ad}
             onChange={(e) => setAd(e.target.value)} />
             <p>{errors.firstName?.message}</p>
          </div>
          <div className="input-box">
            <span className="details">Soyad</span>
            <input placeholder="Soyad"
            {...register('lastName' , {required: 'Soyadınızı daxil edin'})}
             type="text"
             value={soyad}
             onChange={(e) => setSoyad(e.target.value)} />
             <p>{errors.lastName?.message}</p>
          </div>
          <div className="input-box">
            <span className="details">Ata Adı</span>
            <input  placeholder="Ata Adi"
            {...register('fatherName' , {required: 'Ata Adını daxil edin'})}
             type="text"
             value={ataAdi}
             onChange={(e) => setAtaadi(e.target.value)}  />
            <p>{errors.fatherName?.message}</p>
          </div>
          <div className="input-box">
            <span className="details">FIN</span>
            <input  placeholder="FIN"
             type="text"
             {...register('finNumber' , {required: 'FIN kodunuzu daxil edin' , maxLength: 8})}
             value={finKod}
             onChange={(e) => setFinKod(e.target.value)}  />
            <p>{errors.finNumber?.message}</p>
          </div>
          <div className="input-box">
            <span className="details">Cib Telefonu</span>
            <MaskedInput  mask={["(",/[0-9]/,/\d/,/\d/,")"," ",/\d/,/\d/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/,]}
             placeholder="Cib Telefonu"
             guide={true}
             value={mobil}
             onChange={(e) => setMobil(e.target.value)}  />
          </div>
          <div className="input-box">
            <span className="details">Ev Telefonu</span>
            <MaskedInput  mask={["(",/[0-9]/,/\d/,/\d/,")"," ",/\d/,/\d/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/,]}
             placeholder="Ev Telefonu"
             guide={true}
             value={evNom}
             onChange={(e) => setEvnom(e.target.value)}  />
          </div>
          <div className="input-box">
            <span className="details">Faktiki Unvan</span>
            <input
             placeholder="Faktiki Unvan"
             {...register('actualAdress' , {required: 'Faktiki Unvanınızı daxil edin'})}
             type="text"
             value={faktikiUnvan}
             onChange={(e) => setFaktiki(e.target.value)}
           />
            <p>{errors.actualAdress?.message}</p>
          </div>
          <div className="input-box">
            <span className="details">Qeydiyyat Unvan</span>
            <input
             placeholder="Qeydiyyat Unvan"
             {...register('registerAdress' , {required: 'Qeydiyyat Unvanınızı daxil edin'})}
             type="text"
             value={qeydiyyatUnvan}
             onChange={(e) => setQeydiyyat(e.target.value)}
              />
               <p>{errors.registerAdress?.message}</p>
          </div>
          <div className="input-box">
            <span className="details">Ad Günü</span>
            <input
              id="date"
              placeholder="Ad Günü"
              {...register('birthDay' , {required: 'Ad Gününüzü daxil edin'})}
              type="date"
              value={dogumTarixi}
              onChange={(e) => setTarix(e.target.value)}
               />
               <p>{errors.birthDay?.message}</p>
          </div>
        </div>
        <div className="button">
          <input  type="submit" value="Qeydiyyat" />
        </div>
      </form>
    </div>
  </div>


  );
};
export default Form;
