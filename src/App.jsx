import 'regenerator-runtime/runtime'
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";


const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    const handleReset = () => {
        setTextToCopy(""); // Clear the text
        resetTranscript(); // Reset the transcript
    };
    

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript,  resetTranscript,browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <>
            <div className="container">
                <h2>Speech to Text Converter</h2>
                <br/>
                <p>This is the React App which Convert Speech from Microphone to Text Format</p>
                <p style={{ fontSize: '40px', fontWeight: 'bold' }}>Come on, Let's Try!</p>


                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                 {transcript || "Start Speaking And I Will Write it"} 
                </div>

                <div className="btn-style">

                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                    <button onClick={startListening}>Start Writing</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop writing</button>
                    <button onClick={handleReset}>Reset</button> 

                </div>

            </div>

        </>
    );
};

export default App;