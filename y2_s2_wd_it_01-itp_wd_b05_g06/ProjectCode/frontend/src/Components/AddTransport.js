import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function AddTransport() {
  const navigate = useNavigate();
  //Create State
  const [driverName, setDriverName] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [transportType, setTransportType] = useState("");
  const [date, setDate] = useState("");
  const [transportStatus, setTransportStatus] = useState("");

  const [error, setError] = useState(false);

  const handleOptionChange1 = (event) => {
    setTransportStatus(event.target.value);
  };

  function sendData(e) {
    e.preventDefault();

    const newTransport = {
      driverName,
      passengerCount,
      startLocation,
      endLocation,
      transportType,
      date,
      transportStatus,
    };

    if (driverName.length == 0) {
      setError(true);
    } else if (passengerCount.length == 0) {
      setError(true);
    } else if (startLocation.length == 0) {
      setError(true);
    } else if (endLocation.length == 0) {
      setError(true);
    } else if (transportType.length == 0) {
      setError(true);
    } else if (date.length == 0) {
      setError(true);
    } else if (transportStatus.length == 0) {
      setError(true);
    }

    // if(mediname.length <= 4){
    //   setmedinameError("Input Valid Medicine Name!")
    // }
    else {
      axios
        .post("http://localhost:8070/Transport/add", newTransport)
        .then((res) => console.log(res.data));

      swal({
        title: "Successfully Added!",
        icon: "success",
        button: "OK!",
      }).then((value) => {
        swal((window.location = "/Transport/view"));
      });
    }
  }

  return (
    <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh', }}>
    <div style={{ marginLeft: "400px" ,height:"500px" }} className="container">
      <form onSubmit={sendData}>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="driverName" style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>Driver Name</label>
            <input
              type="text"
              name="dName"
              class="form-control"
              id="driverName"
              placeholder="Enter Driver Name"
              value={driverName}
              onChange={(e) => {
                setDriverName(e.target.value);
              }}
              style={{ marginBlock: "10px", width:"650px" }}
            />
            {error && driverName.length <= 0 ? (
              <label style={{ color: "red" }}>*Cannot be empty</label>
            ) : (
              ""
            )}
          </div>
          <div class="form-group col-md-6">
            <label for="passengerCount" style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>Passenger Count</label>
            <input
              type="number"
              name="pCount"
              class="form-control"
              id="passengerCount"
              placeholder="Enter Passenger Count"
              value={passengerCount}
              onChange={(e) => {
                setPassengerCount(e.target.value);
              }}
              style={{ marginBlock: "10px", width:"650px" }}
            />
            {error && passengerCount.length <= 0 ? (
              <label style={{ color: "red" }}>*Cannot be empty</label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div class="form-group">
          <label for="startLocation" style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>Start Location</label>
          <input
            type="text"
            name="sLocation"
            class="form-control"
            id="transportType"
            placeholder="Enter Start Location"
            value={startLocation}
            onChange={(e) => {
              setStartLocation(e.target.value);
            }}
            style={{ marginBlock: "10px", width:"650px" }}
          />
          {error && startLocation.length <= 0 ? (
            <label style={{ color: "red" }}>*Cannot be empty</label>
          ) : (
            ""
          )}
        </div>
        <div class="form-group">
          <label for="endLocation"style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>End Location</label>
          <input
            type="text"
            name="eLocation"
            class="form-control"
            id="supplier"
            placeholder="Enter End Location"
            value={endLocation}
            onChange={(e) => {
              setEndLocation(e.target.value);
            }}
            style={{ marginBlock: "10px", width:"650px" }}
          />

          {error && endLocation.length <= 0 ? (
            <label style={{ color: "red" }}>*Cannot be empty</label>
          ) : (
            ""
          )}
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="transportType" style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>Transport Type</label>
            <input
              type="text"
              name="fname"
              class="form-control"
              id="transportType"
              placeholder="Enter Transport Type"
              value={transportType}
              onChange={(e) => {
                setTransportType(e.target.value);
              }}
              style={{ marginBlock: "10px", width:"650px" }}
            />
            {error && transportType.length <= 0 ? (
              <label style={{ color: "red" }}>*Cannot be empty</label>
            ) : (
              ""
            )}
            {error && transportType.length == 0 ? (
              <label style={{ color: "red" }}>
                *Cannot Enter Decimal Values
              </label>
            ) : (
              ""
            )}
          </div>
          <div class="form-group col-md-6">
            <label for="date" style={{ marginTop: "30px", marginLeft: "2px", fontWeight: "bold" }}>Date</label>
            <input
              type="date"
              name="fname"
              class="form-control"
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              style={{ marginBlock: "10px", width:"650px" }}
            />
            {error && date.length <= 0 ? (
              <label style={{ color: "red" }}>*Cannot be empty</label>
            ) : (
              ""
            )}
            {error && date.length == 0 ? (
              <label style={{ color: "red" }}>
                *Cannot Enter Decimal Values
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <h6 className="mb-2 pb-1">status: </h6>
          <div className="form-check form-check-inline">
            <label className="form-check-label" style={{fontWeight: "bold" }} htmlFor="ongoing">
              on Going
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="ongoing"
              value="ongoing"
              onChange={handleOptionChange1}
              
            />
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label" style={{fontWeight: "bold" }}htmlFor="StandBy">
              StandBy
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="StandBy"
              value="StandBy"
              onChange={handleOptionChange1}
              
            />
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label" style={{fontWeight: "bold" }} htmlFor="Completed">
              Completed
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="Completed"
              value="Completed"
              onChange={handleOptionChange1}
              
            />
          </div>
        </div>

        <button style={{ marginTop: "20px"}} type="submit" class="btn btn-primary">
          Add Transport
        </button>
      </form>
    </div>
    </div>
  );
}
