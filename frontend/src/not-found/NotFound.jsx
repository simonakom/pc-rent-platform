import clickImage from '../assets/screen.png'; 
import { Link } from "react-router-dom";
export default function NotFound() {
	return (
        <div className="min-h-screen flex justify-center items-center not-found-bg py-10 px-6 overflow-hidden">
            <div className="max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl text-center bg-black bg-opacity-70 text-white rounded-2xl p-6">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#c98bc9]">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Page Not Found</h2>
                <p className="mb-4 text-justify">
					We&apos;re sorry, but the page you were looking for doesn&apos;t seem
					to exist. It might have been moved, deleted, or possibly never existed
					at all. Don&apos;t worry, though! This often happens and you&apos;re
					not at fault here.
                </p>
                <p className="text-justify">Here are a few options to help you find what you&apos;re looking for:</p>
                <ul className="list-disc list-inside mb-4 text-justify">
                    <li>Double-check the URL for any typos or errors.</li>
                    <li>Use the search function at the top of the page to find related content.</li>
                    <li>Return to the homepage and navigate from there to find your desired section.</li>
                </ul>
                <p className="text-justify">
                    If you believe this page should exist or if you continue to encounter
                    this message, please contact our support team for assistance.
                    We&apos;re here to help you navigate and find exactly what you need.
                </p>
                <div className="my-8 flex flex-col justify-center items-center">
                    <Link
                         to="/" 
                         className="bg-[#60346b] hover:bg-purple-800 px-4 py-2 rounded-lg text-lg md:text-xl whitespace-nowrap">
                        Go Home
                    </Link>
                    <img className="w-[60px] mt-5" src={clickImage} alt="click" />
                </div>
            </div>
        </div>
    );
}