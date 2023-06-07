import React,{useState,useEffect,useNavigate} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/style.css';
// require('dotenv').config();





const Disperse = () =>{

    const [data,setData] = useState([])
    const [teachers,setTeachers] = useState([])
    const [popup,setPopup] = useState(false)
    const [user,setUser] = useState({})
    const [token,setToken] = useState('')



    // const URI = process.env.URI+'/'+process.env.ROUTE+'/';

    useEffect(()=>{
        if(!localStorage.getItem('user')){
            const navigate = useNavigate()
            navigate("/login");        }
        else{
            setUser(JSON.parse(localStorage.getItem('user')));
            setToken(localStorage.getItem('token'));
        }

        const token = JSON.parse(localStorage.getItem('token'))


        fetch('https://taalib-accountofficer-api.onrender.com/accountOffice/getallemployees',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                 token:token
        }
        })
        .then(res=>res.json())
        .then(res=>{
            setTeachers(res)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return(
        <>
    {/* {popup()} */}
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div>
                        <h1 className = "head col-1">Disperse Salary</h1>
                        <button className="btn offset-5  btn-primary" onClick ={()=>{disperseToAll(teachers)}}>Disperse Salary Email to All</button>
                        <div className="mt-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Designation</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((teacher)=>{
                                    if (teacher.isSalaryPaid === false  || teacher.isSalaryPaid===undefined){

                                    
                                    return(
                                        <tr>
                                            {/* <th scope="row">{teacher.employeeId}</th> */}
                                            <td>{teacher.employeeId}</td>
                                            <td>{teacher.name}</td>
                                            <td>{teacher.role}</td>
                                            <td><button className="btn btn-primary" onClick = {()=>disperseSalary(teacher.employeeId,teacher.email)}>Send Email</button></td>
                                        </tr>
                                    )
                                }
                            }
                                )}
                            </tbody>
                        </table>
                        </div>

                    </div>
                
                </div>
                </div>
        </div>
        </>
    )
}


const disperseSalary = (id,email) =>{
   // popup()
   const token = JSON.parse(localStorage.getItem('token'))

    fetch('https://taalib-accountofficer-api.onrender.com/accountOffice/dispersesalary',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            token:token
        },
        body:JSON.stringify({
            email:email
        })
    })
    .then((res)=>{
        res.json()
        fetch('https://taalib-accountofficer-api.onrender.com/accountOffice/changeSalaryStatus',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                token:token
            },
            body:JSON.stringify({
                employeeId:id
            })
    })
    })
    .then(res=>{
        console.log(res)
        alert('Email Sent')
    })
    .catch(err=>{
        console.log(err)
    })
}

    const disperseToAll = (teachers)=>{
        teachers.forEach((teacher)=>{
            const id = teacher.employeeId
            const email = teacher.email

            const token = JSON.parse(localStorage.getItem('token'))

    fetch('https://taalib-accountofficer-api.onrender.com/accountOffice/dispersesalary',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            token:token
        },
        body:JSON.stringify({
            email:email
        })
    })
    .then((res)=>{
        res.json()
        fetch('https://taalib-accountofficer-api.onrender.com/accountOffice/changeSalaryStatus',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                token:token
            },
            body:JSON.stringify({
                employeeId:id
            })
    })
    })
    .then(res=>{
        console.log(res)
        
    })
    .catch(err=>{
        console.log(err)
    })
        })

        alert('Emails sent to everyone')
    }

   

export default Disperse;