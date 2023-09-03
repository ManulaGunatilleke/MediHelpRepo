import React,{useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export default function AddMedicine(){

  const navigate = useNavigate();
  //Create State
  const [mediname, setMediname] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [meditype, setMeditype] = useState("");
  const [medino, setMedino] = useState("");

  const [error, setError] = useState(false);
  
   

  function sendData(e){
    e.preventDefault();

    const newInventory = {
      mediname,
      supplier,
      quantity,
      meditype,
      medino
    }

   

    if (mediname.length==0){
      setError(true)
    } else if (medino.length==0){
      setError(true);
    } else if (meditype.length==0){
      setError(true);
    } else if (supplier.length==0){
      setError(true);
    }else if (quantity.length==0){
      setError(true);
    }else if (quantity.indexOf(".") >= 0){
      setError(true);
    }
      
    

    // if(mediname.length <= 4){
    //   setmedinameError("Input Valid Medicine Name!")
    // }
    else{

      axios.post("http://localhost:8070/Inventory/add",newInventory)
      .then(res => console.log (res.data));

      swal({
        title: "Successfully Added!",
        icon: "success",
        button: "OK!"
      })
      .then((value) => {
        swal(window.location = "/view")
      })
    } 
  }

  return(



<body>

<div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh', }}>

  <div style={{ marginLeft: "400px" ,height:"500px" }} className="container" >
    
    <form onSubmit={sendData}>
      <div class="form-row">
        <div class="form-group col-md-6">
          
          <label style={{ marginTop: "50px", marginLeft: "2px", fontWeight: "bold" }} for="mediname">Medicine Name</label>
          <input style={{ marginBlock: "10px", width:"650px" }} type="text" name="mname" class="form-control" id="mediname" placeholder="Enter Medicine Name" value={mediname} onChange={(e) => {
            setMediname(e.target.value);
          }} />
          {error && mediname.length <= 0 ?
            <label style={{ color: "red" }}>*Cannot be empty</label> : ""}
        </div>
        <div class="form-group col-md-6">
          <label style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} for="medino">Medicine Number</label>
          <input style={{ marginBlock: "10px", width:"650px" }} type="text" name="fname" class="form-control" id="medino" placeholder="Enter Medicine Number" value={medino} onChange={(e) => {
            setMedino(e.target.value);
          }} />
          {error && medino.length <= 0 ?
            <label style={{ color: "red" }}>*Cannot be empty</label> : ""}

        </div>
      </div>
      <div class="form-group">
        <label style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} for="meditype">Medicine Type</label>
        <input style={{ marginBlock: "10px", width:"650px" }} type="text" name="fname" class="form-control" id="meditype" placeholder="Enter Medicine Type" value={meditype} onChange={(e) => {
          setMeditype(e.target.value);
        }} />
        {error && meditype.length <= 0 ?
          <label style={{ color: "red" }}>*Cannot be empty</label> : ""}
      </div>
      <div class="form-group">
        <label style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} for="supplier">Supplier</label>
        <input style={{ marginBlock: "10px", width:"650px" }} type="text" name="fname" class="form-control" id="supplier" placeholder="Enter Supplier Name" value={supplier} onChange={(e) => {
          setSupplier(e.target.value);
        }} />

        {error && supplier.length <= 0 ?
          <label style={{ color: "red" }}>*Cannot be empty</label> : ""}
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }} for="quantity">Quantity</label>
          <input style={{ marginBlock: "10px", width:"650px" }} type="number" name="fname" class="form-control" id="quantity" value={quantity} onChange={(e) => {
            setQuantity(e.target.value);
          }} />
          {error && quantity.length <= 0 ?
            <label style={{ color: "red" }}>*Cannot be empty</label> : ""}
          {error && quantity.indexOf(".") >= 0 ?
            <label style={{ color: "red" }}>*Cannot Enter Decimal Values</label> : ""}
        </div>
      </div>
      <button style={{ marginTop: "20px"}} type="submit" class="btn btn-primary">Add Medicine</button>
  
      
    </form>
  </div>

 </div>

</body>

  )

}