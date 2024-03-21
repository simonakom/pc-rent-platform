export async function savePc(pc, callback) {
	const promise = await fetch("/server/api/pc", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(pc),
	});

	const result = await promise.json();
	callback(result)
}

	export async function getAllPcs (callback){
		const promise = await fetch("/server/api/pc");
        const response = await promise.json();
        callback (response);
		// console.log(response)
	}