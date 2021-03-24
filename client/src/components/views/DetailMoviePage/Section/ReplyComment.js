import React,{useState,useEffect} from 'react'
import SingleComment from './SingleComment'
import {useSelector} from 'react-redux';

function ReplyComment(props) {

    const [childCommentNumber,setChildCommentNumber]=useState(0)
    const [openReply,setOpenReply]=useState(false);
    const user = useSelector(state=>state.user)

    useEffect(()=>{
        let childNumber=0;
       props.commentList.map((comment)=>{
           if(comment.responseTo===props.parentCommentId){
                 childNumber++;
           }
        })
        setChildCommentNumber(childNumber)

    },[props.commentList])

    const handleOpenReply = ()=>{
        setOpenReply(!openReply)
    }
    const renderComment = (parentCommentId) => 
        props.commentList.map((comment,index)=>(
           <React.Fragment key={index}>
            {comment.responseTo==parentCommentId &&
                <div style={{width:"80%",marginLeft:'40px'}}>
                <SingleComment comment={comment} reFresh={props.reFresh} movieId={props.movieId}/>
                <ReplyComment commentList={props.commentList} parentCommentId={comment._id} movieId={props.movieId} reFresh={props.reFresh}/>
                </div>
            }
            </React.Fragment>
        

        )  
        )
    
    return (
        <div>
            {childCommentNumber >0 &&
             <p onClick={handleOpenReply}>views {childCommentNumber} reply comment </p>
            }
            {openReply &&
            renderComment(props.parentCommentId)}

            
        </div>
    )
}

export default ReplyComment
