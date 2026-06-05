import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/chat');
    } catch (err) {
      setError('Could not connect to server');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#5865f2_0%,#23272a_55%,#18191d_100%)] p-5">
      <div className="w-full max-w-[460px] rounded-[22px] border border-white/14 bg-white/12 px-[22px] py-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl min-[520px]:px-8 min-[520px]:py-9">
        <h1 className="m-0 mb-6 text-center text-[1.75rem] text-white min-[520px]:text-4xl">Create an account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-[18px]">
            <label className="mb-2 block text-left text-[0.95rem] text-white/85" htmlFor="username">Username</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-white/8 px-4 py-3.5 text-base text-[#f7f7f7] outline-none transition placeholder:text-white/50 focus:border-[#7289da] focus:shadow-[0_0_0_3px_rgba(114,137,218,0.18)]"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="mb-[18px]">
            <label className="mb-2 block text-left text-[0.95rem] text-white/85" htmlFor="registerEmail">Email</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-white/8 px-4 py-3.5 text-base text-[#f7f7f7] outline-none transition placeholder:text-white/50 focus:border-[#7289da] focus:shadow-[0_0_0_3px_rgba(114,137,218,0.18)]"
              type="email"
              id="registerEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-[18px]">
            <label className="mb-2 block text-left text-[0.95rem] text-white/85" htmlFor="registerPassword">Password</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-white/8 px-4 py-3.5 text-base text-[#f7f7f7] outline-none transition placeholder:text-white/50 focus:border-[#7289da] focus:shadow-[0_0_0_3px_rgba(114,137,218,0.18)]"
              type="password"
              id="registerPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              minLength={6}
              required
            />
          </div>

          <div className="mb-[18px]">
            <label className="mb-2 block text-left text-[0.95rem] text-white/85" htmlFor="confirmPassword">Confirm password</label>
            <input
              className="w-full rounded-xl border border-white/20 bg-white/8 px-4 py-3.5 text-base text-[#f7f7f7] outline-none transition placeholder:text-white/50 focus:border-[#7289da] focus:shadow-[0_0_0_3px_rgba(114,137,218,0.18)]"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              minLength={6}
              required
            />
          </div>

          {error && <p className="-mt-1 mb-4 text-left text-[0.9rem] text-[#ffb4b4]">{error}</p>}

          <button type="submit" className="w-full cursor-pointer rounded-xl border-0 bg-[linear-gradient(135deg,#6f7fff_0%,#4f61db_100%)] px-4 py-3.5 text-base font-semibold text-white transition hover:-translate-y-px hover:shadow-[0_14px_30px_rgba(79,97,219,0.25)] active:translate-y-0" onClick={handleSubmit}>
            Register
          </button>
        </form>
        <div className="mt-[22px] text-center">
          <p className="m-0 text-[0.95rem] text-white/75">
            Already have an account? <Link className="text-[#c1d5ff] no-underline hover:underline" to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
