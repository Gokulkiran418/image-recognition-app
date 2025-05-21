import ImageUpload from '../components/ImageUpload';
import ImagePreview from '../components/ImagePreview';
import ResultDisplay from '../components/ResultDisplay';
import { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-cpu';

function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeModel, setActiveModel] = useState('TensorFlow.js'); // Default model

  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading MobileNet:', error);
      }
    }
    loadModel();
  }, []);

  const handleRecognize = async (file) => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    if (activeModel === 'Flask') {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch('http://localhost:5000/api/recognize', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          setResult({ label: data.label, confidence: data.confidence });
        } else {
          setResult({ label: 'API Error', confidence: 0 });
        }
      } catch (error) {
        console.error('Error calling API:', error);
        setResult({ label: 'API Error', confidence: 0 });
      }
      setLoading(false);
    } else {
      if (!model) {
        setResult({ label: 'Model not loaded', confidence: 0 });
        setLoading(false);
        return;
      }
      try {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = async () => {
          const predictions = await model.classify(img);
          if (predictions.length > 0) {
            setResult({
              label: predictions[0].className,
              confidence: predictions[0].probability,
            });
          }
          setLoading(false);
        };
      } catch (error) {
        console.error('Error classifying image:', error);
        setResult({ label: 'Error', confidence: 0 });
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">
        Image Recognition App
      </h1>
      <div className="max-w-md mx-auto">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setActiveModel('TensorFlow.js')}
            className={`px-4 py-2 rounded-full text-white transition-transform transform
              ${activeModel === 'TensorFlow.js' ? 'bg-blue-700 scale-105' : 'bg-blue-600'}
              hover:bg-blue-700 active:scale-95`}
          >
            TensorFlow.js
          </button>
          <button
            onClick={() => setActiveModel('Flask')}
            className={`px-4 py-2 rounded-full text-white transition-transform transform
              ${activeModel === 'Flask' ? 'bg-blue-700 scale-105' : 'bg-blue-600'}
              hover:bg-blue-700 active:scale-95`}
          >
            Flask API
          </button>
        </div>
        <p className="text-center text-gray-300 mb-4 animate-fade-in">
          Using: <span className="text-blue-400">{activeModel}</span>
        </p>
        <ImageUpload
          onImageSelect={(file) => {
            setImage(file);
            handleRecognize(file);
          }}
        />
        <ImagePreview image={image} />
        {loading ? (
          <div className="mt-6 text-center animate-pulse">
            <p className="text-blue-400 text-lg">Processing...</p>
          </div>
        ) : (
          <ResultDisplay result={result} />
        )}
      </div>
    </div>
  );
}

export default Home;