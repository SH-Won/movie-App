import React,{useState,useEffect} from 'react'
import {Comment,Avatar,Input} from 'antd'
import axios from 'axios';
import {useSelector} from 'react-redux';
import LikeDislike from './LikeDislike';

const {TextArea} =Input
function SingleComment(props) {
    const [OpenReply,setOpenReply]=useState(false);
    const [commentValue,setCommentValue]=useState('')
    const user = useSelector(state=>state.user)

  
    const handleOpenReply=()=>{
        setOpenReply(!OpenReply)
    }
    const handleChangeValue = (e) =>{
         setCommentValue(e.target.value)
    }
    const onSubmit =(e)=>{
        e.preventDefault()
        let variable={
            writer:user.userData._id,
            content:commentValue,
            responseTo:props.comment._id,
            movieId:props.movieId
        }
        axios.post('/api/comment/saveComment',variable)
        .then(response=>{
            if(response.data.success){
                setCommentValue('')
                setOpenReply(!OpenReply)
                props.reFresh(response.data.comments)
                

            }
            else{

            }
        })

    }

    return (
        <div>
          <Comment
           actions={[<LikeDislike commentId={props.comment._id} userId={user.userData._id}/>]}
           avatar={<Avatar src={props.comment.writer.image}/>}
           author={props.comment.writer.name}
           content={props.comment.content}
          />
          <br/>
          <p onClick={handleOpenReply} style={{color:'black'}}> Reply </p>
          {OpenReply && 
          <form onSubmit={onSubmit}style={{display:'flex'}}>
          <TextArea value={commentValue} onChange={handleChangeValue}/>

          <br/>
          <button onClick={onSubmit}> Submit </button>

         </form>}

            
        </div>
    )
}

export default SingleComment
