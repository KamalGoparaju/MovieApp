export default function MovieSkeleton() {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden animate-pulse">
      <div className="w-full h-[360px] bg-slate-700" />

      <div className="p-3 space-y-2">
        <div className="h-4 bg-slate-700 rounded w-3/4" />
        <div className="flex justify-between">
          <div className="h-3 bg-slate-700 rounded w-12" />
          <div className="h-3 bg-slate-700 rounded w-16" />
        </div>
      </div>
    </div>
  );
}
