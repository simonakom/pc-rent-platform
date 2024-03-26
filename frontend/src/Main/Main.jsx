import clickImage from '../assets/screen.png'; 
import placeholder from '../assets/placeholder.jpg'; 
import { useEffect, useState } from "react";
import { checkSession, logout } from "/utils/api/sessions";
import { Link, useNavigate } from "react-router-dom";
import { getAllPcs } from "../../utils/api/pcService";
import * as PropTypes from "prop-types";


function AuthButtons() {
	return (
	<div className="mt-3 flex flex-col md:flex-row md:justify-start gap-4 whitespace-nowrap">
		<img className="w-[60px] md:mt-0" src={clickImage} alt="click" />
		<div className='md:mt-0'>
			<Link
				to="/registration"
				className="block md:inline-block bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 mb-2 md:mr-5 md:mb-0 text-center md:text-left overflow-hidden"
				style={{ maxWidth: "200px" }}
				> Register now
			</Link>
			<Link
				to="/login"
				className="block md:inline-block bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 text-center md:text-left overflow-hidden"
				style={{ maxWidth: "200px" }}
				>Log In
			</Link>
		</div>
	</div>
	);
  }

 function PcPost({pc}) {
	console.log(pc);

	function choosePcImage(pc) {
		const pcImagesArray = pc.images;
		if(pcImagesArray.length !== 0) return `/server/api/${pcImagesArray[0].uri}`;
		else return placeholder;
	}
	return (
		<div className="flex justify-center items-center pb-7">
		<div className="bg-slate-300 min-h-[300px] hover:bg-[#68676bb5] hover:text-[white] sm:w-[200px] md:w-[260px] lg:w-[300px] xl:w-[390px] xl:h-[360px]">
			<div className="img">
				<img src={choosePcImage(pc)} className="w-full" alt={`Image of ${pc.pcName}`} />
			</div>
			<div className="details py-5 mx-6">
				<a href={`/pc/${pc.id}`}>
					<h3 className="title text-xl mb-2 border-b-4 border-[#66305f] w-fit pr-4">{pc.pcName}</h3>
				</a>
				<div className="text-xs">
					<div className="flex flex-wrap gap-x-4 mb-1">
						<span className="inline-block w-2/5 font-bold">Pc type:</span>
						<span>{pc.pcType}</span>
					</div>
					<a href={`/pc/${pc.id}`}>
						<h3 className="underline mt-5">More specifications....</h3>
					</a>
				</div>
			</div>
		</div>
		</div>
	);
}

export default function Main() {
	const [pcList, setPcList] = useState([]);
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	
	useEffect(() => {
		checkSession((data) => {
			setIsLoggedIn(data.isLoggedIn);
			// if (!data.isLoggedIn) {
			// 	navigate("/login");
			// }
		});
		
		getAllPcs((allPcs)=>{
			setPcList(allPcs);
			// console.log(allPcs);
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

	return (
		<div className="main-bg flex justify-center overflow-y-scroll pt-10 pb-16 px-5 min-h-screen">
		<div className="container md:w-[80%] lg:w-[85%] xl:w-[95%] bg-[#131313b6] min-h-[700px] rounded-2xl p-6">
			<div className="mx-10 mb-4 md:mb-6 lg:mb-8 xl:mb-10 flex items-center flex-col md:flex-row md:justify-between gap-4">
			{!isLoggedIn && <AuthButtons />}
			{isLoggedIn && (
			<div className="flex flex-col md:flex-row items-center whitespace-nowrap">
				<img className="w-[60px] md:mt-0 ml-4 mr-4 mb-5" src={clickImage} alt="click" />
				<Link
					to="/add-new-pc"
					className="block md:inline-block bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 text-center overflow-hidden"
					style={{ maxWidth: "200px" }}
					>Add 
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
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-8 mx-10">
				{pcList.map((pc) => (
					<PcPost pc={pc} key={pc.id}/>
					))}
			</div>
		</div>
		</div>
	);
}

PcPost.propTypes = {
	pc: PropTypes.object.isRequired,
  };