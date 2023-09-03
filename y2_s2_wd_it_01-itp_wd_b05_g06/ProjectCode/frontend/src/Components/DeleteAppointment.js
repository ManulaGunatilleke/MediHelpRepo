
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function DeleteAdmin() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Appointment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8070/appointment/appointment/delete/${id}`)
                    .then((res) => {
                        console.log(res.data);
                        navigate('/allappointment');
                    })
                    .catch((err) => console.log(err));
                Swal.fire(
                    'Deleted!',
                    'The Appointment has been deleted.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'The Appointment has not been deleted.',
                    'error'
                );
            }
        })
    }

    

    return (
        <div style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/783/366/large_2x/blur-hospital-background-free-photo.jpg')", backgroundSize: 'cover', height: '100vh' }}>
        <div className= "container" >
            <h1 className="h1" style={{marginLeft:"50vh"}}>Click if you want to delete</h1>
            <button type="button" style={{marginLeft:"75vh"}} className="btn btn-danger" onClick={handleDelete}>
                Delete
            </button>
        </div>
        </div>
    );
}