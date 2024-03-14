import clickImage from '../assets/screen.png'; 
function AuthButtons() {
	return (
		<div className="mt-3 flex flex-col md:flex-row md:justify-start gap-4 whitespace-nowrap">
		<img className="w-[60px] md:mt-0" src={clickImage} alt="click" />
		<div className='mt-5 md:mt-0'>
			<a href="/registration" className="block md:inline-block bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 mb-2 md:mr-5 md:mb-0 text-center md:text-left overflow-hidden" style={{ maxWidth: "200px" }}>
				Register now
			</a>
			<a href="/login" className="block md:inline-block bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 text-center md:text-left overflow-hidden" style={{ maxWidth: "200px" }}>
				Log In
			</a>
		</div>
	</div>
	);
}

function PcPost() {
	return (
		<div className="flex justify-center items-center pb-7">
			<div className="bg-slate-300 min-h-[300px] min-w-[100px] max-w-[250px]">
				<div className="img">
					<img src="https://cdn.mos.cms.futurecdn.net/n8Lzn5As39dfVhwVt7cRb9-1200-80.jpeg" className="w-full"/>
				</div>
				<div className="details p-4 w-fit mx-auto">
					<a href="/pc1">
						<h3 className="title text-xl mb-2 border-b-4 border-[#66305f] w-fit pr-4">PC title</h3>
					</a>
					<div className="text-xs">
						<div className="flex flex-wrap gap-x-4 mb-1">
							<span className="inline-block w-1/3 font-bold">
								Specification:
							</span>
							<span>content content</span>
						</div>
						<div className="flex flex-wrap gap-x-4 mb-1">
							<span className="inline-block w-1/3 font-bold">
								Specification:
							</span>
							<span>content content</span>
						</div>
						<div className="flex flex-wrap gap-x-4 mb-1">
							<span className="inline-block w-1/3 font-bold">
								Specification:
							</span>
							<span>content content</span>
						</div>
						<div className="flex flex-wrap gap-x-4 mb-1">
							<span className="inline-block w-1/3 font-bold">
								Specification:
							</span>
							<span>content content</span>
						</div>
						<div className="flex flex-wrap gap-x-4 mb-1">
							<span className="inline-block w-1/3 font-bold">
								Specification:
							</span>
							<span>content content</span>
						</div>
						<div className="flex flex-wrap gap-x-4 mb-1">
							<span className="inline-block w-1/3 font-bold">
								Specification:
							</span>
							<span>content content</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Main() {
	const isLoggedIn = false;
	return (
		<div className="main-bg flex justify-center overflow-y-scroll  pt-10 pb-16 px-5">
		<div className="container md:w-[80%] lg:w-[85%] xl:w-[95%] bg-[#131313b6] min-h-[700px] rounded-2xl p-6">
			<div className="mx-10 mb-4 md:mb-6 lg:mb-8 xl:mb-10">
				{!isLoggedIn && <AuthButtons />}
				{isLoggedIn && (
					<a href="/add-new-pc" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
						Add a rent</a>
					)}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-8 mx-10">
				<PcPost /> 
				<PcPost />
				<PcPost />
				<PcPost />
				<PcPost />
				<PcPost />
				<PcPost />
				<PcPost />
				<PcPost />
			</div>
		</div>
	</div>
);
}