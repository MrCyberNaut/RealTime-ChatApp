import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import {toast } from "react-hot-toast";

const MessageInput = () => {
  const[text,setText] = useState(''); //initailly empty
   const[imagePreview,setImagePreview] = useState(null);/// to store the image preview
   const fileInputRef = useRef(null); // to access the file input element 
   const {sendMessage} = useChatStore(); // to send the message

   const handleImageChange = (e)=>{
    const file = e.target.files[0]; //get the file
    if(!file.type.startsWith("image/")){   //if file is not an image
      toast.e
      return;
    }
    const reader = new FileReader(); //read the file 
    reader.onloadend = ()=>{ //once the file is read
      setImagePreview(reader.result); //set the image preview
    };
    reader.readAsDataURL(file); //read the file as data URL
   };

   const removeImage = ()=>{
    setImagePreview(null); //remove the image preview
    if(fileInputRef.current){ //if file input is there
      fileInputRef.current.value = null; //remove the file input value
    }
   };

   const handleSendMessage = async(e) =>{
    e.preventDefault(); //prevent the default action
    if(!text.trim() && !imagePreview){ //if text is empty and no image preview
      return; //return nothing
    }
   try {
    await sendMessage({ //send the message
      text:text.trim(), //trim the text
      image:imagePreview, //image preview
   } );


   //CLEAR THE FORM
    setText(''); //set the text to empty
    setImagePreview(null); //remove the image preview
    if(fileInputRef.current){ //if file input is there
      fileInputRef.current.value = null; //remove the file input value
    }
   }catch(error){
    console.error("failed to send message",error); //if failed to send message
  }
}  ;

  return (
   <div className="p-4 w-full">
        {imagePreview && ( //if image preview is there then show the image preview
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview} //image preview
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}     // remove image function
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
   </div>
  )  }

  <form onSubmit  = {handleSendMessage} className="flex items-center gap-2">
    <div className="flex-1 flex gap-2">
      <input 
      type=" text"
      className="w-full input input-bordered rounded-lg input-sm sm:input-md"
      placeholder="Type a message"
      value={text}
      onChange={(e)=>setText(e.target.value)} //once we type it will update the state of text 
       />

      {/* handling image input next */}
      <input
            type="file"
            accept="image/*"
            className="hidden" //hidden becasue we want an input without the ugly UI lol , so the actual design is given by button whoch functions as a input 
            ref={fileInputRef}
            onChange={handleImageChange}
          />  

      <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} //color changes based on image selected or NOT 
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
      </button>

    </div>
    
    <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>

  </form>

</div>
  );
};


export default MessageInput;