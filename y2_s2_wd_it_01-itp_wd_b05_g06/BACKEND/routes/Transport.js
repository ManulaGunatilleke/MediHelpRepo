const express = require("express");
const router = express.Router();
const res = require("express/lib/response.js");

const Transport = require("../modules/Transport.js");

//add
router.route("/add").post((req, res) => {
  const driverName = req.body.driverName;
  const passengerCount = req.body.passengerCount;
  const startLocation = req.body.startLocation;
  const endLocation = req.body.endLocation;
  const transportType = req.body.transportType;
  const date = req.body.date;
  const transportStatus = req.body.transportStatus;

  const newTransport = new Transport({
    driverName,
    passengerCount,
    startLocation,
    endLocation,
    transportType,
    date,
    transportStatus,
  });

  newTransport
    .save()
    .then(() => {
      res.json("Transport Item Added");
    })
    .catch((err) => {
      console.log(err);
    });
});
//getall

router.route("/allTransport").get((req, res) => {
  Transport.find()
    .then((Transports) => {
      res.json({
        success: true,
        existingTransports: Transports,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get("/readMedi", (req,res) => {
//   Transport.find().eTransports) => {
//     if(err){
//       return res.status(400).json({
//         error:err
//       });
//     }
//     return res.status(200).json({
//       success:true,
//       existingTransports
//     });
//   });
// });

//update
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const {
    driverName,
    passengerCount,
    startLocation,
    endLocation,
    transportType,
    date,
    transportStatus,
  } = req.body;

  const updateTransport = {
    driverName,
    passengerCount,
    startLocation,
    endLocation,
    transportType,
    date,
    transportStatus,
  };

  const update = await Transport.findByIdAndUpdate(userId, updateTransport)
    .then(() => {
      res.status(200).send({ status: "😀 Transport updated " });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//delete
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Transport.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "😀 Transport request deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with delete Transport req",
        error: err.message,
      });
    });
});

//getid
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  const user = await Transport.findById(userId)
    .then((Transport) => {
      res
        .status(200)
        .send({ status: "😀 Transport request fetched", Transport });
    })
    .catch(() => {
      res.status(500).send({
        status: "Error with get Transport request",
        error: err.message,
      });
    });
});

module.exports = router;
