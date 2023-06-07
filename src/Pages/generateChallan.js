import React, {useState,useEffect,useNavigate} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Challan = ()=>{


    const [students,setStudents] = useState([]);
    const [selectedStudent,setSelectedStudent] = useState("");
    const [fee,setFee] = useState("");
    const [paid,setPaid] = useState(false);
    const [message,setMessage] = useState("");
    const [user,setUser] = useState({});
    const [token,setToken] = useState("");




    function generateChallan(id){
        const token = JSON.parse(localStorage.getItem('token'))

        console.log("id"+id)
        let flag = false
        let stud = students.forEach((student)=>{
            if(student.rollNumber==id){
                flag = true
                return student
            }
        }
        )
        if(!flag){
            alert("Student not found")
        }
        else{
            fetch('https://taalib-accountofficer-api.onrender.com/accountOffice/generatechallan',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    token:token
                },
                body:JSON.stringify({
                    studentID:id,
                })
            })
            .then(res=>res.json())
            .then(res=>{
                if (res.Message === "Fee Challan Generated"){
                    //setPaid(true)
                    alert(`Challan Generated. You can view it by following the link: https://taalib-accountofficer-api.onrender.com/${res.data.pathToFile}`)
                    //setMessage(res.Message)
                }
                else{
                    alert(res.Message)
                    //setMessage(res.Message)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }


    function generateChallanforAll(){
        const token = JSON.parse(localStorage.getItem('token'))
        
        students.forEach((student)=>{
            fetch('https://taalib-accountofficer-api.onrender.com/accountOffice/generatechallan',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    token:token
                },
                body:JSON.stringify({
                    studentID:student.rollNumber,
                })
            })
            .then(res=>res.json())
            .then(res=>{
                if (res.Message === "Fee Challan Generated"){
                    //setPaid(true)
                    //alert(`Challan Generated. You can view it by following the link: https://taalib-accountofficer-api.onrender.com/${res.data.pathToFile}`)
                    //setMessage(res.Message)
                }
                else{
                    //alert(res.Message)
                    //
                   // setMessage(res.Message)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        })
        alert("Challans Generated")
    }


    useEffect(() =>{
        if(!localStorage.getItem('user')){
            useNavigate('/login');
        }
        else{
            //setUser(JSON.parse(localStorage.getItem('user')));
            //setToken(localStorage.getItem('token'));
            console.log("token"+localStorage.getItem('token'))
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
            console.log(res)
            setStudents(res)
        })
        .catch(err=>{
            console.log(err)
        })
    },[]);

    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1 className="head col-1">Generate Challan</h1>
                    <div className="mt-5">
                        <div className="row">
                            <div className="col-8">
                                {/* <label for="studentID">Student ID</label> */}
                                {/* <input type="text" className="form-control" id="studentID" placeholder="Student ID" name={selectedStudent} onChange={
                                    (e)=>setSelectedStudent(e.target.value)
                                }/> */}

                                {/*add a table shich contains all the students and their fee challan status along with a button to generate challans*/}
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Roll Number</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Fee Status</th>
                                            <th scope="col">Generate Challan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student)=>{
                                            return(
                                                <tr>
                                                    <td>{student.rollNumber}</td>
                                                    <td>{student.name}</td>
                                                    <td>{String(student.isFeePaid)}</td>
                                                
                                                    <td><button type="button" className="btn btn-primary" onClick ={()=>{generateChallan(student.rollNumber)}} >Generate</button></td>
                                                </tr>
                                            )
                                        }
                                        )}
                                    </tbody>
                                </table>
                                
                            </div>
                            
                           
                            <div className = "col-5 mt-3">
                                {/* <label for="studentID">Generate Challan</label> */}
                                <button type="button" className="btn btn-primary" onClick ={()=>{generateChallanforAll()}} >Generate challan for all</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

                            


}

export default Challan;