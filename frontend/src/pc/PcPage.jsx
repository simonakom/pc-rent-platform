import { useParams } from "react-router-dom"
import clickImage from '../assets/screen.png'; 
import desktopImage from "/src/assets/pc-images/pc.jpg.webp";
import laptopImage from "/src/assets/pc-images/laptop.webp";
import macImage from "/src/assets/pc-images/macbook.jpg";
import { useEffect, useState } from "react";
import { checkSession, logout } from "/utils/api/sessions";
import { Link, useNavigate } from "react-router-dom";
import { getAllPcs } from "../../utils/api/pcService";
import * as PropTypes from "prop-types";


function PcPost({pc}) {

	function choosePcImage(pcType) {
		switch (pcType) {
			case "Desktop Computer":
				return desktopImage;
			case "Laptop":
				return laptopImage;
			case "Macbook":
				return macImage;
			default:
				return "https://placehold.co/400x300";
		}
	}
	return (
		<div className="flex justify-center items-center pb-7">
        <div className="flex flex-col items-center">
        <h3 className="text-4xl mb-5 border-b-4 text-white border-[#b590b0] w-fit pr-4 text-center">{pc.pcName}</h3>
        <div className="flex bg-slate-300">
            <div className="img">
                <img src={choosePcImage(pc.pcType)} className="w-full max-w-[800px]" />
            </div>
            <div className="details py-10 mx-10">
            <h3 className="mb-3 text-2xl">Specifications:</h3>
                <div className="text-xs">
                    <div className="flex flex-wrap gap-x-4 mb-1">
                        <span className="inline-block w-3/7 font-bold">
                            CPU
                        </span>
                        <span>{pc.cpu}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 mb-1">
                        <span className="inline-block w-3/7 font-bold">
                            GPU:
                        </span>
                        <span>{pc.gpu}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 mb-1">
                        <span className="inline-block w-3/7 font-bold">
                            Pc type:
                        </span>
                        <span>{pc.pcType}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 mb-1">
                        <span className="inline-block w-3/7 font-bold">
                            Ram type:
                        </span>
                        <span>{pc.ramType}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 mb-1">
                        <span className="inline-block w-3/7 font-bold">
                            Ram speed:
                        </span>
                        <span>{pc.ramSpeed}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 mb-1">
                        <span className="inline-block w-3/7 font-bold">
                            Ram amount:
                        </span>
                        <span>{pc.ramAmount}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
	);
}

export default function Main() {
    const { id } = useParams(); 
    const parsedId = parseInt(id); 
    const [pc, setPc] = useState(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
	
    useEffect(() => {
        checkSession((data) => {
            setIsLoggedIn(data.isLoggedIn);
            if (!data.isLoggedIn) {
                navigate("/login");
            }
        });
        
        getAllPcs((allPcs) => {
            const selectedPc = allPcs.find((pc) => pc.id === parsedId);
            setPc(selectedPc);
        });
    }, [parsedId, navigate]);
    
    function logOut() {
        logout((response) => {
            if (response.status) {
                setIsLoggedIn(false);
                navigate("/login");
            }
        });
    }

	return (
		<div className="main-bg flex justify-center overflow-y-scroll pt-10 pb-16 px-5">
		<div className="container md:w-[80%] lg:w-[85%] xl:w-[95%] bg-[#131313b6] min-h-[700px] rounded-2xl p-6">
			<div className="mx-10 mb-4 md:mb-6 lg:mb-8 xl:mb-10 flex items-center flex-col md:flex-row md:justify-between gap-4">

			{isLoggedIn && (
			<div className="flex flex-col md:flex-row items-center whitespace-nowrap">
				<img className="w-[60px] md:mt-0 ml-4 mr-4 mb-5" src={clickImage} alt="click" />
				<Link
					to="/"
					className="block md:inline-block bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 text-center overflow-hidden"
					style={{ maxWidth: "200px" }}
					>Home
				</Link>
			</div>
			)}
			{isLoggedIn && (
				<button
					className="block md:inline-block  bg-[#431b3d] hover:bg-[#4e2548] rounded text-white px-8 py-2 text-center overflow-hidden"
					style={{ maxWidth: "200px" }}
					onClick={logOut}
					>Logout
				</button>
			)}
			</div>
			{pc ? (
                    <div>
                        <PcPost pc={pc} />
                    </div>
                ) : (
                    <div className="text-center text-2xl text-white">Ops..Pc not found...</div>
                )
            }
		</div>
		</div>
	);
}

PcPost.propTypes = {
	pc: PropTypes.object.isRequired,
  };