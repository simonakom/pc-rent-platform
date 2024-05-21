// import placeholder from '../src/assets/placeholder.jpg'; 
import placeholder from '../src/assets/macbook.jpg'; 

export default function PcPost({pc}) {
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