export default function LoadingPage() {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            <h2 className="text-lg mt-4 text-red-700">Loading movies...</h2>
          </div>
        </div>
      </div>
    );
  }