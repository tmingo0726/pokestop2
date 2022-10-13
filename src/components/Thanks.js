import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../stylesheets/Thanks.css";

const Thanks = () => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 7000);
  //   }, []);

  return (
    <div id="thanks-page">
      <h1 id="thanks-header">
        Thank you for shopping at Pokéstop. Our Carrier Pikachu is on it's way
        with your order!
      </h1>
      <div id="thanks-content">
        <div>
          <img src="Pikachu.webp" />
        </div>
        <p>
          You will be automatically redirected in 7 seconds or{" "}
          <Link to="/">Click Here</Link> to send another Carrier Pikachu your
          way faster!.
        </p>
      </div>
    </div>
  );
};

export default Thanks;
