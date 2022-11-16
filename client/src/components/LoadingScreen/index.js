import React from 'react';
import Loading from '../../images/loading-gif.gif';

const LoadingScreen = () => {
    // Render loading image if loading
    return (
        <div className='center'>
            <img src={Loading} className='loading' alt='loading'></img>
        </div>
    );
};

export default LoadingScreen;