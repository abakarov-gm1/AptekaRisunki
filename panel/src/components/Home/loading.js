import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="heart-container mb-4">
                <div className="heart"></div>
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
                background-color: red;
                position: relative;
                transform: rotate(-45deg);
                animation: heartbeat 1.5s infinite;
            }
            .heart::before,
            .heart::after {
                content: '';
                width: 50px;
                height: 50px;
                background-color: red;
                border-radius: 50%;
                position: absolute;
            }
            .heart::before {
                top: -25px;
                left: 0;
            }
            .heart::after {
                left: 25px;
                top: 0;
            }

            @keyframes heartbeat {
                0% {
                    transform: scale(1) rotate(-45deg);
                }
                25% {
                    transform: scale(1.2) rotate(-45deg);
                }
                50% {
                    transform: scale(1) rotate(-45deg);
                }
            }
        `}</style>
        </div>
    );
};

export default Loading;