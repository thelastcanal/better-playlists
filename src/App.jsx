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
                    { name: "sangen", duration: 94000 }
                ]
            },
            {
                name: "Yet more",
                image: "https://via.placeholder.com/150",
                songs: [
                    { name: "le song", duration: 13000 },
                    { name: "the song", duration: 68000 },
                    { name: "wow new song", duration: 12000 }
                ]
            },
            {
                name: "Wow",
                image: "https://via.placeholder.com/150",
                songs: [
                    { name: "jingle jangle", duration: 13000 },
                    { name: "the song", duration: 44000 },
                    { name: "sangen", duration: 5000 }
                ]
            }
        ]
    }
};

function Aggregate({ count, text }) {
    return (
        <div style={defaultStyle}>
            <h3 style={defaultStyle}>
                {count} {text}
            </h3>
        </div>
    );
}

function Filter({ string, handleChange }) {
    return (
        <div style={{ ...defaultStyle, margin: "0 0 50px 0" }}>
            <input value={string} onChange={handleChange} type="text" />
        </div>
    );
}

function Playlist({ playlist }) {
    return (
        <div style={defaultStyle}>
            <img src={playlist.image} alt="placeholder" />
            <h3>{playlist.name}</h3>
            <ul>
                {playlist.songs.map(song => (
                    <li key={song.name}>{song.name}</li>
                ))}
            </ul>
        </div>
    );
}

function App() {
    const [serverData, setServerData] = useState(null);
    const [filterString, setFilterString] = useState("");

    useEffect(() => {
        console.log("componentDidMount");
        setTimeout(() => {
            setServerData(fakeServerData);
        }, 1000);
    }, []);

    function getTotalDuration(playlists) {
        let allSongs = playlists.reduce((songs, eachPlaylist) => {
            return songs.concat(eachPlaylist.songs);
        }, []);

        let totalDuration = allSongs.reduce((sum, eachSong) => {
            return sum + eachSong.duration;
        }, 0);

        return Math.round(totalDuration / 60 / 60);
    }

    function filterPlaylists(playlists) {
        return playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(filterString.toLowerCase())
        );
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
                            count={
                                filterPlaylists(serverData.user.playlists)
                                    .length
                            }
                            text="playlists"
                        />
                        <Aggregate
                            count={getTotalDuration(
                                filterPlaylists(serverData.user.playlists)
                            )}
                            text="hours"
                        />
                    </div>

                    <Filter
                        string={filterString}
                        handleChange={event =>
                            setFilterString(event.target.value)
                        }
                    />

                    <div>
                        {filterPlaylists(serverData.user.playlists).map(
                            playlist => (
                                <Playlist
                                    playlist={playlist}
                                    key={playlist.name}
                                />
                            )
                        )}
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
