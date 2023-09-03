import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';



import {getAllmedicine} from "./InventoryService" 

export default function ViewInventory(){
  const navigate = useNavigate()
  
  const [Inventory, setInventory] = useState([]);
  const [MedicineSearch, setSearch] = useState("");

  useEffect(() => {
    getAllmedicine().then((data) => {
      console.log("data>>", data.data.existingMedicine)
      setInventory(data.data.existingMedicine)
    })
},[])

// const onDelete = (id) => {

//   swal({
//     title:"This item will be permanently deleted. Are You Sure you want to delete this?",
    
//     icon:"warning",
//     button:true,
//     dangerMode:true
//   }).then((willDelete) => {
//     if (willDelete){
//       swal ("Medicine Details Deleted!", {
//         icon:"success",
//       })
//       axios.delete(`http://localhost:8070/Inventory/delete/${id}`)
//       swal(window.location = '/view')
//     } else {
//       swal ("Not Deleted")
//     }
//   })
  
// };

const onDelete = (id) => {
  swal({
    title: "This item will be permanently deleted. Are You Sure you want to delete this?",
    text: "Once deleted, you will not be able to recover this item!",
    icon: "warning",
    buttons: ["Cancel", "Delete"],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios
        .delete(`http://localhost:8070/Inventory/delete/${id}`)
        .then(() => {
          swal({
            title: "Medicine Details Deleted!",
            text: "Item has been successfully deleted!",
            icon: "success",
          }).then(() => {
            window.location = "/view";
          });
        })
        .catch((err) => {
          console.error(err);
          swal({
            title: "Error!",
            text: "An error occurred while deleting the item.",
            icon: "error",
          });
        });
    } else {
      swal("Cancelled", "The item was not deleted.", "info");
    }
  });
};

const styles = StyleSheet.create({
  page: {
      backgroundColor: '#ffffff',
      padding: 20
  },
  section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
  },
  tableHeader: {
      backgroundColor: '#f2f2f2'
  },
  tableRow: {
      flexDirection: 'row'
  },
  tableCell: {
      padding: 5
  }
});

const InventoryDocument = () => (
  <Document>
      <Page size="A3" style={styles.page}>
          <View style={styles.section}>
              <Text style={{ fontSize: 10, marginBottom: 10 }}>Inventory List</Text>
              <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>ID</Text>
                  <Text style={[styles.tableCell, { flex: 6 }]}>Medicine Name</Text>
                  <Text style={[styles.tableCell, { flex: 6 }]}>Supplier</Text>
                  <Text style={[styles.tableCell, { flex: 6 }]}>Medicine Type</Text>
                  <Text style={[styles.tableCell, { flex: 4 }]}>Medicine Number</Text>           
                  <Text style={[styles.tableCell, { flex: 6 }]}>Quantity</Text>
              
              </View>
              {Inventory.map((item,index) => (
                  <View key={index} style={[styles.tableRow, { borderBottom: '1 solid #ccc' }]}>
                      <Text style={[styles.tableCell, { flex: 1 }]}>{index+1}</Text>
                      <Text style={[styles.tableCell, { flex: 6 }]}>{item.mediname}</Text>
                      <Text style={[styles.tableCell, { flex: 6 }]}>{item.supplier}</Text>
                      <Text style={[styles.tableCell, { flex: 6 }]}>{item.meditype}</Text>
                      <Text style={[styles.tableCell, { flex: 4 }]}>{item.medino}</Text>
                      <Text style={[styles.tableCell, { flex: 6 }]}>{item.quantity}</Text>
                  </View>
              ))}
          </View>
      </Page>
  </Document>
);





return(


<>

<div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>


<input type="text" placeholder="Search Item.." name="search2" onChange={(e) =>{setSearch(e.target.value)}}style={{borderRadius:"5px",
 marginTop:"10px",marginBottom:"20px", width:"40%",marginLeft:"700px", marginTop:"20px", boxShadow:" 3px 3px 3px rgba(150, 168, 156)",backgroundColor:"white"}}/>

<div className = "container" style={{ textAlign: "center", marginTop: "10px" }} >

  {/* <table class="table table-bordered">
    <thead>
      <tr>
            
        <th scope="col">#</th>
        <th scope="col">Medicine Name</th>
        <th scope="col">Supplier</th>
        <th scope="col">Medicine Type</th>
        <th scope="col">Medicine Number</th>
        <th scope="col">Quantity</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {Inventory && Inventory.filter(value => {
        if(MedicineSearch === ""){
          return value;
        }else if (value.mediname.toLowerCase().includes(MedicineSearch.toLowerCase())){
          return value;
        }else if (value.supplier.toLowerCase().includes(MedicineSearch.toLowerCase())){
          return value;
        }else if (value.meditype.toLowerCase().includes(MedicineSearch.toLowerCase())){
          return value;
        }else if(value.medino.toLowerCase().includes(MedicineSearch.toLowerCase())){
          return value;
        }
      }).map((Inventory,index) => {
        return(
          <tr>
            <td>{index + 1}</td>
            <td>{Inventory.mediname}</td>
            <td>{Inventory.supplier}</td>
            <td>{Inventory.meditype}</td>
            <td>{Inventory.medino}</td>
            <td>{Inventory.quantity}</td>
            <td>
              <button type="button" class="btn btn-primary" onClick={() => navigate ("/update", {
                state:{Inventory},
              })}>Update</button>      
              <button type="button" class="btn btn-danger" onClick={() => onDelete (Inventory._id)}>Delete</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table> */}

<table className="table table-bordered" style={{ textAlign: "center", marginTop: "10px", backgroundColor: "#eaf0f0", borderRadius: "10px" }}  >
  <thead className="table table-bordered" >
    <tr>
      <th scope="col">#</th>
      <th scope="col">Medicine Name</th>
      <th scope="col">Supplier</th>
      <th scope="col">Medicine Type</th>
      <th scope="col">Medicine Number</th>
      <th scope="col">Quantity</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody className="table table-bordered" >
    {Inventory && Inventory.filter(value => {
      if(MedicineSearch === ""){
        return value;
      }else if (value.mediname.toLowerCase().includes(MedicineSearch.toLowerCase())){
        return value;
      }else if (value.supplier.toLowerCase().includes(MedicineSearch.toLowerCase())){
        return value;
      }else if (value.meditype.toLowerCase().includes(MedicineSearch.toLowerCase())){
        return value;
      }else if(value.medino.toLowerCase().includes(MedicineSearch.toLowerCase())){
        return value;
      }
    }).map((Inventory,index) => {
      return(
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{Inventory.mediname}</td>
          <td>{Inventory.supplier}</td>
          <td>{Inventory.meditype}</td>
          <td>{Inventory.medino}</td>
          <td>{Inventory.quantity}</td>
          <td>
            <button type="button" className="btn btn-primary" style={{ backgroundColor: "#007bff" }}  onClick={() => navigate ("/update", {
              state:{Inventory},
            })}>Update</button>      
            <button type="button" className="btn btn-danger" style={{ backgroundColor: "#c82333" }} onClick={() => onDelete (Inventory._id)}>Delete</button>
            
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

<div className="container" style={{ padding: 0 }}>
    
          <button className="btn btn-success" style={{ margin: '10px 0'}}>
              <PDFDownloadLink style={{ margin: '10px 0', textDecoration: 'none', color: 'white'}} document={<InventoryDocument />} fileName="Inventory-document.pdf">
                  {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download Inventory report now!'
                  }
              </PDFDownloadLink>
          </button>
</div>

</div>


</div>
</>





)

}