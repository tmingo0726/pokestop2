import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Details = (props) => {

    const chosenCard = props.chosenCard;

    console.log("Inside Product Details card picked is", chosenCard);

    return(
        <h1>TBD to display clicked on card</h1>
    )

}

export default Details;