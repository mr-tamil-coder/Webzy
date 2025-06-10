const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-40">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div
          className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"
          aria-label="Loading"
        ></div>

        {/* Text */}
        <p className="text-blue-600 font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
