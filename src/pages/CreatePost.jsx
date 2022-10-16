import React, {useState, useEffect}from 'react';
import { addDoc, collection } from 'firebase/firestore';
import {auth, db} from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [postText,setPostText] = useState('');
  const postsCollectionRef = collection(db, 'posts');
  let navigate = useNavigate();

  const createPoat = async() => {
    if(title === '' || setPostText === ''){
      alert('Fill the fields')
    } else {
        try {
          await addDoc(postsCollectionRef, {
            title,
            postText,
            author: {
              name: auth.currentUser.displayName,
              id: auth.currentUser.uid
            }
          })
          navigate('/')
          console.log(auth);
        } catch (error) {
          console.log(error);
        }
    }
  }



  return (
    <div className='container'>
        <div className='bg-light p-5 rounded mt-3'>
          <h1>Create a post</h1>  
          <div className='mb-3'>
             <label htmlFor="title" className='form-label'>Title</label>
             <input type="text" placeholder='Title' className='form-control' onChange={(e) => {setTitle(e.target.value)}}/>
          </div>
          <div className='mb-3'>
             <label htmlFor="title" className='form-label'>Posts</label>
             <textarea placeholder='Post...' className='form-control' onChange={(e) => {setPostText(e.target.value)}}></textarea>
          </div>
          <button className='btn btn-dark' onClick={createPoat}>Submit Post</button>
        </div> 
    </div>
  )
}

export default CreatePost