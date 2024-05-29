import { useState } from "react";
import StarRatings from "react-star-ratings";

function Rate(){
    const [rating, setRating] = useState(0)

    function changeRating( newRating, name) {
        setRating(newRating)
    }
    
    return(
        
        <StarRatings
        rating={rating}
        starRatedColor="blue"
        changeRating={changeRating}
        numberOfStars={6}
        name="rating"
        />
        
    );
    
}
export default Rate;