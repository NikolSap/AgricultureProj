// Footer.jsx
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    // <Navbar bg="dark" expand="lg" className="fixed-top header-area">
    // <Navbar.Brand href="/"></Navbar.Brand>
    // <Navbar.Toggle aria-controls="navbarNavDropdown" />
    // <Navbar.Collapse id="navbarNavDropdown">
    //   <Nav className="mr-auto">
    //     <Nav.Link href="/" className="text-white header">Home</Nav.Link>
    //     <Nav.Link href="/About" className="text-white header">About</Nav.Link>
    //     <Nav.Link href="/Register" className="text-white header">Register</Nav.Link>
    //     <Nav.Link href="/Login" className="text-white header">Login</Nav.Link>
    //   </Nav>
    // </Navbar.Collapse>
    // </Navbar>

    // <div className="header-area ">
    <Navbar bg="dark" expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" className="text-white header">Home</Nav.Link>
          <Nav.Link href="/About" className="text-white header">About</Nav.Link>
          <Nav.Link href="/Register" className="text-white header">Register</Nav.Link>
          <Nav.Link href="/Login" className="text-white header">Login</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  // </div>
  );
}

export default Header;
