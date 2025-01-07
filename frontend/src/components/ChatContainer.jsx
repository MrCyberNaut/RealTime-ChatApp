import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";


const ChatContainer = () => {

    const {messages,getMessages,isMessagesLoading,selectedUser} = useChatStore();

    useEffect(() => {
        
        getMessages(selectedUser._id);
        // getMessagesfunction expects a user id in the chat store check


        
    }, [selectedUser._id, getMessages])//whenever the seleted user's id changes, we would like to call the useEffect function again


    if(isMessagesLoading) {
      return (
        <div className="flex-1 flex flex-col overflow-auto">
          <MessageSkeleton />
          <MessageInput />
        </div>
      )
    }

    

    
  return (
    <div className="flex-1 flex flex-col bg-base-100 p-5 overflow-auto">
      <ChatHeader />
      <p>messages...</p>
      <MessageInput />
    </div>
  )
};

export default ChatContainer