// src/components/SignupForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../utils/api";

export default function SignupForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await instance.post("/users", { user: formData }, {
                headers: { Authorization: "" },
            });

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            console.error("SIGNUP ERROR:", err);
            setError(err.response?.data?.errors?.join(", ") || "Signup failed");
        }
    };

    return (
        <><form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-3">
            <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded" />
            <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded" />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded" />
            <input
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full p-2 border rounded" />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                Sign Up
            </button>
        </form>
        <div>
                <p className="text-sm mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 underline">
                        Log in
                    </Link>
                </p>
            </div></>
    );
}