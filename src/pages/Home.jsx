import React, { useEffect, useState } from 'react';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../firebase-config';
import { async } from '@firebase/util';
const Home = ({isAuth}) => {

  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const postsCollectionRef = collection(db, 'posts');

  const getPosts = async() => {
    setLoading(true);
    const data = await getDocs(postsCollectionRef);
    setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    setLoading(false);
  }

  useEffect(() => {
    getPosts();
    console.log(isAuth);
  }, [])

  const deletePost = async(id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc);
    getPosts();
  }

  if(loading){
    return <h3>Loading...</h3>
  }

  return (
    <div className='container mt-5'>
       {postList.length === 0 ? <h3>No Post Added</h3> : postList.map((post) => {
        return (
          <div className='card mb-4 shadow shadow-sm'>
            <div className='card-body'>
            
               {isAuth && post.author.id === auth.currentUser.uid && 
               <div className='d-flex justify-content-end'>
               <button className='btn btn-danger mb-3' onClick={() => {deletePost(post.id)}}>Delete Post</button>
              </div>}
               <h5 className='card-title mb-3 fw-bold'>{post.title}</h5>
               <p className='card-text mb-3'>{post.postText}</p>
               <span className='badge bg-dark'>@{post.author.name}</span>
            </div>  
       </div>
        )
       })}
    </div>
  )
}

export default Home