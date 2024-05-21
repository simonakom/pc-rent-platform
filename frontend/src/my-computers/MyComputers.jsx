import clickImage from '../assets/screen.png'; 
import {useEffect, useState, useMemo } from "react"; 
import {getMyPcs} from "../../utils/api/pcService"; 
import PcPost from "../PcPost/PcPost";
import { Link, useNavigate } from "react-router-dom";
import { checkSession, logout } from "/utils/api/sessions";

export default function MyComputers() {
	const sortingModes = Object.freeze ({
		DEFAULT: "default",
		ASCENDING: "asc",
		DESCENDING: "desc",
	});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [allPcs, setAllPcs] = useState([]);
    const [selectedSortingMode, setSelectedSortingMode] = useState(sortingModes.DEFAULT);
    const [selectedCpuSortingMode, setSelectedCpuSortingMode] = useState(sortingModes.DEFAULT);
    const [selectedGpuSortingMode, setSelectedGpuSortingMode] = useState(sortingModes.DEFAULT);

    const sortedComputers = useMemo(() => {
        const pcs = [...allPcs];
        return pcs.sort((pc1, pc2) => {
            if (selectedSortingMode === sortingModes.ASCENDING) {
                return pc1.pcName.trimStart().localeCompare(pc2.pcName.trimStart());
            } else if (selectedSortingMode === sortingModes.DESCENDING) {
                return pc2.pcName.trimStart().localeCompare(pc1.pcName.trimStart());
            } else {
                return 0;
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allPcs, selectedSortingMode]);

    const sortedComputersWithCpuAndGpuSorting = useMemo(() => {
        return sortedComputers.sort((pc1, pc2) => {
            if (selectedCpuSortingMode === sortingModes.ASCENDING) {
                return pc1.cpu.trimStart().localeCompare(pc2.cpu.trimStart());
            } else if (selectedCpuSortingMode === sortingModes.DESCENDING) {
                return pc2.cpu.trimStart().localeCompare(pc1.cpu.trimStart());
            } else {
                return 0;
            }
        }).sort((pc1, pc2) => {
            if (selectedGpuSortingMode === sortingModes.ASCENDING) {
                return pc1.gpu.trimStart().localeCompare(pc2.gpu.trimStart());
            } else if (selectedGpuSortingMode === sortingModes.DESCENDING) {
                return pc2.gpu.trimStart().localeCompare(pc1.gpu.trimStart());
            } else {
                return 0;
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortedComputers, selectedCpuSortingMode, selectedGpuSortingMode]);

	useEffect(() => {
		getMyPcs((resp) => {
			console.log(resp);
			if (resp.status) setAllPcs(resp.allPcs);
			else {
				alert("Couldn't get all computers...");
			}
		});
	}, []);
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

	return (
	<div className="main-bg flex justify-center overflow-y-scroll pt-10 pb-16 px-5 min-h-screen">
		<div className="container md:w-[80%] lg:w-[85%] xl:w-[95%] bg-[#131313b6] min-h-[700px] rounded-2xl p-6 overflow-hidden">
			<div className='flex align-center md:ms-10 s-1'> 
				<img className="w-[60px] md:mt-0 mb-5" src={clickImage} alt="click" />
				<p className='text-[#f2634a] text-4xl mt-2'>Rentify</p>
			</div>
			<div className="mx-10 mb-2 flex items-center flex-col md:flex-row md:justify-between gap-4">
				{isLoggedIn && (
				<div className="flex flex-col md:flex-row items-center whitespace-nowrap gap-5">
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
			<div className="text-[#ffffff] bg-[#60346b84] rounded-2xl text-2xl my-5 px-7 py-2 w-fit mx-auto">My Computers</div>
			<div className="text-white flex flex-wrap justify-center md:justify-start gap-4">
				<select 
					className='bg-[#4847474d] mx-1 px-4 py-1 rounded-xl hover:text-[black] hover:bg-[#d3caca7b]'
					value={selectedSortingMode}
					onChange={(e) => setSelectedSortingMode(e.target.value)}
				>
						<option value={sortingModes.DEFAULT} >Not sorted</option>
						<option value={sortingModes.ASCENDING}>Sort A-Z</option>
						<option value={sortingModes.DESCENDING}>Sort Z-A</option>
				</select>
				<select 
					className='bg-[#4847474d] mx-1 px-4 py-1 rounded-xl hover:text-[black] hover:bg-[#d3caca7b]'
					value={selectedCpuSortingMode}
					onChange={(e) => setSelectedCpuSortingMode(e.target.value)}
				>
						<option value={sortingModes.DEFAULT}>Not sorted CPU</option>
						<option value={sortingModes.ASCENDING}>Ascending</option>
						<option value={sortingModes.DESCENDING}>Descending</option>
				</select>
				<select 
					className='bg-[#4847474d] mx-1 px-4 py-1 rounded-xl hover:text-[black] hover:bg-[#d3caca7b]'
					value={selectedGpuSortingMode}
					onChange={(e) => setSelectedGpuSortingMode(e.target.value)}
				>
						<option value={sortingModes.DEFAULT}>Not sorted GPU</option>
						<option value={sortingModes.ASCENDING}>Ascending</option>
						<option value={sortingModes.DESCENDING}>Descending</option>
				</select>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-8 mx-10">
				{sortedComputersWithCpuAndGpuSorting.map((pc)=> (
					<PcPost 
						key={`PC-${pc.id}`} 
						pc={pc}
					/>))}
			</div>
		</div>
	</div>
	);
}