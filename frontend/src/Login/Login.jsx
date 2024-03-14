import clickImage from '../assets/screen.png'; 
export default function LoginPage() {
	return (
		<div className="login-bg w-[100vw] h-[100vh] flex flex-col items-center overflow-y-scroll px-3">
            <div className="flex items-center gap-2 mb-20 mt-28 bg-[#adaaaa1e] rounded-full px-10 py-2">
                <img className="w-[40px]" src={clickImage} alt="click" />
                <h1 className="text-4xl text-[#ffffff]">Login</h1>
            </div>
		<div className="w-full sm:max-w-[500px] bg-[#1d1c1cd4] py-12 px-8 rounded-xl">
            <form className='overflow-hidden text-white'>
                <div className="mb-3">
                    <label className="flex flex-col sm:flex-row items-center">
                        <span className="w-full sm:w-1/5 mb-2 sm:mb-0">Username</span>
                        <input
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
                            type="password"
                            placeholder="Enter your password..."
                            className="outline-none border-[1px] border-[#6a646a60] w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]"
                        />
                    </label>
                </div>
                <div className="flex justify-center">
                    <button className="bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 mt-4">Log in</button>
                </div>
            </form>
        </div>
        </div>
    );
}