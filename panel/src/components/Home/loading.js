import React from 'react';
import photo from './../../favicon-96x96.png';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="heart-container mb-4">
                <img className="heart" src={photo} alt="Pulsating Heart" />
            </div>
            <div className="text-lg text-gray-700 animate-pulse">Loading . . .</div>

            <style jsx>{`
                .heart-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .heart {
                    width: 50px;
                    height: 50px;
                    animation: heartbeat 1.5s infinite;
                }

                @keyframes heartbeat {
                    0% {
                        transform: scale(1);
                    }
                    25% {
                        transform: scale(1.2);
                    }
                    50% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default Loading;
