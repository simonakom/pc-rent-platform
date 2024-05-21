import clickImage from '../assets/screen.png'; 
import { useEffect, useState, useRef } from "react";
import { checkSession} from "../../utils/api/sessions";
import { login } from "/utils/api/loginService";
import { Link, useNavigate } from "react-router-dom";
export default function LoginPage() {
	const [message, setMessage] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        checkSession((data) => {
			if (data.isLoggedIn) {
				navigate("/");
			} else {
				console.log("user  not logged in");
			}
		});
	}, [navigate]);

    function logIn(e) {
		e.preventDefault();
		login(loginInfo.current, (resp) => {
			setMessage(resp.message);
			if (resp.status) {
				navigate("/");
			}
			console.log(resp);
		});
	}
	console.log("component reredered");
    const loginInfo = useRef({ username: "", password: "" });

	return (
		<div className="login-bg w-[100vw] h-[100vh] flex flex-col items-center overflow-y-scroll px-3">
            <div className="flex items-center gap-2 mb-20 mt-24 bg-[#adaaaa1e] rounded-full px-10 py-2">
                <img className="w-[40px]" src={clickImage} alt="click" />
                <h1 className="text-4xl text-[#ffffff]">Login</h1>
            </div>
            <div className="w-full sm:max-w-[500px] bg-[#1d1c1cd4] pb-12 pt-6 px-8 rounded-xl">
                {message && (
                    <p className="bg-[#df595959] text-[#ffe7e7] text-center rounded-2xl my-5 py-1">{message}</p>
                )}
                <form className='overflow-hidden text-white'>
                    <div className="mb-3">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Username</span>
                            <input
                                onChange={(e) => {
                                    loginInfo.current.username = e.target.value;
                                }}
                                type="text"
                                placeholder="Enter your username..."
                                className="outline-none border-[1px] border-[#6a646a60] w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]"
                            />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Password</span>
                            <input
                                onChange={(e) => {
                                    loginInfo.current.password = e.target.value;
                                }}
                                type="password"
                                placeholder="Enter your password..."
                                className="outline-none border-[1px] border-[#6a646a60] w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]"
                            />
                        </label>
                    </div>
                    <div className="flex flex-col text-center justify-center items-center">
                        <button 
                            className="bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 mt-4"
                            onClick={logIn}
                            >Log in
                        </button>
                        <Link
                            to="/registration"
                            className="block text-purple-100 hover:text-purple-300 mt-5"            
                            >Still dont have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}