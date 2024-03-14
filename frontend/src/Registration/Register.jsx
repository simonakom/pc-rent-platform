import clickImage from '../assets/screen.png'; 
import { useEffect, useMemo, useState } from "react";
import { getAllCountries } from "/utils/api/countriesApi";
import { register } from "../../utils/api/registerService";
import { checkSession } from "../../utils/api/checkSession";
import { useNavigate } from "react-router-dom";

export default function RegistrationWindow(){
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        email: "",
        birthDate: "",
        phone: "",
    });
    const [addressDetails, setAddressDetails] = useState({
        country: "",
        county: "",
        municipality:"",
        zipCode:"",
        city:"",
        street:"",
        streetNumber:"",
        apartmentNumber:"",
    });

    const [countries, setCountries] = useState([]);

    const navigate = useNavigate();

	useEffect(() => {
		getAllCountries((data) => {
			setCountries(data);
		});
        checkSession((data) => {
			if (data.isLoggedIn) {
				navigate("/");
			} else {
				console.log("user not logged in");
			}
		});
	}, [navigate]);

    const sortedCountries = useMemo(() => {
		return countries.sort((a, b) => a.country.localeCompare(b.country));
	}, [countries]);

    function setFieldInUserDetails(e, field){
        const newObject = {...userDetails};
        newObject[field] = e.target.value;
        setUserDetails(newObject);
    }
	function sendRegistrationDetails() {
		const registrationDetails = { ...userDetails, ...addressDetails };
		register(registrationDetails);
		console.log(registrationDetails);
	}
    
    return (
        <div className="register-bg flex flex-col justify-center items-center overflow-y-scroll pt-10 pb-16 px-5">
            <div className="flex items-center gap-2 my-16 bg-[#adaaaa1e] rounded-full px-10 py-2">
                <img className="w-[40px]" src={clickImage} alt="click" />
                <h1 className="text-4xl text-[#ffffff]">Registration</h1>
            </div>
            <div className="min-w-[300px] sm:min-w-[400px] bg-[#1d1c1cd4] rounded-xl text-[white] p-10">
                <h1 className="text-xl sm:text-2xl font-medium mb-2 text-[white]">Personal details</h1>
                <hr className="mb-5 border-t-1 border-gray-500" />
                <form>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Username:</span>
                            <input 
                                value={userDetails.username}
                                onChange={(e)=>setFieldInUserDetails(e, "username")}
                                type="text"
                                placeholder="Enter your username..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Password:</span>
                            <input 
                                value={userDetails.password}
                                onChange={(e)=>setFieldInUserDetails(e, "password")}
                                type="password" 
                                placeholder="Enter your password..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Email:</span>
                            <input 
                                value={userDetails.email}
                                onChange={(e)=>setFieldInUserDetails(e, "email")}
                                type="email" 
                                placeholder="Enter your email..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Birth date:</span>
                            <input 
                                value={userDetails.birthDate}
                                onChange={(e)=>setFieldInUserDetails(e, "birthDate")}
                                type="date" 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Phone:</span>
                            <input 
                                value={userDetails.phone}
                                onChange={(e)=>setFieldInUserDetails(e, "phone")}
                                type="number" 
                                placeholder="Enter your phone number..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>

                <h1 className="text-xl font-medium mt-10 mb-3 text-[white]">Address details</h1>
                <hr className="mb-5 border-t-1 border-gray-500" /> 
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Country:</span>
                            <select 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]"
                                value={addressDetails.country}
                                onChange={(e) =>
									setAddressDetails({
										...addressDetails,
										country: e.target.value,
									})
								}>
                                    {sortedCountries.map((country) => (
                                        <option key={`country-${country.id}`}>
                                             {country.country}
                                        </option>
                                    ))}
                            </select>
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">County:</span>
                            <input 
                                value={addressDetails.county}
                                onChange={(e) =>
									setAddressDetails({
										...addressDetails,
										county: e.target.value,
									})
								}
                                type="text" 
                                placeholder="Enter your County..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]"/>
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Municipality:</span>
                            <input 
                                value={addressDetails.municipality}
                                onChange={(e) =>
									setAddressDetails({
										...addressDetails,
										municipality: e.target.value,
									})
								}
                                type="text" 
                                placeholder="Enter your municipality..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2"> 
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Postal Code:</span>
                            <input 
                                value={addressDetails.zipCode}
                                onChange={(e) =>
									setAddressDetails({
										...addressDetails,
										zipCode: e.target.value,
									})
								}
                                type="text"
                                placeholder="Enter your postal code..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">City:</span>
                            <input 
                                value={addressDetails.city}
                                onChange={(e) =>
									setAddressDetails({
										...addressDetails,
										city: e.target.value,
									})
								}
                                type="text" 
                                placeholder="Enter your city..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Street:</span>
                            <input 
                                value={addressDetails.street}
                                onChange={(e) =>
									setAddressDetails({
										...addressDetails,
										street: e.target.value,
									})
								}
                                type="text" 
                                placeholder="Enter your street..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center gap-1">
                            <span className="w-full sm:w-2/3 mb-2 sm:mb-0">Street number:</span>
                            <input 
                                value={addressDetails.streetNumber}
                                onChange={(e) =>
									setAddressDetails({
										...addressDetails,
										streetNumber: e.target.value,
									})
								}
                                type="text"  
                                placeholder="Street number..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                            <span className="mr-3"></span>
                            <input 
                                value={addressDetails.apartmentNumber}
                                onChange={(e) =>
									setAddressDetails({
										...addressDetails,
										apartmentNumber: e.target.value,
									})
								}
                                type="text" 
                                placeholder="Apartment number..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mt-10">
                        <label>
                            <input type="checkbox" required   />
                            <span className="ml-2">Agree with Terms and Conditions </span>
                        </label>
                    </div>
                        <div className="flex justify-center">
                        <button 
                            className="bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 mt-4"
                            onClick={sendRegistrationDetails}
                            >Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}