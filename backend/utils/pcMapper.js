function joinPcs(pcArray, pcArrayWithImages) {
	const setOfIds = new Set(pcArray.map((pc) => pc.id)); //all unique pc ids
	const arrayOfIds = Array.from(setOfIds); //create array of pc ids
	const pcs = arrayOfIds.map((id) => { //each uniqe id has pc 
		for (const pc of pcArray) if (pc.id === id) return pc; //unique pc
	});

	pcs.forEach((pc) => {
		pc.images = [];
		for (const pcWithImage of pcArrayWithImages) {
			if (
				pc.id === pcWithImage.id &&
				pcWithImage.image_uri &&
				pcWithImage.image_id
			)
				pc.images.push({
					uri: pcWithImage.image_uri,
					id: pcWithImage.image_id,
				});
		}
	});
	return pcs;
}

module.exports = joinPcs;