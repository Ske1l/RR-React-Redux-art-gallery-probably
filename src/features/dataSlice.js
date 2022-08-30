import { createSlice } from '@reduxjs/toolkit'

const getApiUrl = artID => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artID}`;

const initialState = {
    artID: 10245,
    apiData: {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        loadData: (state, action) => {
            state.apiData = action.payload;
        },
        nextImage: (state) => {
            state.artID++;
        },
        prevImage: (state) => {
            state.artID--;
        },
        setArtID: (state, action) => {
            state.artID = action.payload;
        },
        reset: () => {
            return initialState;
        }
    }
});

export const { loadData, nextImage, prevImage, setArtID, reset } = dataSlice.actions;
export default dataSlice.reducer;

export const fetchData = () => {
    const fetchDataThunk = async (dispatch, getState) => {
        const data = getState();
        const { artID } = data.data;
        const response = await fetch(getApiUrl(artID));
        const json = await response.json();
        debugger;

        dispatch(loadData(json));
    }
    return fetchDataThunk;
}