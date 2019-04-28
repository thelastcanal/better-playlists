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
            <img
                style={{ maxWidth: "250px" }}
                src={playlist.image}
                alt="placeholder"
            />
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
    // NEW React state Hooks
    const [serverData, setServerData] = useState(null);
    const [filterString, setFilterString] = useState("");

    // NEW React effect Hooks
    useEffect(() => {
        console.log("componentDidMount");

        const accessToken = new URLSearchParams(window.location.search).get(
            "access_token"
        );

        const getPlaylists = async () => {
            const response = await fetch(
                "https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    }
                }
            )
                .then(response => response.json())
                .catch(error => console.log(error));

            return Promise.all(
                response.items.map(async playlist => {
                    return {
                        name: playlist.name,
                        image: playlist.images[0].url,
                        songs: await getSongs(playlist.tracks.href)
                    };
                })
            );
        };

        const getSongs = async trackListEndpoint => {
            const response = await fetch(trackListEndpoint, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            })
                .then(response => response.json())
                .catch(error => console.log(error));

            return response.items.map(song => {
                return {
                    name: song.track.name,
                    duration: song.track.duration_ms
                };
            });
        };

        const getUsername = async () => {
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            })
                .then(response => response.json())
                .catch(error => console.log(error));

            return response.display_name;
        };

        const getSpotifyData = async () => {
            const username = await getUsername();
            const playlists = await getPlaylists();

            setServerData({
                user: {
                    name: username,
                    playlists: playlists
                }
            });
        };

        /*
         * SPOTIFY API
         * Checks for access token in url, if found, gets username and playlist
         * data from Spotify API and updates app state via setServerData.
         */
        accessToken ? getSpotifyData() : console.log("please sign in");
    }, []);

    function getTotalDuration(playlists) {
        let allSongs = playlists.reduce((songs, eachPlaylist) => {
            return songs.concat(eachPlaylist.songs);
        }, []);

        let totalDuration = allSongs.reduce((sum, eachSong) => {
            return sum + eachSong.duration;
        }, 0);

        return Math.round(totalDuration / 1000 / 60 / 60);
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
                    <h1 style={{ ...defaultStyle, margin: "0" }}>
                        Better Playlists
                    </h1>
                    <a style={defaultStyle} href="http://localhost:8888/login">
                        Sign in with Spotify
                    </a>
                </header>
            )}
        </div>
    );
}

export default App;
