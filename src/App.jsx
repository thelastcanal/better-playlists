import React from "react";
import "./App.css";

let defaultTextColor = "#fff";
let defaultPadding = "0 20px";
let defaultDisplay = "inline-block";
let defaultStyle = {
    color: defaultTextColor,
    padding: defaultPadding,
    display: defaultDisplay
};

function Aggregate() {
    return (
        <div style={defaultStyle}>
            <h3 style={defaultStyle}>Number and Text</h3>
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

function Playlist() {
    return (
        <div style={defaultStyle}>
            <img
                src="https://via.placeholder.com/150"
                alt="placeholder-image"
            />
            <h3>Playlist Name</h3>
            <ul style={{ "text-align": "left" }}>
                <li>Song 1</li>
                <li>Song 1</li>
                <li>Song 1</li>
            </ul>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 style={{ ...defaultStyle, margin: "0" }}>Title</h1>
                <div>
                    <Aggregate />
                    <Aggregate />
                </div>
                <Filter />
                <div>
                    <Playlist />
                    <Playlist />
                    <Playlist />
                    <Playlist />
                </div>
            </header>
        </div>
    );
}

export default App;
