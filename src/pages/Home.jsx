import ImageUpload from '../components/ImageUpload';
import ImagePreview from '../components/ImagePreview';
import ResultDisplay from '../components/ResultDisplay';
import { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-cpu'; // Add this import

function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);

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
    if (!model || !file) return;
    setLoading(true);
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
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">
        Image Recognition App
      </h1>
      <div className="max-w-md mx-auto">
        <ImageUpload onImageSelect={(file) => {
          setImage(file);
          handleRecognize(file);
        }} />
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