import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { loginUser, type LoginCredentials } from "../../services/auth.service";
// type becuase it's interface

const SignInPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const credentials: LoginCredentials = {
      username: username,
      password: password
    };

    try {
    
      const user = await loginUser(credentials);

      if (user.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/shop");
      }
    } catch (error) {
      alert("Login failed! Check console.");
    }
  };

  return (
    <div className="w-scree h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
  {/* The Login Card */}
  <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md mx-4">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
      <p className="text-gray-500 mt-2">Please enter your details</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700">Username</label>
        <input 
          type="text"
          placeholder="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Password</label>
        <input 
          type="password" 
          placeholder="••••••••" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <button 
        type="submit"
        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transform transition-all active:scale-95"
      >
        Login to SmartShop
      </button>
    </form>
  </div>
</div>
  );
};

export default SignInPage;