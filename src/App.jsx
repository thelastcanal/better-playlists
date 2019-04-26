import React, { useState, useEffect } from "react";
import "./App.css";

let defaultStyle = {
    color: "#fff",
    padding: "0 20px",
    display: "inline-block"
};

let fakeServerData = {
    user: {
        name: "Sean",
        playlists: [
            {
                name: "My Favourites",
                image: "https://via.placeholder.com/150",
                songs: [
                    { name: "beat it", duration: 10000 },
                    { name: "cannelloni macaroni", duration: 11000 },
                    { name: "rosa helikopter", duration: 12000 }
                ]
            },
            {
                name: "Another Playlist",
                image: "https://via.placeholder.com/150",
                songs: [
                    { name: "le song", duration: 13000 },
                    { name: "the song", duration: 44000 },
                    { name: "sangen", duration: 12000 }
                ]
            },
            {
                name: "Yet more",
                image: "https://via.placeholder.com/150",
                songs: [
                    { name: "le song", duration: 13000 },
                    { name: "the song", duration: 44000 },
                    { name: "sangen", duration: 12000 }
                ]
            },
            {
                name: "Wow",
                image: "https://via.placeholder.com/150",
                songs: [
                    { name: "le song", duration: 13000 },
                    { name: "the song", duration: 44000 },
                    { name: "sangen", duration: 12000 }
                ]
            }
        ]
    }
};

function Aggregate(props) {
    return (
        <div style={defaultStyle}>
            <h3 style={defaultStyle}>
                {props && props.count} {props && props.text}
            </h3>
        </div>
    );
}

function Filter() {
    return (
        <div style={{ ...defaultStyle, margin: "0 0 50px 0" }}>
            <input type="text" />
        </div>
    );
}

function Playlist({ info }) {
    return (
        <div style={defaultStyle}>
            <img src={info.image} alt="placeholder" />
            <h3>{info.name}</h3>
            <ul>
                {info.songs.map(song => (
                    <li key={song.name}>{song.name}</li>
                ))}
            </ul>
        </div>
    );
}

function App() {
    const [serverData, setServerData] = useState(null);

    useEffect(() => {
        console.log("componentDidMount");
        setTimeout(() => {
            setServerData(fakeServerData);
        }, 2000);
    }, []);

    function getTotalDuration() {
        let allSongs = serverData.user.playlists.reduce(
            (songs, eachPlaylist) => {
                return songs.concat(eachPlaylist.songs);
            },
            []
        );

        let totalDuration = allSongs.reduce((sum, eachSong) => {
            return sum + eachSong.duration;
        }, 0);

        return Math.round(totalDuration / 60 / 60);
    }

    return (
        <div className="App">
            {serverData ? (
                <header className="App-header">
                    <h1 style={{ ...defaultStyle, margin: "0" }}>
                        {serverData.user.name}'s Playlists
                    </h1>
                    <div>
                        <Aggregate
                            count={serverData.user.playlists.length}
                            text="playlists"
                        />
                        <Aggregate count={getTotalDuration()} text="hours" />
                    </div>

                    <Filter />
                    <div>
                        {serverData.user.playlists.map(playlist => (
                            <Playlist info={playlist} key={playlist.name} />
                        ))}
                    </div>
                </header>
            ) : (
                <header className="App-header">
                    <p style={{ ...defaultStyle, margin: "0" }}>loading...</p>
                </header>
            )}
        </div>
    );
}

export default App;
