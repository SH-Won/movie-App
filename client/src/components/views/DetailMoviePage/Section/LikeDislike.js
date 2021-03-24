import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {Tooltip,Icon} from 'antd';

function LikeDislike(props) {
    let variable ={}
    if(props.detailMovie){
        variable={userId:props.userId,movieId:props.movieId}
    }
    else{
        variable={userId:props.userId,commentId:props.commentId}
    }
    const [likeNumber,setLikeNumber]=useState(0);
    const [liked,setLiked]=useState(null);
    const [disLikeNumber,setDislikeNumber]=useState(0);
    const [disliked,setDisLiked]=useState(null);
    
    useEffect(()=>{
        axios.post('/api/like/likeNumber',variable)
        .then(response =>{
            if(response.data.success){
                setLikeNumber(response.data.likes.length)
                response.data.likes.map((like)=>{
                    if(like.userId === props.userId){
                        setLiked('liked')
                    }
                })

            }
            else{
            }
        })
        axios.post('/api/like/dislikeNumber',variable)
        .then(response =>{
            if(response.data.success){
                setDislikeNumber(response.data.disLikes.length)
                response.data.disLikes.map((disLike)=>{
                    if(disLike.userId ===props.userId){
                        setDisLiked('disLiked');
                    }
                })
            }
        })
    },[])
    const onLike = ()=>{
        //만약 라이크가 안눌러져있다면
        if(liked===null){
            axios.post('/api/like/addLike',variable)
            .then(response=>{
                if(response.data.success){
                    setLikeNumber(likeNumber+1)
                    setLiked('liked')
                    if(disliked !==null){
                        setDislikeNumber(disLikeNumber-1)
                        setDisLiked(null)
                    }

                }
                
            })
            
        }
        else{
            axios.post('/api/like/subLike',variable)
            .then(response=>{
                if(response.data.success){
                    setLikeNumber(likeNumber-1)
                    setLiked(null);

                }
            })
        }
    }
    const onDislike = ()=>{
        //만약 디스라이크가 안눌러져있다면
        if(disliked===null){
            axios.post('/api/like/addDisLike',variable)
            .then(response=>{
                if(response.data.success){
                    setDislikeNumber(disLikeNumber+1)
                    setDisLiked('disLiked')
                    if(liked !==null){
                        setLikeNumber(likeNumber-1)
                        setLiked(null)
                    }

                }
                
            })
            
        }
        else{
            axios.post('/api/like/subDisLike',variable)
            .then(response=>{
                if(response.data.success){
                    setDislikeNumber(disLikeNumber-1)
                    setDisLiked(null)
                    
                }
            })
        }
    }

    return (
      <React.Fragment>
          <span key="comment-basic-like">
              <Tooltip title="Like">
                  <Icon type="like"
                        theme={liked ==='liked'? 'filled' : 'outlined' }
                        onClick={onLike}/>
              </Tooltip>
              <span style={{paddingLeft:'8px',cursor:'auto'}}>{likeNumber}</span>
          </span> &nbsp; &nbsp;
          <span key="comment-basic-dislike">
              <Tooltip title="Dislike">
                  <Icon type="dislike"
                        theme={disliked ==='disLiked' ? 'filled':'outlined'}
                        onClick={onDislike}/>
              </Tooltip>
              <span style={{paddingLeft:'8px',cursor:'auto'}}>{disLikeNumber}</span>
          </span>
      </React.Fragment>
    )
}

export default LikeDislike
