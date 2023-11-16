import React,{useState,useEffect} from "react";
// import '../assets/About.css'
 import '../App.css'
import Footer from '../components/innerComponents/Footer.jsx';
import agricultureImg from "../assets/images/banner.jpg";
import {database} from '../firebase';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { onValue, ref,update,get} from 'firebase/database';
import Cookies from 'js-cookie';

function Home(){

    return (
    <>
    <div className="full_bg">
    <picture>
                <source srcset={agricultureImg}/>                  
                <img srcset={agricultureImg} alt="responsive image" className="d-block img-fluid"/>
      </picture>
     <div className="slider_main">
       
        <div className="container-fluid">
          <div className="row d_flex">
              <div className="col-md-12">
                <div className="willom ">
                  <h2>AgricultureLink</h2>
                </div>
              </div>
          </div>
          <div className="aboutHeader">
          <div className="container-fluid">
             <div className="row d_flex">
                <div className="titlepage text_align_left">
                  <h2>About Us</h2>
                  <p>AgricultureLink is an innovative platform connecting farmers with dedicated volunteers. Our mission is to foster collaboration in the agricultural community, providing farmers the support they need and offering volunteers meaningful opportunities to contribute to sustainable farming practices. Join us in cultivating a network where hands-on help meets the growing needs of agriculture.
                  </p>                   
                </div>
             </div>
          </div>
     </div>
        </div>
       
     </div>
     </div>
  </>
     
);
}
export default Home;