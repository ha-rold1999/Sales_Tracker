import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCancel } from "@fortawesome/free-solid-svg-icons";

export default function EditBTN({ isEdit, setIsEdit }) {
  return (
    <div className="ml-2">
      {!isEdit && (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => setIsEdit(true)}
          className="bg-yellow-500 p-2 rounded-lg"
        />
      )}
      {isEdit && (
        <FontAwesomeIcon
          icon={faCancel}
          onClick={() => setIsEdit(false)}
          className="bg-gray-400 p-2 rounded-lg"
        />
      )}
    </div>
  );
}
