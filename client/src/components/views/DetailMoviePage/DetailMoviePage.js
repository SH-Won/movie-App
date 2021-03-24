
import React,{useEffect,useState} from 'react'
import {MOVIE_URL,IMAGE_BASE_URL,API_KEY} from '../../Config';
import MainImage from '../LandingPage/Section/MainImage'
import MovieInfo from './Section/MovieInfo';
import {Button,Row} from 'antd';
import GridCardMovie from '../LandingPage/Common/GridCardMovie';
import Favorite from './Section/Favorite';
import Comment from './Section/Comment'
import {useSelector} from 'react-redux';
import axios from 'axios';
import LikeDislike from './Section/LikeDislike';


function DetailMoviePage(props) {
    const movieId = props.match.params.movieId
    const user = useSelector(state=>state.user)
    

    const [Movie,setMovie] =useState([])
    const [Casts ,setCasts] =useState([]);
    const [Open, setOpen] =useState(false);

    const [commentList,setCommentList] =useState([]);

    useEffect(()=>{
        const endpointInfo=`${MOVIE_URL}movie/${movieId}?api_key=${API_KEY}`;
        fetch(endpointInfo)
        .then(response=>response.json())
        .then(res =>{
            setMovie(res);

        })

        const endpointCast=`${MOVIE_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        fetch(endpointCast)
        .then(response => response.json())
        .then(res=>{
            console.log(res);
            setCasts(res.cast);
        })
        
        let variable={movieId:movieId}
        axios.post('/api/comment/getComment',variable)
        .then(response=>{
            if(response.data.success){
                 setCommentList(response.data.comments)
            }
            else{

            }
        })


    },[])

    const reFresh = (newComment) =>{
        setCommentList(commentList.concat(newComment))
    }

    const openCast =() =>{
        setOpen(!Open);
    }


    return (
        
            <div>
            {Movie !==null && 
              <MainImage image={Movie.backdrop_path && `${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                         title={Movie.original_title} text={Movie.overview}/>
            } 
             
             <br/>
             <div style={{width:"85%",margin:"1rem auto"}}>
             <Favorite movieId={movieId} movieTitle={Movie.original_title} movieRunTime={Movie.runtime}
                       movieInfo={Movie.backdrop_path}/>
             <MovieInfo movie={Movie}/>
             
         
             <br/>

             <LikeDislike detailMovie userId={localStorage.getItem('userId')} movieId={movieId}/>
            <div style={{display:"flex",justifyContent:"center",margin:"2rem"}}>
                <Button onClick={openCast}> Load Cast</Button>
            </div>

            {Open && 
             <Row gutter={[16,16]}>
             {Casts !==null && Casts.map((cast,index)=>(
                <React.Fragment key={index} >
                <GridCardMovie image={cast.profile_path? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null} 
                               name={`${cast.original_title}`}
                               />
                </React.Fragment>
             ))}
             </Row>
             }
             
             <Comment movieId={movieId} reFresh={reFresh} commentList={commentList}/>
                

            </div>

            
        </div>
    )
}

export default DetailMoviePage
