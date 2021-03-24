import React,{useEffect,useState} from 'react'
import {Input,Button} from 'antd';
import axios from 'axios';
import SingleComment from './SingleComment';
import {useSelector} from 'react-redux';
import ReplyComment from './ReplyComment';

const {TextArea} =Input;


function Comment(props) {
    const [commentValue,setCommentValue]=useState('');
    const user = useSelector(state=>state.user)

    

    const handleChangeValue = (e)=>{
        setCommentValue(e.target.value)
    }
    const onSubmit =(e)=>{
        e.preventDefault();
        let variable={
            writer:user.userData._id,
            content:commentValue,
            movieId:props.movieId
        }
        axios.post('/api/comment/saveComment',variable)
        .then(response=>{
            if(response.data.success){
                setCommentValue('');
                props.reFresh(response.data.comments)

            }
            else{

            }
        })

    }


    return (
        <div>
            {props.commentList && props.commentList.map((comment,index)=>(
                
                    (!comment.responseTo &&
                        <React.Fragment key={index}>
                    <SingleComment  comment={comment} reFresh={props.reFresh}  movieId={props.movieId}/>
                    <ReplyComment commentList={props.commentList} parentCommentId={comment._id} movieId={props.movieId} reFresh={props.reFresh}/>
                    </React.Fragment>
                    )

            
           
            ))}
            <br/>
            <hr/>
        <form onSubmit={onSubmit} style={{display:'flex'}}>
            <TextArea value={commentValue} onChange={handleChangeValue}/>

            <br/>
            <Button onClick={onSubmit}> Submit </Button>

        </form>
        </div>
            
        
    )
}

export default Comment
