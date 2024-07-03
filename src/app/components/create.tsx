import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, Stats, Text } from "@react-three/drei";
import { ChangeEvent, Suspense, useEffect, useRef, useState } from 'react'
import { ChromePicker, SketchPicker } from 'react-color';
import { useUser } from "@clerk/clerk-react";
import { Model } from './MehulBeheraAvatar';
import TextToSpeech from "./textToSpeech";



async function createPost(clerkIdentifier: string, text: string, voice: string, pitch: number, rate: number, volume: number) {
    const response = await fetch('/api/createPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clerkIdentifier, text, voice, pitch, rate, volume }),
    });

    if (!response.ok) {
        console.error('Error creating/updating user');
    }
}

export default function Create() {
    const [text, setText] = useState('');
    const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [voiceName, setVoiceName] = useState('');
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const [image, setImage] = useState('');

    const { user } = useUser();

    useEffect(() => {
        const voices = window.speechSynthesis.getVoices();
        setVoice(voices[0]);
    }, []);

    const handleSave = () => {
        createPost(user!.id, text, voiceName, pitch, rate, volume);

    }

    const handleGenerate = () => {
        async function generateImage() {
            const params = new URLSearchParams({
                text,
            });

            const response = await fetch(`/api/generateImage?${params.toString()}`);
            if (response.ok) {
                const data = await response.json();
                setImage(data);
                console.log(data); // Assuming the response contains an 'imageUrl' field
            } else {
                console.error('Error generating image');
            }
        }
        generateImage();
    }

    const handleVoiceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const voices = window.speechSynthesis.getVoices();
        setVoice(voices.find((v) => v.name === event.target.value) || null);
        setVoiceName(event.target.value);
    };

    const handlePitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPitch(parseFloat(event.target.value));
    };

    const handleRateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRate(parseFloat(event.target.value));
    };

    const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(event.target.value));
    };



    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center gap-2 justify-center h-screen w-screen">
                    <img className="rounded-2xl shadow-lg" src={image} alt="Generated Image" />
                    <div className="h-1/2 w-96 shadow-lg rounded-2xl flex flex-col items-center justify-center">
                        <p className="text-bold text-xl mb-4">Options</p>
                        <textarea className="textarea textarea-bordered w-11/12 my-4" placeholder="What do you want to say?" onChange={(e) => setText(e.target.value)}></textarea>
                        <div className="my-4">
                            <div className="flex flex-row">
                                <label className="flex items-center mx-4">
                                    Voice:
                                    <select className="select select-bordered w-full max-w-xs ml-2" value={voice?.name || ''} onChange={handleVoiceChange}>
                                        {window.speechSynthesis.getVoices().map((voice) => (
                                            <option key={voice.name} value={voice.name}>
                                                {voice.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <br />

                            <div className="flex items-center">
                                <label className="ml-4 mr-9">Pitch:</label>
                                <input
                                    type="range"
                                    className="range w-60"
                                    min="0.5"
                                    max="2"
                                    step="0.1"
                                    value={pitch}
                                    onChange={handlePitchChange}
                                />
                            </div>

                            <br />

                            <div className="flex items-center">
                                <label className="ml-4 mr-6">Speed:</label>
                                <input
                                    type="range"
                                    className="range w-60"
                                    min="0.5"
                                    max="2"
                                    step="0.1"
                                    value={rate}
                                    onChange={handleRateChange}
                                />
                            </div>

                            <br />

                            <div className="flex items-center">
                                <label className="mx-4">Volume:</label>
                                <input
                                    type="range"
                                    className="range w-60"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                />
                            </div>


                        </div>

                        <TextToSpeech text={text} voice={voice} pitch={pitch} rate={rate} volume={volume} btnSize="" />
                        <button className="btn mt-4 w-20" onClick={() => handleGenerate()}>Generate</button>
                        <button className="btn mt-4 w-20" onClick={() => handleSave()}>Save</button>
                    </div>

                </div>

            </div>
        </>
    );
}

// <div className="flex h-1/2 w-96 shadow-lg rounded-2xl items-center justify-center">
//                         <Canvas style={{ width: '100%', height: '100%' }}>
//                             <ambientLight intensity={Math.PI / 2} />
//                             <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
//                             <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
//                             <Model position={[0, -1.5, 1]} />
//                             <OrbitControls />
//                         </Canvas>
//                     </div>

// <Canvas style={{ width: '100%', height: '100%' }}>
//     <ambientLight intensity={Math.PI / 2} />
//     <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
//     <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
//     <Box position={[0, 0, 0]} hoverColor={color} standardColor='orange' size={size} />
//     <OrbitControls />
// </Canvas>

