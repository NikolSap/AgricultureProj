import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {get, ref,push,child,update,onValue} from "firebase/database";
import {database} from '../firebase.js';
import { useSearchParams } from 'react-router-dom';


const ChatRoom = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = window.location.href;
  const searchParams = new URL(location).searchParams;
  const user1Id = searchParams.get('user1Id');
  const user2Id = searchParams.get('user2Id');
  const [user1Name, setUser1Name] = useState('');
  const [user2Name, setUser2Name] = useState('');

  const chatRoomId = [user1Id, user2Id].sort().join('-');


    useEffect(() => {
        const fetchUserNames = async () => {
          try {
            const user1Snapshot = await get(ref(database, `/${user1Id}`));
            const user2Snapshot = await get(ref(database, `/${user2Id}`));
    
            if (user1Snapshot.exists()) {
              setUser1Name(user1Snapshot.val().name);
              console.log("user1",user1Name)
            }
    
            if (user2Snapshot.exists()) {
              setUser2Name(user2Snapshot.val().name);
            }
          } catch (error) {
            console.error('Error fetching user names:', error);
          }
        };
        fetchUserNames();
      }, [user1Id, user2Id]);


  useEffect(() => {
    const chatRef = ref(database, `chats/${chatRoomId}`);
    return onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
         const messagesArray = Object.values(data);
         setMessages(messagesArray);
      }
    });
  }, [chatRoomId]);

 
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const dayIndex = now.getDay();
    return days[dayIndex];
  };

  const getCurrentDateDay = () =>{
    const currentDate = new Date();
    const year = currentDate.getFullYear(); 
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate(); 
    return `${year}-${month}-${day}`;
  };

  const [prevDay, setPrevDay] = useState(null);


const sendMessage = () => {
    if (message.trim() !== '') {
      const currentTime = getCurrentTime();
      const currentDay = getCurrentDay();
      const currentDate = getCurrentDateDay();
      
      const newMessage = {
        user1: user1Id,
        user2: user2Id,
        text: message,
        time: currentTime,
        day: currentDay,
        date: currentDate,
        timestamp: new Date().toISOString(),
      };
      const chatRef = ref(database, `chats/${chatRoomId}`);
      push(chatRef, newMessage);
      setMessage('');
      setPrevDay(currentDay);

    }
  };


  return (
    <div className="contact">
    <div className="container">
       <div className="row">  
       <div className="col-md-12 ">
       <div className="col-md-8 offset-md-5">
        <span className='welcomeTitle'>Chat Room</span>
      </div>
      <div className="col-md-8 offset-md-2">
      <div style={{ border: '2px solid #ccc', marginTop: '50px', minHeight: '200px' }}>
        {messages.map((msg,index) => (   
          <div key={msg.timestamp} style={{ fontSize: '17px'}}>
          {(index === 0 || msg.day !== messages[index - 1].day) && (
              <div style={{ fontWeight: 'bold' , fontSize: '20px'}}>{msg.date} {msg.day}</div>
            )}
            {msg.time +"    "}
            {msg.user1 === user1Id ? <strong>{'You'}: </strong> : <strong>{user2Name || 'User2'}: </strong>}
            {msg.text}          
          </div>
        
        ))}
      </div>
      </div>
           
        <div className="col-md-8 offset-md-2">
        <div className="row main_form">
          <div className="col-md-12 ">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="form_control chat-msg"
        />

      <div className="col-md-12">
            <div className="group_btn">
            <button onClick={sendMessage} className="send_btn">Send</button>
            </div>
        </div>
       
      </div>
      </div>
      </div>
    </div>
    </div>
    </div>
    </div>


  );
};

export default ChatRoom;
