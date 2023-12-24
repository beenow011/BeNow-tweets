import {createSlice ,nanoid} from '@reduxjs/toolkit';
import dp from "../assets/dp.jpg";
import service from '../appwite/config';



const initialState = {
    allTweets: []
}

export const tweetSlice = createSlice({
    name:"tweets",
    initialState,
    reducers:{
        setTweets: (state, action) => {
            state.allTweets = action.payload; 
        },
        addTweet:(state,action)=>{
            const tweet = {
                id:nanoid(),
                userId: "@abhinav_nb",
                tweet: action.payload,
                likeCountPrev: 0,
                img:dp
            }
            state.allTweets.unshift(tweet)
        },
        dltTweet:(state,action)=>{
            state.allTweets = state.allTweets.filter((tweet) => tweet.id !== action.payload )
        }

    }

})

export const fetchTweets = () => async (dispatch) => {
    try {
        const tweets = await service.getPosts();
        dispatch(setTweets(tweets.documents)); // Dispatch setTweets action with fetched tweets
    } catch (error) {
        console.error(error);
    }
};

export const {setTweets,addTweet,dltTweet} = tweetSlice.actions;
export default tweetSlice.reducer;