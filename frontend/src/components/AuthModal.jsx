import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm]       = useState({ username: "", email: "", password: "" });
  const [error, setError]     = useState("");
  const { login, register }   = useAuth();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setError("");
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register(form.username, form.email, form.password);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

        {!isLogin && (
          <input name="username" placeholder="Username" value={form.username} onChange={handle} />
        )}
        <input name="email"    placeholder="Email"    value={form.email}    onChange={handle} />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handle} />

        {error && <p className="error">{error}</p>}
        <button className="submit-btn" onClick={submit}>
          {isLogin ? "Login" : "Register"}
        </button>
        <p className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "No account? Register →" : "Have an account? Login →"}
        </p>
      </div>
    </div>
  );
}