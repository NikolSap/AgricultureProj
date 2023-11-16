import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {database} from '../firebase'
import { onValue, ref } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const query = ref(database);
    setUsers([]);
    const unsubscribe = onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setUsers(Object.values(data));
      }
    });
  
    // Unsubscribe from the database listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  console.log("users:" ,users);

  useEffect(() => {
    const userId = Cookies.get('userId');
    const userType = Cookies.get('userType');
  
    // Check if userId and userType cookies exist
    if (userId && userType) {
      const foundUser = users.find((u) => u.id === userId);
      console.log("found", foundUser);
  
      // Redirect based on userType
      if (userType === 'Agricultural' && foundUser) {
        navigate('/AgriculturalPage', { state: { user: foundUser } });
      } else if (userType === 'Volunteer' && foundUser) {
        navigate('/VolunteerPage', { state: { user: foundUser } });
      }
    }
  }, [users]); 

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
    

      const found = users.find((user) => user.email === email);
      console.log("found",found);

      if (rememberMe) {
        Cookies.set('userId', found.id);
        Cookies.set('userType', found.userType);
      }
        if(found === undefined)
        {
          setError(true);
          console.log("error");
        }
        else{
            setError(false);
            setSubmitted(true);
            console.log("type", found.userType)
            if(found.userType === "Agricultural")
            {
              console.log("enter ", found.userType)
                navigate("/AgriculturalPage", { state: { user: found } });
            }else{
                navigate("/VolunteerPage",{ state: { user: found } });

            }
            
            console.log("success");

        }
    } catch (err) {
      setError(true);
      console.error('Error signing in:', error.message);
    }
  };


  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);

};

const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);

};

const successMessage = () => {
    return (
        <div
            className="messages text-center"
            style={{
                display: submitted ? '' : 'none',
            }}>
            <h1> Successfully Logged In!!</h1>
        </div>
    );
};

const errorMessage = () => {
    return (
        <div 
            className="text-center"
            style={{
                display: error ? '' : 'none'}}>
            <h1>Some errors occured</h1>
        </div>
    );
};


  return (
    <>

<div className="contact">
        <div className="container">
           <div className="row">
              <div className="col-md-12 ">
              <div className="text_align_center">
                     <span className='loginTitle'>Login Page</span>
                </div>

       <div className="col-md-8 offset-md-2">
        <form id="request" className="main_form" onSubmit={handleSubmit}>
          <div className="row">
             <div className="col-md-12 ">
                <input onChange={handleEmail} placeholder="Your Email" className="form_control"
                    value={email} type="email" />
              </div>
              <div className="col-md-12 ">
                <input onChange={handlePassword} placeholder="Your Password" className="form_control"
                    value={password} type="password" />
              </div>

              <div className="col-md-12">
                    <div >
                        {errorMessage()}
                        {successMessage()}
                    </div>
                    <div className="group_btn">
                        <button onClick={handleSubmit} className="send_btnLogin"
                        type="submit">
                        Login
                        </button>  
                    </div>
                      
                <div className="col-md-12">
                <div className="group">
                    <label className="rememberBtn">
                     Remember Me
                      <input type="checkbox" className="rememberCheck" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                      </label>
                    </div>
                </div>
                    <hr />
                    <div className="p-4 col-md-12 text-center textLogin">
                      Don't have an account?  <Link to="/Register">Sign up</Link>
                    </div>
                </div>
              </div>
        </form>
        </div>       
        </div>
        </div>
        </div>
      
      </div>
    </>
  );
};

 export default Login;