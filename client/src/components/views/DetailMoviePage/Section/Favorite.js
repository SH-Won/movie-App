import React,{useEffect,useState} from 'react'
import {Button} from 'antd';
import axios from 'axios';

function Favorite(props) {
    const [FavoriteNumber,setFavoirteNumber] = useState(0);
    const [Favorited,setFavorited] =useState(false);

    let variable={
        movieId:props.movieId,
        userFrom:localStorage.getItem('userId'),
        movieTitle:props.movieTitle,
        movieRunTime:props.movieRunTime,
        movieImage:props.movieInfo      
    }
    
    useEffect(()=>{
        
       
        axios.post('/api/favorite/favoriteNumber',variable)
        .then(response =>{
            if(response.data.success){
                setFavoirteNumber(response.data.number)

            }
            else{
                alert("Favorite 수를 불러오지 못했습니다.")
            }
            
        })
        axios.post('/api/favorite/favorited',variable)
        .then(response =>{
            if(response.data.success){
                setFavorited(response.data.result)
            }
            else{

            }
        })

    },[])
    const handleFavorite = ()=>{
        // 디비에 정보 저장

        
        //안눌러져있다면
        if(!Favorited){
            axios.post('/api/favorite/addFavorite',variable)
            .then(response=>{
                if(response.data.success){
                    setFavorited(!Favorited)
                    setFavoirteNumber(FavoriteNumber+1)

                }else{

                }
            })
        }
        else{
            axios.post('/api/favorite/subFavorite',variable)
            .then(response=>{
                if(response.data.success){
                    setFavorited(!Favorited)
                    setFavoirteNumber(FavoriteNumber-1);

                }else{

                }
            })
        }

    }
    return (
        <div style={{display:'flex',justifyContent:'flex-end'}}>
            <Button style={{width:'200px' ,justifyContent:'space-between'}} onClick={handleFavorite}>{FavoriteNumber} {Favorited ? 'Favorited':'Favorite'} </Button>
            
        </div>
    )
}

export default Favorite
