import React,{useState,useEffect} from 'react';
// export const database = getDatabase(app);
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import {database} from '../firebase';
import {ref,push,child,update,onValue} from "firebase/database";
import Map from "./Map"

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState();
    const [location, setLocation] = useState('');
    const [selectedOption,setSelectedOption] = useState('');
    const [showLocation,setShowLocation]= useState(false);
    const [selectedLocation, setSelectedLocation] = useState({
        lat: 0, 
        lng: 0, 
      });    
      const [users, setUsers] = useState([]);

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

 
    useEffect(() => {
        const query = ref(database);
        setUsers([]);
        return onValue(query, (snapshot) => {
          const data = snapshot.val();
          if (snapshot.exists()) {
            setUsers(Object.values(data));
          }
        });
      }, []);

    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };
 
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };
    const handlePhone = (e) => {
        setPhone(e.target.value);
        setSubmitted(false);
    };
 
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleSubmit = async  (e) => {
        e.preventDefault();

        try{
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const newPostKey = push(child(ref(database), 'posts')).key;
            let obj = {
                id: newPostKey,
                name: name,
                email: email,
                password: password,
                phone: phone,
                userType: selectedOption,
                locationLat: selectedLocation.lat,
                locationLng: selectedLocation.lng,
                volunteers: [],
            };
            const updates = {};
            updates['/' + newPostKey] = obj;
            console.log(obj);

            if (obj.userType === 'Agricultural') {
                navigate('/AgriculturalPage', { state: { user: obj } });
            } else {
                navigate('/VolunteerPage', { state: { user: obj } });
            }
            await update(ref(database), updates);

        }
        catch (error) {
            console.error('Error creating user:', error);
            setError(true);
            setErrorMsg('Failed to create user. Please try again.');
        }
       
    };

    const handleSelectedOption = (e) => {
        setShowLocation(false);
        const option = e.target.value;
        console.log(option);
        setSelectedOption(option);
        if (option === "Agricultural") {
            setShowLocation(true);
        }
        console.log(showLocation);
    };
 
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>User {name} successfully registered!!</h1>
            </div>
        );
    };
 
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>{errorMsg}</h1>
            </div>
        );
    };

    const handleLocationSelection = (location) => {
       
        const lat = location.lat();
        const lng = location.lng();
        console.log("lat",lat)
        console.log("lng",lng)
        setSelectedLocation({
            lat: lat,
            lng: lng,
          });
    };

    return (
        <div className="contact">
        <div className="container">
           <div className="row">
              <div className="col-md-12 ">
              <div className="text_align_center">
                     <span className='registerTitle'>Registration</span>
                </div>
            <div className="col-md-8 offset-md-2">
            <form id="request" className="main_form">
            <div className="row">
                <div className="col-md-12 ">
                    <input onChange={handleName}  placeholder="Your Name"  className="form_control"
                        value={name} type="text" />
                </div>
 
                <div className="col-md-12">
                    <input onChange={handleEmail} placeholder="Email" className="form_control"
                        value={email} type="email" />
                </div>
                
 
                <div className="col-md-12">
                    <input onChange={handlePassword} placeholder="Password" className="form_control"
                        value={password} type="password" />
                </div>

                <div className="col-md-12">
                    <input onChange={handlePhone} placeholder="Phone Number" className="form_control"
                        value={phone} type="phone" />
                </div>
                 
                <div className="col-md-12">
                <div className="group">
                <input 
                    className="radioBtn"
                    type="radio" 
                    value="Agricultural"  
                    checked={selectedOption === "Agricultural"}
                    onChange={handleSelectedOption} /> 
                    <h2 className="radioBtn">Agricultural</h2>
                    <input 
                    type="radio" 
                    className="radioBtn"
                    value="Volunteer"   
                    checked={selectedOption === "Volunteer"}
                    onChange={handleSelectedOption}/>
                      <div className="text_align_center">
                        <h2 className="radioBtn">Volunteer</h2>
                     </div>

                    </div>
                </div>

                {selectedOption === 'Agricultural' && (
                    <div className="col-md-12">
                    <div className="map-responsive">
                        <h2>Please select your agriculture address: </h2>
                        <Map getLocation={handleLocationSelection} showLocation={selectedOption === 'Agricultural'} lat={31.7683} lng={35.2137}/>
                    </div>
                    </div>
                )}

                <div className="col-md-12">
                    <div className="group_btn">
                        <button onClick={handleSubmit} className="send_btn"
                        type="submit">
                        Submit
                        </button>
                    </div>
                </div>
                </div>

            </form>

            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    );

}

export default Register;