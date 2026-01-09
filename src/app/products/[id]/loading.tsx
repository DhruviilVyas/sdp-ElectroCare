export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Navbar Skeleton */}
      <div className="h-16 w-full bg-white rounded-xl mb-8 animate-pulse shadow-sm"></div>

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Col Skeleton */}
          <div className="lg:col-span-1 space-y-6">
            <div className="h-96 bg-white rounded-3xl animate-pulse shadow-sm"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 bg-white rounded-xl animate-pulse"></div>
              <div className="h-20 bg-white rounded-xl animate-pulse"></div>
            </div>
          </div>

          {/* Right Col Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-40 bg-white rounded-2xl animate-pulse shadow-sm"></div>
            <div className="h-40 bg-white rounded-2xl animate-pulse shadow-sm"></div>
            <div className="h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}