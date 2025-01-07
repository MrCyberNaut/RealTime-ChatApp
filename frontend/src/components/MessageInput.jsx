import { useRef, useState } from "react";


const MessageInput = () => {
  const[text,setText] = useState(''); //initailly empty
   const[imagePreview,setImagePreview] = useState(null);/// to store the image preview
   const fileInputRef = useRef(null); // to access the file input element 


  return (
    <div>MessageInput</div>
  )
}

export default MessageInput