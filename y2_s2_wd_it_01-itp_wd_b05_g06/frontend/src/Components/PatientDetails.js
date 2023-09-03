import React, {Component} from "react";
import axios from 'axios';

export default class patientDetails extends Component {  

    constructor(props){
        super(props);
        //this.componentDidMount = this.componentDidMount.bind(this)
        this.state = {
            patient:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;
        
        axios.get("http://localhost:8070/patient/get/" + {id}).then((res)=>{
            if(res.data.success){
                this.setState({
                    patient:res.data.student
                });
            }

            console.log(this.state.patient);

        });
    }


    render() {
        return (
             <table>
                <tbody>{this.state.patient.map((item,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>   
                        <td>{item.fname}</td>
                        <td>{item.lname}</td>
                        <td>{item.age}</td>
                        <td>{item.gender}</td>
                        <td>{item.type}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td></tr>))}
                 </tbody>
             </table>
        )
   }
}
