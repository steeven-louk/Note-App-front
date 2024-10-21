import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const NoteModal = ( {isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (title && description) {
        // if (typeof onSubmit === 'function') {
           await onSubmit( title, description );  // Envoi des données du formulaire
        //   }
      setTitle(''); // Réinitialise le champ après soumission
      setDescription('');
      if (typeof onClose === 'function') {
        onClose();  // Fermer la modal après soumission
      }
    }
  };

  if (!isOpen) return null; // Ne pas rendre la modal si elle est fermée

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add a New Note</h2>
        <form onSubmit={(e)=>handleSubmit(e)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 w-full border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name='description'
              className="mt-1 p-2 w-full border rounded"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
              onClick={()=>onClose()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
