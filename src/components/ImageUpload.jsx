function ImageUpload({ onImageSelect }){
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) onImageSelect(file);
    };
    return(
        <div className="flex flex-col items-center animate-fade-in">
            <label className="block mb-2 text-lg font-semibold text-white">
                Upload an Image
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-300
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-600 file:text-white
                        hover:file:bg-blue-700 transition
                        cursor-pointer"
            />
        </div>
    );
}

export default ImageUpload;