import clickImage from '../assets/screen.png'; 
import { useEffect, useMemo, useState, useRef } from "react";
import { getAllCountries } from "/utils/api/countriesApi";
import { register } from "../../utils/api/registerService";
import { checkSession } from "../../utils/api/sessions";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../src/ErrorMessage/ErrorMessage";

export default function RegistrationWindow(){
    const [countries, setCountries] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); 
    const [message, setMessage] = useState("");

    const userDetailsRef = useRef({
        username: "",
        password: "",
        email: "",
        birthDate: "",
        phone: "",
    });

    const addressDetailsRef = useRef({
        country: "",
        county: "",
        municipality: "",
        zipCode: "",
        city: "",
        street: "",
        streetNumber: "",
        apartmentNumber: "",
    });

    const countryInput = useRef(null)

    const navigate = useNavigate();
	useEffect(() => {
		getAllCountries((data) => {
			setCountries(data);
            addressDetailsRef.current.country = data[0].country;
            countryInput.current.value = data[0].country;
		});
        checkSession((data) => {
			if (data.isLoggedIn) {
				navigate("/");
			} else {
				console.log("user not registered");
			}
		});
	}, [navigate]);

    const checkboxInputRef = useRef (null);

    const sortedCountries = useMemo(() => {
		return countries.sort((a, b) => a.country.localeCompare(b.country));
	}, [countries]);

    function sendRegistrationDetails(e) {
        e.preventDefault();
        if(!checkboxInputRef.current.checked)
            return setErrorMessage("Please, agree with Terms and Conditions");

        //validations:
        // const username = userDetailsRef.current.username;
        // if (username.length < 5 || username.length > 20) {
        //     setErrorMessage("Username must be between 5 and 30 characters.");
        //     return; 
        // }
        // const password = userDetailsRef.current.password;
        // const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{5,30}$/;
        // if (!passwordRegex.test(password)) {
        //     alert("Password must be between 5 and 30 characters and contain at least one capital letter and one symbol.");
        //     return; 
        // }
        // const email = userDetailsRef.current.email;
        // if (email.length < 4 || email.length > 30) {
        //     alert("Email must be between 4 and 30 characters.");
        //     return; 
        // }

        // Clear error message if all validations pass
        setErrorMessage("");

        const registrationDetails = { ...userDetailsRef.current, ...addressDetailsRef.current };
        register(registrationDetails, (response)=>{
            setMessage(response.message);
            if (response.status) navigate("/");
            else {
                setMessage(response.message);
            }
        });
        console.log(registrationDetails);
    }

    const handleCloseError = () => {
        setErrorMessage(""); 
    };

    console.log("component reredered");
 
    return (
        <div className="register-bg fixed top-0 left-0 w-full h-full bg-cover bg-center flex flex-col justify-center items-center pt-10 pb-16 px-5">
            <div className="flex items-center gap-2 my-16 bg-[#adaaaa1e] rounded-full px-10 py-2">
                <img className="w-[40px]" src={clickImage} alt="click" />
                <h1 className="text-4xl text-[#ffffff]">Registration</h1>
            </div>
            <div className="min-w-[300px] sm:min-w-[400px] bg-[#1d1c1cd4] rounded-xl text-[white] p-10 overflow-y-scroll">
            {message && (
                <p className="bg-[#df595959] text-[#ffe7e7] text-center rounded-2xl my-5 py-1">{message}</p>
            )}
                <h1 className="text-xl sm:text-2xl font-medium mb-2 text-[white]">Personal details</h1>
                <hr className="mb-5 border-t-1 border-gray-500" />
                <form>
                    {errorMessage && <ErrorMessage message={errorMessage} onClose={handleCloseError} />}
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-1/5 mb-2 sm:mb-0">Username:</span>
                            <input 
                                // value={userDetailsRef.current.username}
                                onChange={(e) => {
                                    userDetailsRef.current.username = e.target.value;
                                }}
                                type="text"
                                placeholder="Enter your username..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-1/5 mb-2 sm:mb-0">Password:</span>
                            <input 
                                // value={userDetailsRef.current.password}
                                onChange={(e) => {
                                    userDetailsRef.current.password = e.target.value;
                                }}
                                type="password" 
                                placeholder="Enter your password..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-1/5 mb-2 sm:mb-0">Email:</span>
                            <input 
                                // value={userDetailsRef.current.email}
                                onChange={(e) => {
                                    userDetailsRef.current.email = e.target.value;
                                }}
                                type="email" 
                                placeholder="Enter your email..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-1/5 mb-2 sm:mb-0">Birth date:</span>
                            <input 
                                //  value={userDetailsRef.current.birthDate}
                                 onChange={(e) => {
                                     userDetailsRef.current.birthDate = e.target.value;
                                 }}
                                type="date" 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-1/5 mb-2 sm:mb-0">Phone:</span>
                            <input 
                                //  value={userDetailsRef.current.phone}
                                 onChange={(e) => {
                                     userDetailsRef.current.phone = e.target.value;
                                 }}
                                type="number" 
                                placeholder="Enter your phone number..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>

                    <h1 className="select-none text-xl font-medium mt-10 mb-3 text-[white]">Address details</h1>
                    <hr className="mb-5 border-t-1 border-gray-500" /> 
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-1/5 mb-2 sm:mb-0">Country:</span>
                            <select 
                                // value={addressDetailsRef.current.country}
                                ref = {countryInput}
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]"
                                onChange={(e) => addressDetailsRef.current.country = e.target.value}
							>
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
                            <span className="select-none w-full sm:w-1/5 mb-2 sm:mb-0">County:</span>
                            <input 
                                // value={addressDetailsRef.current.county}
                                onChange={(e) => addressDetailsRef.current.county = e.target.value}
                                type="text" 
                                placeholder="Enter your County..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]"/>
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-1/5 mb-2 sm:mb-0">Municipality:</span>
                            <input 
                                // value={addressDetailsRef.current.municipality}
                                onChange={(e) => addressDetailsRef.current.municipality = e.target.value}
                                type="text" 
                                placeholder="Enter your municipality..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2"> 
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-1/5 mb-2 sm:mb-0">Postal Code:</span>
                            <input 
                                // value={addressDetailsRef.current.zipCode}
                                onChange={(e) => addressDetailsRef.current.zipCode = e.target.value}
                                type="text"
                                placeholder="Enter your postal code..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-1/5 mb-2 sm:mb-0">City:</span>
                            <input 
                                // value={addressDetailsRef.current.city}
                                onChange={(e) => addressDetailsRef.current.city = e.target.value}
                                type="text" 
                                placeholder="Enter your city..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-1/5 mb-2 sm:mb-0">Street:</span>
                            <input 
                                // value={addressDetailsRef.current.street}
                                onChange={(e) => addressDetailsRef.current.street = e.target.value}
                                type="text" 
                                placeholder="Enter your street..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center gap-1">
                            <span className="select-none w-full sm:w-2/3 mb-2 sm:mb-0">Street number:</span>
                            <input 
                                // value={addressDetailsRef.current.streetNumber}
                                onChange={(e) => addressDetailsRef.current.streetNumber = e.target.value}
                                type="text"  
                                placeholder="Street number..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                            <span className="mr-3"></span>
                            <input 
                                // value={addressDetailsRef.current.apartmentNumber}
                                onChange={(e) => addressDetailsRef.current.apartmentNumber = e.target.value}
                                type="text" 
                                placeholder="Apartment number..." 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mt-10">
                        <label>
                            <input type="checkbox" ref={checkboxInputRef}   />
                            <span className="ml-2">Agree with Terms and Conditions </span>
                        </label>
                    </div>
                        <div className="flex flex-col items-center justify-center">
                        <button 
                            className="bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 mt-4"
                            onClick={e=>sendRegistrationDetails(e)}
                            >Register
                        </button>
                        <Link
                            to="/login"
                            className="block text-purple-100 hover:text-purple-300 mt-5"            
                            >Already have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}