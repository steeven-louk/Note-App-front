import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import axios from 'axios'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleAddNote =async (note) => {
    try {
      const notes = await axios.post('http://localhost:5000/api/note/add',note,{
        headers:{
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      })
      if(notes.status ===201){
        console.log(notes)
      }
    } catch (error) {
      console.log(error)
    }
    // Vous pouvez ajouter la logique pour sauvegarder la note ici
  };
  return (
    <div>
    <Navbar/>
    <button onClick={()=> setIsModalOpen(true)} className="fixed right-4 bg-teal-500 bottom-4 text-white px-5 py-3 text-xl rounded-full">
      +
    </button>
    {isModalOpen && <NoteModal isOpen={isModalOpen} onSubmit={()=>handleAddNote()} onClose={()=>setIsModalOpen(false)} />}
    </div>
  )
}

export default Home