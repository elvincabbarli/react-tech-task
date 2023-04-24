import React, { useState } from "react";
import "../css/main.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Main = () => {
  // MY STATES
  const [searchedData, setSearchedData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const allUSers = useSelector((state) => state.userReducer.users);


  // MY FUNCTIONS
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchedData.trim().length === 0) {
      setFilteredData([]);
      return;
    }
    setFilteredData(
      allUSers.filter((item) =>
        item.finKod.toLowerCase().includes(searchedData.toLowerCase().trim())
      )
    );
    setIsSearch(true);
  };

  return (
    <div className="main-container">
      <div className="main-inner">
        <h2>Müştəri Axtar:</h2>
        <form className="search-form" onSubmit={handleSearch}>
          <div class="wrap">
            <div class="search">
              <input
                type="text"
                value={searchedData}
                onChange={(e) => setSearchedData(e.target.value)}
                class="searchTerm"
                placeholder="FIN kod daxil et"
              />
              <button type="submit" class="searchButton">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>
        <div className="search-result">
          {isSearch && filteredData.length === 0 && (
            <h1>
              Müştəri Tapılmadı <br />
              <Link style={{ color: "red" }} to="/musteri-login">
                Qeydiyyat Et
              </Link>
            </h1>
          )}
          <div class="container">
            <ul class="responsive-table">
              {isSearch && filteredData.length > 0 && (
                <li class="table-header">
                  <div class="col col-1">Ad:</div>
                  <div class="col col-1">Soyad:</div>
                  <div class="col col-1">Ata Adi</div>
                  <div class="col col-1">FIN Kod</div>
                  <div class="col col-1">Dogum Tarixi</div>
                  <div class="col col-1">Ev Nomresi</div>
                  <div class="col col-1">Cib</div>
                  <div class="col col-1">Faktiki Unvan</div>
                  <div class="col col-1">Qeydiyyat Unvan</div>
                  <div class="col col-1">Kredit</div>
                </li>
              )}
              {isSearch &&
                filteredData.length > 0 &&
                filteredData.map((item) => (
                  <li class="table-row">
                    <div class="col col-1" data-label="Ad">
                      {item.ad}
                    </div>
                    <div class="col col-1" data-label="Soyad">
                      {item.soyad}
                    </div>
                    <div class="col col-1">{item.ataAdi}</div>
                    <div class="col col-1">{item.finKod}</div>
                    <div class="col col-1">{item.dogumTarixi}</div>
                    <div class="col col-1">{item.evNom}</div>
                    <div class="col col-1">{item.mobil}</div>
                    <div class="col col-1">{item.faktikiUnvan}</div>
                    <div class="col col-1">{item.qeydiyyatUnvan}</div>
                    <Link to="/credit" class="col-1">
                      Kredit Add
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
