import { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

function Statistics(){

    const {id} = useParams();

    axios.get(`http://localhost:5005/dailylogs/:${id}`)
    .then
    return(
        <div>
            <p>Your dailylogs</p>
        </div>
    )
}
export default Statistics;