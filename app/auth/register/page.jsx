"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        // Simple validation (you can replace this with your own validation logic)
        if (!name || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        // Logic to handle registration (e.g., calling an API to save the user in the database)
        // After successful registration, redirect to the login page
        // Here we just simulate a successful registration for now
        setTimeout(() => {
            alert("User registered successfully!");
            router.push("/auth/signIn"); // Redirect to sign-in page after registration
        }, 1000);
    };

    return (
        <div className="flex flex-col w-full h-[calc(100vh-64px)] gap-3 items-center justify-center bg-gray-100">
            <form onSubmit={handleRegister} className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-lg w-96">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
