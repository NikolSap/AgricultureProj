import React from "react";
import '../App.css'
import aboutImg from "../assets/images/about_img.jpg";
import aboutImg1 from "../assets/images/about_img1.jpg";
function About(){
    return (
          <div className="about">
          <div className="container-fluid">
             <div className="row d_flex">
                <div className="col-lg-6 col-md-12">
                   <div className="titlepage text_align_left">
                      <span>About Us</span>
                      <h1>AgricultureLink</h1>
                      <p>Welcome to our Agriculture Project, where we bridge the gap between farmers and volunteers! <br/> Our platform is dedicated to connecting farmers in need of assistance with enthusiastic volunteers ready to lend a hand.<br/> Whether you're a farmer looking for support or a volunteer eager to contribute to the agricultural community, our platform makes it easy to find the right match.<br/> Join us in cultivating a spirit of collaboration and support in the agricultural sector, fostering partnerships that benefit both farmers and volunteers alike.<br/> Let's grow together!</p>
                   </div>
                </div>
                <div className="col-lg-6 col-md-15">
                   <div className="row d_flex">
                    <div className="col-md-6">
                      <div className="about_img">
                         <figure><img src={aboutImg} alt="#" style={{ width: "90%", height: "10%" }}/>
                         </figure>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="about_img">
                         <figure><img src={aboutImg1} alt="#" style={{ width: "90%", height: "30%" }} />
                         </figure>
                      </div>
                    </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    );
}
export default About;