import { useState } from "react";
import clickImage from '../assets/click.png'; 

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
        postalCode:"",
        city:"",
        street:"",
        streetNumber:"",
        apartamentNumber:"",
    })
    function setFieldInUserDetails(e, field){
        const newObject = {...userDetails};
        newObject[field] = e.target.value;
        console.log(newObject);
        setUserDetails(newObject);
    }
    function setFieldInAddressDetails(e, field){
        const newObject = {...addressDetails};
        newObject[field] = e.target.value;
        setAddressDetails(newObject);
    }
    function setNumberField(e, field, maxNumber=100) {
        if(+e.target.value > maxNumber) 
            return;
        if (+e.target.value || e.target.value === "")
        setFieldInAddressDetails( e, field)
    }
    
    return (
        <div className="register-bg flex flex-col justify-center items-center overflow-y-scroll pt-10 pb-16 px-5">
            <div className="flex items-center gap-5 my-5">
                <img className="w-[60px] mb-4" src={clickImage} alt="click" />
                <h1 className="text-4xl text-white">Registration</h1>
            </div>
            <div className="min-w-[300px] sm:min-w-[400px] bg-[#000000b3] p-5 rounded-xl text-[white] p-10">
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
                                className="outline-none border w-4/5 px-2 py-1 rounded-md" />
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
                                className="outline-none border w-4/5 px-2 py-1 rounded-md" />
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
                                className="outline-none border w-4/5 px-2 py-1 rounded-md" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Birth date:</span>
                            <input 
                                value={userDetails.birthDate}
                                onChange={(e)=>setFieldInUserDetails(e, "birthDate")}
                                type="date" 
                                className="outline-none border w-4/5 px-2 py-1 rounded-md" />
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
                                className="outline-none border w-4/5 px-2 py-1 rounded-md" />
                        </label>
                    </div>

                <h1 className="text-xl font-medium mt-10 mb-3 text-[white]">Address details</h1>
                <hr className="mb-5 border-t-1 border-gray-500" /> 
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Country:</span>
                            <select 
                                value={addressDetails.country}
                                onChange={(e)=>setFieldInAddressDetails(e,"country")}
                                className="outline-none border w-4/5 px-2 py-1 rounded-md">
                                    <option>Lithuania</option>
                                    <option>Latvia</option>
                                    <option>United Kingdom</option>
                            </select>
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">County:</span>
                            <input 
                                value={addressDetails.county}
                                onChange={(e)=>setFieldInAddressDetails(e,"county")}
                                type="text" 
                                placeholder="Enter your County..." 
                                className="outline-none border w-4/5 px-2 py-1 rounded-md"/>
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Municipality:</span>
                            <input 
                                value={addressDetails.municipality}
                                onChange={(e)=>setFieldInAddressDetails(e,"municipality")}
                                type="text" 
                                placeholder="Enter your municipality..." 
                                className="outline-none border w-4/5 px-2 py-1 rounded-md" />
                        </label>
                    </div>
                    <div className="mb-2"> 
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Postal Code:</span>
                            <input 
                                value={addressDetails.postalCode}
                                onChange={(e)=>setFieldInAddressDetails(e,"postalCode")}
                                type="text"
                                placeholder="Enter your postal code..." 
                                className="outline-none border w-4/5 px-2 py-1 rounded-md" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">City:</span>
                            <input 
                                value={addressDetails.city}
                                onChange={(e)=>setFieldInAddressDetails(e,"city")}
                                type="text" 
                                placeholder="Enter your city..." 
                                className="outline-none border w-4/5 px-2 py-1 rounded-md" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Street:</span>
                            <input 
                                value={addressDetails.street}
                                onChange={(e)=>setFieldInAddressDetails(e,"street")}
                                type="text" 
                                placeholder="Enter your street..." 
                                className="outline-none border w-4/5 px-2 py-1 rounded-md" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center gap-2">
                            <span className="w-full sm:w-1/3 mb-2 sm:mb-0">Street number:</span>
                            <input 
                                value={addressDetails.streetNumber}
                                onChange={(e)=> {setNumberField( e, "streetNumber", 400) }}
                                type="text"  
                                placeholder="Street number..." 
                                className="outline-none border w-3/5 px-2 py-1 rounded-md" />
                            <span className="mr-3"></span>
                            <input 
                                value={addressDetails.apartamentNumber}
                                onChange={(e)=> {setNumberField( e, "apartamentNumber", 400) }}
                                type="text" 
                                placeholder="Apartment number..." 
                                className="outline-none border w-3/6 px-2 py-1 rounded-md" />
                        </label>
                    </div>
                    <div className="mt-10">
                        <label>
                            <input type="checkbox" required   />
                            <span className="ml-2">Agree with Terms and Conditions </span>
                        </label>
                    </div>
                        <div className="flex justify-center">
                        <button className="bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 mt-4">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}