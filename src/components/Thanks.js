import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
//import '../stylesheets/Register.css'

const Thanks = () => {
  return (
    <div id="thank-you-page">
      <h1>
        Thank you for your order. Our carrier Pikachu is on it's way with your
        order!
      </h1>
      <img src="Pikachu.webp" />
    </div>
  );
};

export default Thanks;
