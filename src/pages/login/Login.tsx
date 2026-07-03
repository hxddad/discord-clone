import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/chat/home');
    } catch (err) {
      setError('Could not connect to server');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#3b49eb_0%,#23272a_55%,#18191d_100%)] p-5">
      <div className="w-full max-w-[420px] rounded-[22px] border border-white/14 bg-white/12 px-8 py-9 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
        <h1 className="m-0 mb-6 text-center text-4xl text-white">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-[18px]">
            <label className="mb-2 block text-[0.95rem] text-white/85" htmlFor="email">Email</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-white/8 px-4 py-3.5 text-base text-[#f7f7f7] outline-none transition placeholder:text-white/50 focus:border-[#7289da] focus:shadow-[0_0_0_3px_rgba(114,137,218,0.18)]"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-[18px]">
            <label className="mb-2 block text-[0.95rem] text-white/85" htmlFor="password">Password</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-white/8 px-4 py-3.5 text-base text-[#f7f7f7] outline-none transition placeholder:text-white/50 focus:border-[#7289da] focus:shadow-[0_0_0_3px_rgba(114,137,218,0.18)]"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="-mt-1 mb-4 text-left text-[0.9rem] text-[#ffb4b4]">{error}</p>}
          <button type="submit" className="w-full cursor-pointer rounded-xl border-0 bg-[linear-gradient(135deg,#6f7fff_0%,#4f61db_100%)] px-4 py-3.5 text-base font-semibold text-white transition hover:-translate-y-px hover:shadow-[0_14px_30px_rgba(79,97,219,0.25)] active:translate-y-0">
            Login
          </button>
        </form>
        <div className="mt-[22px] text-center">
          <p className="m-0 text-[0.95rem] text-white/75">Don't have an account? <Link className="text-[#c1d5ff] no-underline hover:underline" to="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
