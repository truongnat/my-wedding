/**
 * Loading state component for the application
 * Displays while the page is loading
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white">
      <div className="text-center">
        {/* Animated spinner */}
        <div className="mb-6 inline-block">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-rose-200 border-t-rose-600" />
        </div>

        {/* Loading text */}
        <h2 className="mb-2 font-playfair text-2xl font-semibold text-rose-900">Loading...</h2>
        <p className="text-gray-600">Please wait while we prepare everything</p>
      </div>
    </div>
  );
}
