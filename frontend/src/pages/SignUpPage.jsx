import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
	const { searchParams } = new URL(document.location);
	const emailValue = searchParams.get("email");

	const [email, setEmail] = useState(emailValue || "");
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { signup, isSigningUp } = useAuthStore();

	const handleSignUp = (e) => {
		e.preventDefault();
		signup({ email, userName, password });
	};

	return (
		<div className="h-screen w-full hero-bg bg-cover bg-center">
			<header className="max-w-6xl mx-auto flex items-center justify-between p-6">
				<Link to={"/"}>
					<img src="/netflix-logo.png" alt="logo" className="w-40 sm:w-52" />
				</Link>
			</header>

			<div className="flex justify-center items-center mt-16 sm:mt-32 mx-3">
				<div className="w-full max-w-md p-10 space-y-6 bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl">
					<h1 className="text-center text-white text-3xl sm:text-4xl font-semibold mb-6">Sign Up</h1>

					<form className="space-y-6" onSubmit={handleSignUp}>
						<div>
							<label htmlFor="email" className="text-sm font-medium text-gray-300 block">
								Email
							</label>
							<input
								type="email"
								className="w-full px-4 py-3 mt-2 border border-gray-700 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-600"
								placeholder="you@example.com"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="userName" className="text-sm font-medium text-gray-300 block">
								Username
							</label>
							<input
								type="text"
								className="w-full px-4 py-3 mt-2 border border-gray-700 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-600"
								placeholder="johndoe"
								id="userName"
								value={userName}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="password" className="text-sm font-medium text-gray-300 block">
								Password
							</label>
							<input
								type="password"
								className="w-full px-4 py-3 mt-2 border border-gray-700 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-600"
								placeholder="••••••••"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-600"
							disabled={isSigningUp}
						>
							{isSigningUp ? "Loading..." : "Sign Up"}
						</button>
					</form>

					<div className="text-center text-gray-400 mt-4">
						Already a member?{" "}
						<Link to={"/login"} className="text-red-500 hover:underline">
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;

