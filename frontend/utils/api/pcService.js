export async function savePc(pc, callback) {
	const promise = await fetch("/server/api/pc", {
		method: "post",
		// headers: {
		// 	"Content-Type": "multipart/form-data",
		// }, //no content type bc its form-data by default
		//body: JSON.stringify(pc), // no strigify
		body: pc,
	});
	const result = await promise.json();
	callback(result)
}

	export async function getAllPcs (callback){
		const promise = await fetch("/server/api/pc");
        const response = await promise.json();
        callback (response);
	}
	export async function getById(id, callback){
		const promise = await fetch(`/server/api/pc/${id}`);
        const response = await promise.json();
        callback (response);
	}
	export async function getMyPcs(callback) {
		const promise = await fetch("/server/api/pc/my-computers");
		const response = await promise.json();
		callback(response);
	}