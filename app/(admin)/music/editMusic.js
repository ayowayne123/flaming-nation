import React, { useState, useEffect } from "react";
import Upload from "./uploadMusic";

function EditAudio({ audioData, onClose, editMode, onUpload }) {
  const [editAudioData, setEditAudioData] = useState(null);

  useEffect(() => {
    setEditAudioData(audioData);
  }, [audioData]);

  return (
    <Upload onClose={onClose} editAudioData={editAudioData} editMode={editMode} onUpload={onUpload}/>
  );
}

export default EditAudio;
