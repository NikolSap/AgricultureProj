import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { database } from '../firebase';
import { onValue, ref,update} from 'firebase/database';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import Button from '@mui/material/Button';
import MapWithMarker1 from './MapWithMarker1';
import MapWithMarker from './MapWithMarker';
import { DataGrid } from '@mui/x-data-grid';
import { BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// import  "../assets/tableStyle.css"

function VolunteerPage() {
    const location = useLocation();
    const [users, setUsers] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const user = location.state.user;
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();

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


    useEffect(() => {
      const userRef = ref(database, `${user.id}/places`);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          const selectedIds = userData.map((agr) => agr.id);
          setSelectedRows(selectedIds);
        }
      });
    }, [user.id]);
    


    const agriculturalData = users.filter((user) => user.userType === 'Agricultural');

    const handleButtonClick = (agricultural) => {
        console.log('Start Chat', agricultural);
                const chatRoomUrl = `/ChatRoom?user1Id=${user.id}&user2Id=${agricultural.id}`;
        navigate(chatRoomUrl);

            
    };

    useEffect(() => {
        if (agriculturalData.length > 0) {
            setIsLoad(true);
        }
    }, []);




    useEffect(() => {
      console.log("selected:", selectedRows);
    }, [selectedRows]);
    

    const handleRowSelect = (rowId) => {
      console.log(rowId);
     
      if (selectedRows.includes(rowId)) {
        setSelectedRows((selectedRows) => {
          console.log('Before filtering:', selectedRows);
          const updatedRows = selectedRows.filter((id) => id !== rowId);
          console.log('After filtering:', updatedRows);
          return updatedRows;
        }, () => {
          console.log("selected:", selectedRows);
        });
      } else {
        setSelectedRows([...selectedRows, rowId]);
      }
    };

    const handleGetSelectedRows = async () => {
      const selectedData = users.filter((row) => selectedRows.includes(row.id));
      console.log("selected data", selectedData);
      const updates = {};
    
      const volunteerPathInUser = `${user.id}/places`;
      let existingPlaces = user.places || [];
      console.log("existing", existingPlaces);

      let updatedPlaces = [];
      selectedData.forEach((place) => {
        // const placeExists = existingPlaces.some(existingPlace => existingPlace.id === place.id);
        // console.log("placeExist",placeExists)
          updatedPlaces =[...updatedPlaces, place];
          console.log("update", updatedPlaces);
      });
      updates[volunteerPathInUser] = updatedPlaces;


      const excludedUserIds = selectedData.map((row) => row.id);
      const usersToUpdate = users.filter((user) => !excludedUserIds.includes(user.id) && user.userType === 'Agricultural');

      console.log("UserToUpdate",usersToUpdate)
      console.log("selected Data", selectedData)
      selectedData.forEach((agricultural) => {
        const volunteerPath = `${agricultural.id}/volunteers`;
        const existingVolunteers = agricultural.volunteers || [];
        const userExists = existingVolunteers.some(existingVolunteer => existingVolunteer.id === user.id);
        if (!userExists) {
          const updatedVolunteers = [...existingVolunteers, user];
          console.log("update volunteers",agricultural.id, updatedVolunteers)
          updates[volunteerPath] = updatedVolunteers;
        }
      });

      if(usersToUpdate.length > 0){
        usersToUpdate.forEach((agricultural)=>{
          const volunteerPath = `${agricultural.id}/volunteers`;
          const existingVolunteers = agricultural.volunteers || [];
          const updatedVolunteers = existingVolunteers.filter(existingVolunteer => existingVolunteer.id !== user.id);
          updates[volunteerPath] = updatedVolunteers;
  
        })
      }
    
         
      // Update the database with the collected updates
      await update(ref(database), updates);
    
      // Alert after the update is complete
      alert('Places where you want to volunteer saved successfully!');
    };


    // const handleGetSelectedRows = () => {
    //   const selectedData = users.filter((row) => selectedRows.includes(row.id));
    //   console.log(selectedData);
    //   selectedData.forEach((agr)=>{
    //     agr.volunteers.push(user);
    //   })

    // };
  

    // useEffect(() => {
    //   const userRef = ref(database, `${user.id}/places`);
    //   console.log(userRef);
    //   onValue(userRef, (snapshot) => {
    //     const userData = snapshot.val();
    //     if (userData) {
    //         userData.forEach((agr)=>{
    //           handleRowSelect(agr.id)
    //         })
    //     }
    //   });
    // }, []);
    const logoutClicked= async()=>{
      Cookies.remove('userId');
      Cookies.remove('userType');
      navigate('/Login');
    }
   
    return (
    
      
      <div className="contact">
      <div className="container">
         <div className="row">
            <div className="col-sm-12 ">
            <div className=" col-md-12 d-flex justify-content-end">
                  <div className=" group_btn">
                      <button onClick={logoutClicked} className="logout_btn"
                      type="submit">
                      Logout
                      </button>
                  </div>
              </div>
                <div className="left">
                  <span className='welcomeTitle'>Welcome {user.name}</span>
                </div>
                <div className="text_align_left">
                <h2 className='placeTitle'>Please select where you want to volunteer:</h2>
              </div>
      <div>
      
        {agriculturalData.map((agricultural, index) => (
            <div class="text_align_center col-md-12"

            key={agricultural.id}
            className={`data-box ${selectedRows.includes(agricultural.id)  ? 'selected' : ''}`}
            onClick={() => handleRowSelect(agricultural.id)}
            >
            <div className='box'>
             
              <div >
            
               <div className="col-md-12 data-row form_control h2Title">
                <span className="data-value">{agricultural.name}</span>
                </div>
                <div className="col-md-12 data-row form_control">
                  <h2 className="data-value">Email me: <a href={`mailto:${agricultural.email}`}>{agricultural.email}</a></h2>
                  

                </div>
                <div className="col-md-12 data-row form_control">
                  <h2 className="data-value">Whatsapp me: <a href={`https://wa.me/${agricultural.phone}`} target="_blank" rel="noopener noreferrer">
              {agricultural.phone}
            </a></h2>
                
                </div>
                <div className="col-md-3 data-row form_control ">
                <div className="chatbtn group_btn">
                <Button variant="contained" color="primary" onClick={() => handleButtonClick(agricultural)}>
                    Open Chat
                </Button>
               </div>
               
                </div>
                <div className="map-responsive">
                   <MapWithMarker lat={agricultural.locationLat} lng={agricultural.locationLng}  />
                </div>
                

                </div>
                </div>
               
          </div>
        ))}
      </div>
      <div className="col-md-12">
          <div className="group_btn">
              <button onClick={handleGetSelectedRows} className="save_btn"
              type="submit">
              Save
              </button>
          </div>
      </div>
      
    </div>
    </div>
    </div>
    </div>

    );
}

export default VolunteerPage;
