import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import { getById } from "/utils/api/pcService";
import { checkSession, logout } from "/utils/api/sessions";
import notFoundImage from '../assets/not-found.png'; 
import clickImage from '../assets/screen.png'; 
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import placeholder from '../assets/placeholder.jpg'; 


export default function PcPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isPcFound, setIsPcFound] = useState(false);
	const [pcDetails, setPcDetails] = useState({});
    const [pcImages, setPcImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index
	const { id } = useParams();

	useEffect(() => {
		getById(id, (resp) => {
			setIsPcFound(resp.status);
			setPcDetails(resp.pc);  
            setPcImages(resp.pcImages)
		});
	}, [id]);

    const navigate = useNavigate();
    useEffect(() => {
		checkSession((data) => {
			setIsLoggedIn(data.isLoggedIn);
			if (!data.isLoggedIn) {
				navigate("/login");
			}
		});
		
	}, [navigate]);

    function logOut() {
		logout((response) => {
			if (response.status) {
				setIsLoggedIn(false);
				navigate("/login");
			}
		});
	}

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pcImages.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? pcImages.length - 1 : prevIndex - 1
        );
    };


    if (!isPcFound) return ( 
        <main className="main-bg flex justify-center items-center">
            <div className="container mx-auto min-h-screen flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <img src={notFoundImage} alt="not-found-image" className="w-[70%]" />
                    <div className="p-4 text-center">
                        <p className="font-semibold text-white text-3xl">Ops..Pc not found...</p>
                        <Link
						to="/"
						className="block md:inline-block bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 mt-5 text-center overflow-hidden"
						style={{ maxWidth: "200px" }}
                        >Go Home
                        </Link>                    
                    </div>
                </div>
            </div>
        </main>
    );
    else return (
        <div className="main-bg flex justify-center overflow-y-scroll pt-10 pb-16 px-5 min-h-screen">
            <div className="container md:w-[80%] lg:w-[85%] xl:w-[95%] bg-[#131313b6] min-h-[700px] rounded-2xl p-6">
                <div className="mx-10 mb-4 md:mb-6 lg:mb-8 xl:mb-10 flex items-center flex-col md:flex-row md:justify-between gap-4">
                    {isLoggedIn && (
                        <div className="flex flex-col md:flex-row items-center whitespace-nowrap">
                            <img className="w-[60px] md:mt-0 ml-4 mr-4 mb-5" src={clickImage} alt="click" />
                            <Link
                                to="/"
                                className="block md:inline-block bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 text-center overflow-hidden"
                                style={{ maxWidth: "200px" }}
                            >
                                Home 
                            </Link>
                        </div>
                    )}
                    {isLoggedIn && (
                        <button
                            className="block md:inline-block  bg-[#431b3d] hover:bg-[#4e2548] rounded text-white px-8 py-2 text-center overflow-hidden"
                            style={{ maxWidth: "200px" }}
                            onClick={logOut}
                        >
                            Logout
                        </button>
                    )}
                </div>
                <div className="flex justify-center"> 
                    <div className=" bg-[#131313b6] text-white rounded-xl max-w-[500px] overflow-hidden relative">
                        <div className="pc-image bg-blue-50 relative">
                            <img
                                src={pcImages.length === 0 ? placeholder : "/server/api/" + pcImages[currentImageIndex].uri}
                                alt="pc-image"
                                className="max-h-[300px]"
                            />
                            {pcImages.length > 1 && (
                                <>
                                    <button
                                        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#80808099] text-white p-2 mx-3 rounded-full"
                                        onClick={handlePrevImage}
                                    >
                                        <FaAngleDoubleLeft />
                                    </button>
                                    <button
                                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#80808099] text-white p-2 mx-3 rounded-full"
                                        onClick={handleNextImage}
                                    >
                                        <FaAngleDoubleRight />

                                    </button>
                                </>
                            )}
                        </div>
                        <div className="p-4 ml-10">
                            <h3 className="text-4xl mb-5 border-b-4 text-white border-[#c085b8] w-fit pr-4 text-center]">
                                {pcDetails.pcName}
                            </h3>
                            <p className="font-bold mb-4 text-sm">
                                Owner: <span className="italic font-normal">User123</span>
                            </p>
                            <h3 className="font-bold text-sm mb-4">Specifications:</h3>
                            <div className="text-sm">
                                <div className="flex flex-wrap gap-x-4 mb-1">
                                    <span className="inline-block w-3/7 font-bold">
                                        CPU
                                    </span>
                                    <span>{pcDetails.cpu}</span>
                                </div>
                                <div className="flex flex-wrap gap-x-4 mb-1">
                                    <span className="inline-block w-3/7 font-bold">
                                        GPU:
                                    </span>
                                    <span>{pcDetails.gpu}</span>
                                </div>
                                <div className="flex flex-wrap gap-x-4 mb-1">
                                    <span className="inline-block w-3/7 font-bold">
                                        Pc type:
                                    </span>
                                    <span>{pcDetails.pcType}</span>
                                </div>
                                <div className="flex flex-wrap gap-x-4 mb-1">
                                    <span className="inline-block w-3/7 font-bold">
                                        Ram type:
                                    </span>
                                    <span>{pcDetails.ramType}</span>
                                </div>
                                <div className="flex flex-wrap gap-x-4 mb-1">
                                    <span className="inline-block w-3/7 font-bold">
                                        Ram speed:
                                    </span>
                                    <span>{pcDetails.ramSpeed}</span>
                                </div>
                                <div className="flex flex-wrap gap-x-4 mb-1">
                                    <span className="inline-block w-3/7 font-bold">
                                        Ram amount:
                                    </span>
                                    <span>{pcDetails.ramAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}