import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Diagnosis } from '../types';
import { diagnoseIssue } from '../services/geminiService';
import { CameraIcon } from './icons';
import LoadingSpinner from './LoadingSpinner';

interface ScannerProps {
  onDiagnosisComplete: (diagnosis: Diagnosis) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onDiagnosisComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraOn(true);
          setError(null);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access camera. Please check permissions and try again.");
        setIsCameraOn(false);
      }
    } else {
        setError("Camera not supported on this device.");
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      // Cleanup: stop camera stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsLoading(true);
    setError(null);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if(context){
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        const base64 = dataUrl.split(',')[1];
        
        try {
            const diagnosisResult = await diagnoseIssue(base64);
            onDiagnosisComplete(diagnosisResult);
        } catch(err) {
            setError("Failed to get a diagnosis. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-text-primary">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Instant Diagnosis</h1>
        <p className="text-text-secondary mb-6 text-center">Point your camera at the problem area and tap 'Scan'.</p>
        
        <div className="relative w-full aspect-video bg-slate-200 rounded-xl overflow-hidden shadow-lg border border-border-color mb-6">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />
          {!isCameraOn && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80">
                {error ? (
                    <p className="text-red-500 text-center p-4">{error}</p>
                ): (
                    <>
                        <CameraIcon className="w-16 h-16 text-slate-400 mb-4" />
                        <p className="text-text-secondary">Starting Camera...</p>
                    </>
                )}
            </div>
          )}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <LoadingSpinner text="Analyzing..." />
            </div>
          )}
        </div>
        
        <button
          onClick={handleScan}
          disabled={!isCameraOn || isLoading}
          className="w-full max-w-xs bg-primary text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-3 text-lg hover:bg-primary-focus transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl shadow-primary/30"
        >
          <CameraIcon className="w-6 h-6" />
          <span>{isLoading ? 'Scanning...' : 'Scan Now'}</span>
        </button>
      </div>
    </div>
  );
};

export default Scanner;