/* eslint-disable react/prop-types */
import {FaEdit, FaTrash} from "react-icons/fa"
const NoteCard = ({note,deleteNote,onEdit}) => {
    const {title, description} = note

  return (
    <div className=' bg-white shadow-md p-4 rounded shadow-gray-500'>
        <h2 className='text-xl font-bold text-black'>{title}</h2>
        <p className="text-black">{description}</p>
        <div className="flex justify-end mt-2">
            <button className="text-blue-500 mr-2" onClick={()=>onEdit(note)}>
                <FaEdit/>
            </button>
            <button className="text-red-500 mr-2" onClick={()=>deleteNote(note?._id)}>
                <FaTrash/>
            </button>
        </div>
    </div>
  )
}

export default NoteCard