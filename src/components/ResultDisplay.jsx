function ResultDisplay({ result }) {
  return (
    <div className="mt-6 animate-fade-in">
      {result ? (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
          <p className="text-lg font-semibold">
            Label: <span className="text-blue-400">{result.label}</span>
          </p>
          <p className="text-lg">
            Confidence: <span className="text-blue-400">{(result.confidence * 100).toFixed(2)}%</span>
          </p>
        </div>
      ) : (
        <p className="text-gray-400">No results yet</p>
      )}
    </div>
  );
}

export default ResultDisplay;