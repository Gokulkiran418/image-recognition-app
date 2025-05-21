function ImagePreview({ image }){
    return (
        <div className="mt-6 animate-fade-in">
        {image ? (
            <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="max-w-xs rounded-lg shadow-lg mx-auto"
            />
        ) : (
            <p className="text-gray-400">No image selected</p>
        )}
        </div>
    );
}

export default ImagePreview;