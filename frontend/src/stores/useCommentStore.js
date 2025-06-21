import {create} from 'zustand'
import axios from '../lib/axios';
import toast from 'react-hot-toast';

export const useCommentStore = create((set,get)=>({
    comments: [],
    loading: false,


    addcomments: async (text,id) => {
        set({loading:true});
        try {
            const res = await axios.post(`comments/add-comments/${id}`,{text})
            set((prev)=>({
                comments: [...prev.comments,res.data],
                loading: false,
            }))
            get().getcomments(id);
        } catch (error) {
            set({loading: false})
            toast.error("Failed to send comments")
            console.log("Error in Add comments",error.message)
        }
    },
    getcomments: async (id) => {
        set({ loading: true });
        try {
          const res = await axios.get(`comments/getcomments/${id}`);
          set({
            comments: res?.data || [],
            loading: false,
          });
        } catch (error) {
          set({
            comments: [],
            loading: false,
          });
          toast.error("Failed to get comments");
          console.error("Error in getcomments:", error.message);
        }
      },
      deletecomment: async (id,postid) => {
        set({loading: true})
        try {
          await axios.post(`comments/delete-comments/${id}`)
          get().getcomments(postid)
          set({loading:false})
        } catch (error) {
          set({loading:true})
          console.error("Error in deletecomments:", error.message);
        }
      }
      
}))