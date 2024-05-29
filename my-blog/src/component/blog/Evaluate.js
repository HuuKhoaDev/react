


import { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { api } from '../../api';

function Evaluate(props) {
    const [averageRating, setAverageRating] = useState(0);
    const [totalVotes, setTotalVotes] = useState(0);
    const [userRating, setUserRating] = useState(0); 

    const handleRatingChange = (newRating) => {
        const login = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (!login) {
            alert('Vui lòng đăng nhập để đánh giá.');
            return;
        }

        const token = login.data.token;
        const userId = login.data.Auth.id;

        const data = {
            user_id: userId,
            blog_id: props.blogId,
            rate: newRating
        };

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        api.post(`blog/rate/id`, data, config)
            .then(response => {
                console.log('Đánh giá đã được gửi thành công:', response.data);
                fetchAverageRating();
                setUserRating(newRating); 
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi khi gửi đánh giá:', error);
            });
    };

    const fetchAverageRating = () => {
        api.get(`blog/rate/id`)
            .then(response => {
                setAverageRating(response.data.average_rating);
                setTotalVotes(response.data.total_votes);
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi khi lấy trung bình cộng đánh giá:', error);
            });
    };

    useEffect(() => {
        fetchAverageRating();
    }, [props.blogId]);


    return (
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li>
                    <StarRatings
                        rating={userRating} 
                        starRatedColor="blue"
                        changeRating={handleRatingChange}
                        numberOfStars={6}
                        name="rating"
                    />
                </li>
                <li className="color">({totalVotes} votes)</li> 
            </ul>
            <ul className="tag">
                
            </ul>
        </div>
    );
}

export default Evaluate;
