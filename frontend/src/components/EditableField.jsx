// // src/components/EditableField.jsx
// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';


// const EditableField = ({ label, value, onSave }) => {
//   const { t } = useTranslation(); 
//   const [isEditing, setIsEditing] = useState(false);
//   const [inputValue, setInputValue] = useState(value);

//   const handleSave = () => {
//     setIsEditing(false);
//     onSave(inputValue);
//   };

//   return (
//     <div className="flex items-center gap-4 w-2/3">
//       {isEditing ? (
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
//         />
//       ) : (
//         <span className="flex-1 text-white bg-primaryBrown rounded-full px-4 py-2">
//           {value}
//         </span>
//       )}
//       <button
//         onClick={isEditing ? handleSave : () => setIsEditing(true)}
//         className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600"
//       >
//         {isEditing ? `${t("save")}` : `${t("modify_button")}`}
//       </button>
//     </div>
//   );
// };

// export default EditableField;

import { useState } from "react";
import { useTranslation } from "react-i18next";

const EditableField = ({ label, value, onSave }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    if (inputValue !== value) {
      onSave(inputValue); // Envoie la mise à jour
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-4 w-2/3">
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
        />
      ) : (
        <span className="flex-1 text-white bg-primaryBrown rounded-full px-4 py-2">{value}</span>
      )}
      
      <button onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600">
        {isEditing ? t("save") : t("modify_button")}
      </button>

      {isEditing && (
        <button onClick={() => { setInputValue(value); setIsEditing(false); }}
                className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600">
          {t("cancel")}
        </button>
      )}
    </div>
  );
};

export default EditableField;

