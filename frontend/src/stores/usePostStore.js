import {create} from 'zustand'
import axios from '../lib/axios';
import toast from 'react-hot-toast';

export const usePostStore = create((set,get)=>({
    postsData: {
        posts: [],
        total: 0,
        currentPage: 1,
        totalPages: 1,
    },
    myPostsData: {
        posts: [],
        total: 0,
        currentPage: 1,
        totalPages: 1,
      },
    recommendedPost: [],
    loading: false,
    currPost : null,
    


    addPost: async (newPost)=>{
        set({loading: true});
        try {
            const res = await axios.post('/posts/create-post', newPost)
            set((prev)=>({
                posts: [...(prev.posts || []), res.data],
                loading: false,
            }))
            toast.success("post created successfully")
        } catch (error) {
            set({loading: false})
            toast.error("failed to create post")
            console.log("error in product store create route",error)
        }
    },
    fetchMyPost : async (page, limit = 8) => {
        set({loading: true});
        try {
            const res = await axios.get(`/posts/myposts?page=${page}&limit=${limit}`)
            set({
                myPostsData: {
                  posts: res.data.posts,
                  total: res.data.total,
                  currentPage: res.data.currentPage,
                  totalPages: res.data.totalPages,
                },
                loading: false,
              });
        } catch (error) {
            set({loading: false})
            console.log("Error Fetching Posts", error.message)
            toast.error("Unable to Fetch Posts. Sorry For Inconvinience")
        }
    },
    fetchAllPosts: async (page, limit = 8) => {
      set({loading: true});
      try {
          const res = await axios.get(`/posts/allposts?page=${page}&limit=${limit}`)
          set({
              postsData:{
                  posts: res.data.posts,
                  total: res.data.total,
                  currentPage: res.data.currentPage,
                  totalPages: res.data.totalPages
              },
              loading: false
          })
      } catch (error) {
          set({loading: false})
          console.log("Error Fetching Posts", error.message)
          toast.error("Unable to Fetch Posts. Sorry For Inconvinience")
      }
  },
    
    deletePost: async (postId) => {
        set({ loading: true });
        try {
          await axios.delete(`/posts/delete-post/${postId}`); // ✅ Include postId in the URL
          await get().fetchAllPosts();
        } catch (error) {
          console.log("Error in deletePost:", error.message);
          toast.error("Error deleting post");
        } finally {
          set({ loading: false });
        }
      },
      fetchRecommended: async () => {
        set({loading: true})
        try {
            const res = await axios.get("/posts/getrecommended")
            set({recommendedPost:res.data,loading:false})
        } catch (error) {
            set({loading:false});
            toast.error("Error Fetching Recommended post")
            console.log("Error in recommended Post",error.message)
        }
      },
      fetchCurrPost: async (id) => {
        set({loading: true})
        try {
            const res = await axios.get(`/posts/getpost/${id}`)
            set({currPost: res.data, loading: false})
        } catch (error) {
            set({loading: false})
            console.log("Error fetching curr post",error.message)
        }
      },
      toggleLike: async () => {
        const { currPost } = get();
        const postId = currPost._id;
      
        try {
          const res = await axios.put(`/posts/togglelike/${postId}`);
          const updatedLikes = res.data.likes;
      
          // Update the local store state (assuming you're using Zustand)
          set((state) => ({
            currPost: {
              ...state.currPost,
              likes: updatedLikes,
            },
          }));
        } catch (error) {
          console.error("Failed to toggle like:", error.message);
          toast.error("Could not toggle like");
        }
      },
   
   
      
    fetchSearchedPosts: async (query, page = 1, limit = 8) => {
      set({ loading: true });
      try {
        const res = await axios.get(`/posts/search-posts`, {
          params: { 
            query: query.trim(), 
            page, 
            limit 
          },
        });
        
        // Ensure we have a proper response structure
        if (res.data && res.data.posts) {
          set({
            postsData: {
              posts: res.data.posts,
              total: res.data.total,
              currentPage: res.data.currentPage,
              totalPages: res.data.totalPages

            },
            loading: false,
          });
        } else {
          // Handle unexpected response format
          console.error("Unexpected response format:", res.data);
          set({ 
            postsData: { posts: [], currentPage: 1, totalPages: 1 },
            loading: false 
          });
        }
      } catch (err) {
        console.error("Error fetching searched posts:", err.message);
        set({ 
          postsData: { posts: [], currentPage: 1, totalPages: 1 },
          loading: false 
        });
      }
    },
}))