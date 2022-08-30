import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux'
import { fetchData, nextImage, setArtID, prevImage, reset } from './features/dataSlice'


const mapStateToProps = (state) => ({
  artID: state.data.artID
})


function App(props) {
  const dispatch = useDispatch();
  const currentState = useSelector(state => state.data);

  useEffect(() => {
    dispatch(fetchData())
  }, [props.artID, dispatch])

  const renderImage = () => {
    return currentState.apiData ?
      <img src={currentState.apiData.primaryImage} /> :
      <h3>No Image Found</h3>

  }

  return (
    <div className="App">
      <div>
        <button onClick={() => { dispatch(fetchData()) }}>Trigger Thunk</button>
        <button onClick={() => { dispatch(reset()) }}>Clear</button>
        <button onClick={() => { dispatch(nextImage()) }}>Next</button>
        <button onClick={() => { dispatch(prevImage()) }}>Back</button>
      </div>
      <h1> {currentState.artID}</h1>
      <input value={currentState.artID} onChange={(e) => { dispatch(setArtID(e.target.value)) }} />
      <div>
        {
          renderImage()
        }
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
