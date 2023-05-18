
import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Preferences from './Preferences';
import SignIn from './SignIn';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [updatePref, setUpdatePref] = useState(true);

    const [genres, setGenres] = useState([]);
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const [neutrals, setNeutrals] = useState([])

    console.log(genres);
    if (loggedIn && updatePref) {
        return (
            <div>
                <Header setLoggedIn={setLoggedIn} />
                <Preferences genres={genres} setGenres={setGenres} setUpdatePref={setUpdatePref}/>
            </div>)
    } else if (loggedIn) {
        return (
            <div>
                <Header setLoggedIn={setLoggedIn}/>
                <Main genres={genres} setUpdatePref={setUpdatePref}
                        likes={likes} setLikes={setLikes}
                        dislikes={dislikes} setDislikes={setDislikes}
                        neutrals={neutrals} setNeutrals={setNeutrals}/>
            </div>)
    }
    else {
        return (
            <div>
                <SignIn setLoggedIn={setLoggedIn}/>
            </div>);
    }
}

export default App;
