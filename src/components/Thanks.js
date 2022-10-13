import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
//import '../stylesheets/Register.css'
// import Pikachu.webp from "../"
const Thanks = () => {
  return (
    <div>
      <h1>
        Thank you for your order. Our carrier Pikachu is on it's way with your
        order!
      </h1>
      <img src="%PUBLIC_URL%/Pikachu.webp" />
    </div>
  );
};

export default Thanks;
