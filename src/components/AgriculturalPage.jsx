import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {database} from '../firebase.js'
import { onValue, ref } from "firebase/database";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button  from '@mui/material/Button';
import MapWithMarker from './MapWithMarker';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function AgriculturalPage() {
  const [users, setUsers] = useState([]);


    const location = useLocation();
    //location.state.user
    const [user,setUser]= useState(location.state.user);
    const [msg,setMsg] = useState("");
    const [volunteersData, setVolunteersData] = useState([]);
    const navigate = useNavigate();


  useEffect(() => {
    const query = ref(database);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        const users = Object.values(data);
        setUsers(users);
  
        // Check if location.state.user exists
        if (location.state && location.state.user) {
          const foundUser = users.find((u) => u.id === user.id);
          if (foundUser && foundUser.volunteers) {
            setVolunteersData(foundUser.volunteers);
            setMsg(foundUser.volunteers.length > 0 ? 'Your volunteers:' : 'You have no volunteers');
          }
          else{
            setVolunteersData([]);
          }
        }
      }
    });
  }, [user, volunteersData]); //user
  

    useEffect(() => {
      if (volunteersData.length === 0) {
        setMsg("You have not volunteers");
      } else {
        setMsg("Your volunteers:");

      }
    }, [volunteersData]);


    const handleButtonClick = async (clickedVolunteer) => {
      console.log("start Chat");
      const chatRoomUrl = `/ChatRoom?user1Id=${user.id}&user2Id=${clickedVolunteer.id}`;
      navigate(chatRoomUrl);
    };

    const logoutClicked= async()=>{
      Cookies.remove('userId');
      Cookies.remove('userType');
      navigate('/Login');
    }


      return (

        <div className="contact">
        <div className="container">
           <div className="row">
              <div className="col-md-12">
              <div className=" col-md-12 d-flex justify-content-end">
                  <div className=" group_btn">
                      <button onClick={logoutClicked} className="logout_btn"
                      type="submit">
                      Logout
                      </button>
                  </div>
              </div>

              <div className="left">
                  <span className='registerTitle'>Welcome {user.name}</span>
              </div>
              <MapWithMarker lat={user.locationLat} lng={user.locationLng}/>
              <div className="left">
              <div className="text_align_left">
                  <h2 className='volunteersTitle'>{msg}</h2>
              </div>
              </div>
     
    
       {volunteersData.length!=0 && (

      <TableContainer className='table' component={Paper}>
      <Table  sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className='tableRow'>
            <TableCell className='tableRow' align="center">index</TableCell>
            <TableCell className='tableRow' align="center">Name</TableCell>
            <TableCell className='tableRow' align="center">Email</TableCell>
            <TableCell className='tableRow' align="center">phone</TableCell>
            <TableCell className='tableRow' align="center">Chat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          { volunteersData.map((volunteer,index) => (
            <TableRow className='tableRow'
              key={volunteer.key}
            >
              <TableCell className='tableRow' component="th" scope="row" align="center">{index+1}</TableCell>

              <TableCell className='tableRow' align="center">
                {volunteer.name}
              </TableCell>
              <TableCell className='tableRow' align="center">
              <a href={`mailto:${volunteer.email}`}>{volunteer.email}</a>
            </TableCell>              
            <TableCell className='tableRow' align="center">
            <a href={`https://wa.me/${volunteer.phone}`} target="_blank" rel="noopener noreferrer">
              {volunteer.phone}
            </a>
          </TableCell>              
          <TableCell className='tableRow' align="center">
                <Button variant="contained" color="primary" onClick={() => handleButtonClick(volunteer)}>
                  Open chat
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      )} 

      </div>
        </div>
        </div>
        </div>
        
      );
 
}

export default AgriculturalPage;