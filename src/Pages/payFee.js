import React, {useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


{/*this component has a drop down menu to choose from the list of students from and then a button to pay their fee  */}

const PayFee = () => {
    const [students,setStudents] = useState([]);
    const [selectedStudent,setSelectedStudent] = useState("");
    const [fee,setFee] = useState("");
    const [paid,setPaid] = useState(false);
    const [message,setMessage] = useState("");
    const [user,setUser] = useState({});
    const [token,setToken] = useState("");

    useEffect(() =>{
        if(!localStorage.getItem('user')){
            window.location.href = '/login';
        }
        else{
            // setUser(JSON.parse(localStorage.getItem('user')));
            // setToken(localStorage.getItem('token'));
        }
    
        const token = JSON.parse(localStorage.getItem('token'))

        fetch('https://taalib-accountofficer-api.onrender.com/accountOffice/getallunpaidstudents',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                token:token
            }
        })
        .then(res=>res.json())
        .then(res=>{
            setStudents(res)
        })
        .catch(err=>{
            console.log(err)
        })
    },[]);

    const payFee = () =>{
        const token = JSON.parse(localStorage.getItem('token'))
        fetch('https://taalib-accountofficer-api.onrender.com/accountOffice/paychallan',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                token:token
            },
            body:JSON.stringify({
                studentID:selectedStudent,
            })
        })
        .then(res=>res.json())
        .then(res=>{
            if (res.message === "Fee Paid"){
                setPaid(true)
                setMessage(res.message)
            }
            else{
                setPaid(false)
                setMessage(res.message)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1 className="head col-1">Pay Fee</h1>
                    <div className="mt-5">
                        <div className="row">
                            <div className="col-6">
                                <label for="student" className="form-label">Select Student</label>
                                <select className="form-select" aria-label="Default select example" onChange={(e)=>{setSelectedStudent(e.target.value)}}>
                                    <option selected>Select Student</option>
                                    {students.map((student)=>{
                                        return(
                                            <option value={student._id}>{student.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-6">
                                <label for="fee" className="form-label">Fee</label>
                                <input type="number" className="form-control" id="fee" onChange={(e)=>{setFee(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-6">
                                <button className="btn btn-primary" onClick={()=>{payFee()}}>Pay Fee</button>
                            </div>
                            <div className="col-6">
                                {paid?<h3 className="text-success">{message}</h3>:<h3 className="text-danger">{message}</h3>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default PayFee;


