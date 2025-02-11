import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-white text-center">
            <Flame className="text-primary w-20 h-20 animate-bounce ease-in" />
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <p className="text-xl mt-4">Oops! The page you're looking for isn't here.</p>
            <p className="text-lg mt-2">Maybe it's lost in the flames of FireFlix!</p>
            <Link to="/" className="mt-6 px-6 py-3 bg-primary text-white text-lg font-semibold rounded-lg hover:opacity-80 transition">
                Ignite Your Screen Again
            </Link>
        </div>
    );
};

export default Error;