import React, { useState, useEffect } from "react";
import Upload from "./uploadMusic";

function EditAudio({ audioData, onClose }) {
  const [editAudioData, setEditAudioData] = useState(null);

  useEffect(() => {
    setEditAudioData(audioData);
  }, [audioData]);

  return (
    <Upload onClose={onClose} editAudioData={editAudioData} />
  );
}

export default EditAudio;
