import { useEffect, useState } from "react";

interface User {
  username: string;
  role: string;
}

export default function Header() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      
      <h1 className="text-slate-800 font-semibold text-lg">
        SmartShop Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          <span className="text-sm font-medium text-slate-900">
            {user?.username || "Guest"}
          </span>
          <span className="text-xs text-slate-500">
            {user?.role || "User"}
          </span>
        </div>

        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
          {user?.username?.charAt(0).toUpperCase() || "G"}
        </div>
      </div>

    </header>
  );
}
