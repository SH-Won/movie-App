import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Popover} from 'antd';
import './favoritePage.css'
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {

    const userFrom = localStorage.getItem('userId');
    const [userFavorite,setUserFavorite]=useState([])

    useEffect(()=>{
        
        fetchFavorite();
        

    },[])

    const fetchFavorite = () =>{
        let variable={userFrom:userFrom}
        axios.post('/api/favorite/userFavorite',variable)
        .then(response=>{
            if(response.data.success){
               setUserFavorite(response.data.favorite);
            }
            else{

            }
        })

    }

    const deleteFavorite = (movieId, userFrom)=>{
        let variable={
            movieId:movieId,
            userFrom:userFrom
        }
        axios.post('/api/favorite/removeUserFavorite',variable)
        .then(response=>{
            if(response.data.success){
                fetchFavorite()
            }
            else{

            }
        })


    }
    const renderFavorite =

        
        userFavorite && userFavorite.map((favorite,index)=>{
            const content =(
                <div>
                {favorite.movieImage ? 
                <img src={`${IMAGE_BASE_URL}w500${favorite.movieImage}`}/> : 'no Image'
                }
                </div>
            )
           
           
           return <tr key={index}>
                <Popover content={content} title={`${favorite.movieTitle}`}>
            <td>{favorite.movieTitle}</td>

            </Popover>
            <td>{favorite.movieRunTime}</td>
            <td><button onClick={()=>deleteFavorite(favorite.movieId,favorite.userFrom)}>Delete</button></td>
            </tr>
        })


    


    return (
        <div>
        <table>
            <thead>
                <tr>
                <th>MovieTitle</th>
                <th>RunTime</th>
                <td>Delete</td>
                </tr>
            </thead>
            <tbody>
              {renderFavorite}
            </tbody>

        </table>
            </div>
        
    )
}

export default FavoritePage
