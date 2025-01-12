import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {

    const {getUsers,users,selectedUser,setSelectedUser,isUsersLoading} = useChatStore();

    const {onlineUsers} = useAuthStore();

    useEffect(()=>{
        getUsers();

    },[getUsers])

    if(isUsersLoading)return <SidebarSkeleton/>

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">  
    <div className="border-b border-base-300 w-full p-5">
        {/* logo + text next line */}
        <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO : ONLINE FILTER TOGGLE */}
     </div>

     <div className="overflow-y-auto w-full py-3 ">
     {filteredUsers.map((user) => (
          <button //returns abutton component for each user
            key={user._id} //will get the key for react 
            onClick={() => setSelectedUser(user)} //onclick will update the selected user state with that user 
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""} 
              
            `}//if selected user, bg color will change
          >
            <div className="relative mx-auto lg:mx-0"> 
            {/* div to display the image */}
              <img
                src={user.profilePic || "/avatar.png"} //placeholder
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                {/* availableonly for larger screens */}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
     </div>
    </aside>
  )
};

export default Sidebar