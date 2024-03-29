export async function getAllCountries(cb = (a) => a) {
	const promise = await fetch("/server/api/country"); //http://localhost:3000/api/country
	const response = await promise.json();
	cb(response);
	return response;
}