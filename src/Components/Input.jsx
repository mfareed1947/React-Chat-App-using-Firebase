import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db, storage } from '../Firebase'
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import addimage from '../images/addimage.png'

const Input = () => {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {

    if (img) {

      const storageRef = ref(storage, uuidv4());
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                SenderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            })

          } catch (err) {
            console.log(err);
          }
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          SenderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    };
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };


  return (
    <div className='input-msg'>
      <input type="text" name="" id="" placeholder='Enter a Message' onChange={(e) => setText(e.target.value)} value={text}/>
      <div className="file-btn">
        <input type="file" style={{ display: 'none' }} id='sendfile' onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor="sendfile">
        <img src={addimage} alt="" />
        </label>
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  )
}

export default Input
