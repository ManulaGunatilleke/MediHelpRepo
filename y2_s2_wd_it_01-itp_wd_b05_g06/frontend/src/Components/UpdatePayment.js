import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';      

export default function UpdateDoctor(){

    let navigate = useNavigate();

    const [Cholder, setCholder] = useState("");
    const [Cnumber, setCnumber] = useState("");
    const [date, setDate] = useState("");
    const [cvv, setcvv] = useState("");

    const { id } = useParams();



    useEffect(() => {
        axios.get(`http://localhost:8070/ipayments/get/${id}`).then((res) => {
            setCholder(res.data.card.Cholder);
            setCnumber(res.data.card.Cnumber);
            setDate(res.data.card.date);
            setcvv(res.data.card.cvv);
            
        }).catch((err) => {
            console.log(err);
        })
    },[id]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!Cholder || !Cnumber || !date || !cvv) {
            alert("Please fill in all the fields");
            return;
          }

            const nameRegex = /^[a-zA-Z\s]*$/;
            const cardNumberRegex = /^[0-9]{16}$/;
            const cvvRegex = /^[0-9]{3}$/;

        if (!Cholder.match(nameRegex)) {
            alert("Please enter a valid Card Holder Name");
            return;
        }

        if (!Cnumber.match(cardNumberRegex)) {
            alert("Please enter a valid Card Number");
            return;
        }

        if (!cvv.match(cvvRegex)) {
            alert("Please enter a valid cvv");
            return;
        }

        if (!date) {
            alert("Please select a valid Expire Date");
            return;
        }

        const updatePayment = {
            Cholder,
            Cnumber,
            date,
            cvv
        };
        await axios.put(`http://localhost:8070/ipayments/update/${id}`, updatePayment)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
        navigate('/allpayment');
    }
    
    return (
        <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="Card Holder Name" className="form-label" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Card Holder Name</label>
                    <input type="text" className="form-control" id="CardHolderName" name="CardHolderName" value={Cholder} onChange={(e) => setCholder(e.target.value)} required />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="Card Number" className="form-label" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Card Number</label>
                    <input type="number" className="form-control" id="CardNumber" name="CardNumber" value={Cnumber} onChange={(e) => setCnumber(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Expire Date" className="form-label" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>Expire Date</label>
                    <input type="date" className="form-control" id="ExpireDate" name="ExpireDate" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="cvv" className="form-label" style={{ marginTop: "20px", marginLeft: "2px", fontWeight: "bold" }}>cvv</label>
                    <input type="number" className="form-control" id="cvv" name="cvv" value={cvv} onChange={(e) => setcvv(e.target.value)} required />
                </div>
                
                <div className="mt-4 pt-2">
                    <button type="submit" className="btn btn-primary">Update Payment</button>
                </div>
            </form>
        </div>
        </div>
    );

}