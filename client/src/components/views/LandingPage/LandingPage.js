
import React, { useEffect , useState } from 'react'
import { MOVIE_URL,IMAGE_BASE_URL,API_KEY} from '../../Config';
import MainImage from './Section/MainImage'
import GridCardMovie from './Common/GridCardMovie'
import {Row} from 'antd';

function LandingPage() {

    const [Movies,setMovies]=useState([]);
    const [MovieMainImage,setMovieMainImage]=useState(null);
    const [CurrentPage,setCurrentPage] =useState(0);
    
    useEffect(() => {

        const endpoint=`${MOVIE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovie(endpoint);
        
            
    }, [])
    
    console.log(Movies);
    console.log(MovieMainImage)
    //https://image.tmdb.org/t/p/w1280/srYya1ZlI97Au4jUYAktDe3avyA.jpg
    //`${IMAGE_BASE_URL}w1280${MovieMainImage.backdrop_path}`
    // const imageurl='https://image.tmdb.org/t/p/w1280/srYya1ZlI97Au4jUYAktDe3avyA.jpg';

    const fetchMovie = (endpoint)=>{
        
         fetch(endpoint)
        .then(response => response.json())
        .then(res=>{
            setMovies([...Movies,...res.results])
            setMovieMainImage(res.results[0])
            setCurrentPage(res.page)
            
            
        }
            )
    }

    const loadMoreMovie =()=>{
        const endpoint=`${MOVIE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`;
         fetchMovie(endpoint)
            
            
        }
            

    
    
    return (
    
        <div style={{maring:"0",width:"100%"}}>
            {MovieMainImage !==null && 
              <MainImage image={`${IMAGE_BASE_URL}w1280${MovieMainImage.backdrop_path}`}
                         title={MovieMainImage.original_title} text={MovieMainImage.overview}/>
            } 
            <div style={{width:"85%",margin:"1rem auto"}}>
                <h2>Movies By Latest</h2>
                <hr/>
                <Row  gutter={[16,16]}>
                {Movies !==null && Movies.map((movie,index)=>(
                    <React.Fragment key={index} >
                        <GridCardMovie image={movie.poster_path? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null} 
                                       name={`${movie.original_title}`}
                                       movieId={movie.id}
                                       landing/>
                    </React.Fragment>
                ))
                   }
                   </Row>


            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
            
                <button onClick={loadMoreMovie}>Load More</button>

            </div>

        </div>
    )
}

export default LandingPage