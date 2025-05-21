import ImageUpload from '../components/ImageUpload';
import ImagePreview from '../components/ImagePreview';
import ResultDisplay from '../components/ResultDisplay';
import { useState } from 'react';

function Home() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">
        Image Recognition App
      </h1>
      <div className="max-w-md mx-auto">
        <ImageUpload onImageSelect={setImage} />
        <ImagePreview image={image} />
        <ResultDisplay result={result} />
      </div>
    </div>
  );
}

export default Home;
