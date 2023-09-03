import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useParams } from 'react-router-dom';

export default function UpdateMedicine() {
  const { state } = useLocation();
  const navigate = useNavigate();

  //Create state
  const [driverName, setDriverName] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [transportType, setTransportType] = useState("");
  const [date, setDate] = useState("");
  const [editedTransportID, setEditedTransportID] = useState("");
  const [editedTransportStatus, setEditedTransportStatus] = useState("");
  

  //Error state
  const [error, setError] = useState(false);

  useEffect(() => {
    setDriverName(state.Transport.driverName);
    setPassengerCount(state.Transport.passengerCount);
    setStartLocation(state.Transport.startLocation);
    setEndLocation(state.Transport.endLocation);
    setTransportType(state.Transport.transportType);
    setDate(state.Transport.date);
    setEditedTransportStatus(state.Transport.transportStatus);
    setEditedTransportID(state.Transport._id); 
    console.log(state.Transport);
  }, []);

  function sendMedi(e) {
    e.preventDefault();

    const newTransport = {
      driverName,
      passengerCount,
      startLocation,
      endLocation,
      transportType,
      date,
      editedTransportStatus
    };

    if (driverName.length == 0) {
      setError(true);
    } else if (passengerCount.length == 0) {
      setError(true);
    } else if (startLocation.length == 0) {
      setError(true);
    } else if (endLocation.length == 0) {
      setError(true);
    // } else if ((transportType.length = 0)) {
    //   setError(true);
    } else if (date.length == 0) {
      setError(true);
    } else {
      axios
        .put(
          `http://localhost:8070/Transport/update/${editedTransportID}`,
          newTransport
        )
        .then(() => {
          navigate("Transport/view");

          swal({
            title: "Successfully Updated!",
            icon: "success",
            button: "OK!",
          }).then((value) => {
            swal((window.location = "/view"));
          });
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }
  }

  return (
    <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>
    <div className="container">
      <form onSubmit={sendMedi}>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="driverName" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Driver Name</label>
            <input
              type="text"
              class="form-control"
              id="driverName"
              placeholder="Enter Driver Name"
              value={driverName}
              onChange={(e) => {
                setDriverName(e.target.value);
              }}
            />
            {error && driverName.length <= 0 ? (
              <label style={{ color: "red" }}>*Cannot be empty</label>
            ) : (
              ""
            )}
          </div>
          <div class="form-group col-md-6" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>
            <label for="startLocation">Start Location</label>
            <input
              type="text"
              class="form-control"
              id="startLocation"
              placeholder="Enter Start Location"
              value={startLocation}
              onChange={(e) => {
                setStartLocation(e.target.value);
              }}
            />
            {error && startLocation.length <= 0 ? (
              <label style={{ color: "red" }}>*Cannot be empty</label>
            ) : (
              ""
            )}
          </div>
          <div class="form-group col-md-6" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>
            <label for="passengerCount">Passenger Count</label>
            <input
              type="number"
              class="form-control"
              id="passengerCount"
              placeholder="Enter Passenger Count"
              value={passengerCount}
              onChange={(e) => {
                setPassengerCount(e.target.value);
              }}
            />
            {error && passengerCount.length <= 0 ? (
              <label style={{ color: "red" }}>*Cannot be empty</label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div class="form-group col-md-6" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>
          <label for="startLocation">Start Location</label>
          <input
            type="text"
            class="form-control"
            id="startLocation"
            placeholder="Enter Start Location"
            value={startLocation}
            onChange={(e) => {
              setStartLocation(e.target.value);
            }}
          />
          {error && startLocation.length <= 0 ? (
            <label style={{ color: "red" }}>*Cannot be empty</label>
          ) : (
            ""
          )}
        </div>
        <div class="form-group">
          <label for="endLocation" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>End Location</label>
          <input
            type="text"
            class="form-control"
            id="endLocation"
            placeholder="Enter Medicine Type"
            value={endLocation}
            onChange={(e) => {
              setEndLocation(e.target.value);
            }}
          />
          {error && endLocation.length <= 0 ? (
            <label style={{ color: "red" }}>*Cannot be empty</label>
          ) : (
            ""
          )}
        </div>
        <div class="form-group">
          <label for="transportType" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Transport Type</label>
          <input
            type="text"
            class="form-control"
            id="supplier"
            placeholder="Enter Supplier Name"
            value={transportType}
            onChange={(e) => {
              setTransportType(e.target.value);
            }}
          />
          {error && transportType.length <= 0 ? (
            <label style={{ color: "red" }}>*Cannot be empty</label>
          ) : (
            ""
          )}
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="date" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Date</label>
            <input
              type="date"
              class="form-control"
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            {error && date.length <= 0 ? (
              <label style={{ color: "red" }}>*Cannot be empty</label>
            ) : (
              ""
            )}
            {error && date.indexOf(".") >= 0 ? (
              <label style={{ color: "red" }}>
                *Cannot Enter Decimal Values
              </label>
            ) : (
              ""
            )}
          </div>
          <div class="form-group col-md-6">
            <label for="status" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Status</label>
            <input
              type="text"
              class="form-control"
              id="status"
              value={editedTransportStatus}
              onChange={(e) => {
                setEditedTransportStatus(e.target.value);
              }}
            />
            {error && editedTransportStatus.length <= 0 ? (
              <label style={{ color: "red" }}>*Cannot be empty</label>
            ) : (
              ""
            )}
            {error && editedTransportStatus.indexOf(".") >= 0 ? (
              <label style={{ color: "red" }}>
                *Cannot Enter Decimal Values
              </label>
            ) : (
              ""
            )}
          </div>
        </div>

        <button style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} type="submit" class="btn btn-primary">
          Update Transport Request
        </button>
      </form>
    </div>
    </div>
  );
}
