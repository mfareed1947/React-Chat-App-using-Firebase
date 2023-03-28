import React from 'react'
import image from '../images/addimage.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../Firebase';
import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const storageRef = ref(storage, displayName);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });


            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate('/')
          } catch (err) {
            console.log(err);
            setErr(true);

          }
        });
      });


    } catch (err) {
      setErr(true);
    }

  }


  return (
    <div className='container'>
      <div className="formWrapper">
        <span className='logo'>Chat Application</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='enter a name' />
          <input type="email" placeholder='email' required />
          <input type="password" placeholder='password' required />
          <input type="file" style={{ display: 'none' }} id='file' />
          <label htmlFor="file" id='file'>
            <img src={image} alt="" />
            <span>Add an Avatar </span>
          </label>
          <button>Sign Up</button>
          {err && <span>somthing wrong</span>}
          <p>You do have an account? <Link to='/Login'>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register
