export default function Header() {
    
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-slate-800 font-semibold text-lg">SmartShop Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          <span className="text-sm font-medium text-slate-900">Mustapha</span>
          <span className="text-xs text-slate-500">Administrator</span>
        </div>
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
          M
        </div>
      </div>
    </header>
  );
}