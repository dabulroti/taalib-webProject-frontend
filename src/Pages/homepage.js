import React, {useState,useEffect,useNavigate} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

{/* get data about user from local storage and display it beautifully*/}
function Home(){
    const [user, setUser] = useState({});
    const [token, setToken] = useState('')
    useEffect(()=>{
        if(!localStorage.getItem('user')){
            useNavigate('/login');
        }
        else{
            setUser(JSON.parse(localStorage.getItem('user')).user);
            setToken(localStorage.getItem('token'));
        }
    },[])

    return(
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{minHeight: '100vh'}}>
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            {console.log(user)}
                            <h1 className="card-title text-center mb-4">Welcome {user.name}</h1>
                            <h4 className="card-title text-center mb-4">Your email is {user.email}</h4>
                            <h4 className="card-title text-center mb-4">Your employeeId is {user.employeeId}</h4>
                            <h4 className="card-title text-center mb-4">Your role is {user.role}</h4>
                            <h4 className="card-title text-center mb-4">You joined on {user.joiningDate}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
