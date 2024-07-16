'use client'
import React from 'react';
import Lottie from "lottie-react";
import * as animationData from '@/components/lottie/loading-hand.json'

const Loading = () => {
    
    return (
       
        <div className="screen_loader animate__animated fixed inset-0 z-[60] grid place-content-center bg-white">
             <Lottie animationData={animationData}/></div>
    );
};

export default Loading;
