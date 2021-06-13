import React from 'react';

export default function App() {
    const onClickButton = () => {
        window.alert("clicked !!")
    }
    return (
        <div>
            <button onClick={onClickButton}>클릭</button>
        </div>
    )
}