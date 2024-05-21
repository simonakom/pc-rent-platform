/* eslint-disable react-hooks/exhaustive-deps */
import clickImage from '../assets/screen.png'; 
import { useEffect, useRef, useState } from "react";
import { savePc } from "../../utils/api/pcService";
import ErrorMessage from "../../src/ErrorMessage/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

export default function AddPcForm(){
    const [errorMessage, setErrorMessage] = useState(""); 
    const navigate = useNavigate();
    console.log("Component rerenders");

    const pcNameInputRef = useRef(null);
    const cpuInputRef = useRef(null);
    const gpuInputRef = useRef(null);
    const computerTypeInputRef = useRef(null);
    const ramTypeInputRef = useRef(null);
    const ramSpeedInputRef = useRef(null);
    const ramAmountInputRef = useRef(null);
    const imageInputRef = useRef(null);

    useEffect(() => {
      pcNameInputRef.current.focus();

        const focusCPU = (e) => {
            if (e.key === "Enter") {
            cpuInputRef.current.focus();
            }
        };
        pcNameInputRef.current?.addEventListener("keydown", focusCPU);

        const focusGPU = (e) => {
            if (e.key === "Enter") {
                gpuInputRef.current.focus();
            }
        };
        cpuInputRef.current?.addEventListener("keydown", focusGPU);

        const focusPcType = (e) => {
        if (e.key === "Enter") {
            computerTypeInputRef.current.focus();
            }
        };
        gpuInputRef.current?.addEventListener("keydown", focusPcType);

        const focusRamType = (e) => {
            if (e.key === "Enter") {
                ramTypeInputRef.current.focus();
            }
        };
        computerTypeInputRef.current?.addEventListener("keydown", focusRamType);

        const focusRamSpeed = (e) => {
            if (e.key === "Enter") {
                ramSpeedInputRef.current.focus();
            }
        };
        ramTypeInputRef.current?.addEventListener("keydown", focusRamSpeed);

        const focusRamAmount = (e) => {
            if (e.key === "Enter") {
                ramAmountInputRef.current.focus();
            }
        };
        ramSpeedInputRef.current?.addEventListener("keydown", focusRamAmount);

        const focusImage = (e) => {
            if (e.key === "Enter") {
                imageInputRef.current.focus();
            }
        };
        ramAmountInputRef.current?.addEventListener("keydown", focusImage);

        const send = (e) => {
            if (e.key === "Enter") {
            e.preventDefault();
            registerNewPc(e);
            }
        };
        imageInputRef.current?.addEventListener("keydown", send);

    // Cleanup function to remove event listeners
    return () => {
        cpuInputRef.current?.removeEventListener("keydown", focusGPU);
        gpuInputRef.current?.removeEventListener("keydown", focusPcType);
        computerTypeInputRef.current?.removeEventListener("keydown", focusRamType);
        ramTypeInputRef.current?.removeEventListener("keydown", focusRamSpeed);
        ramSpeedInputRef.current?.removeEventListener("keydown", focusRamAmount);
        ramAmountInputRef.current?.removeEventListener("keydown", focusImage);
        imageInputRef.current?.removeEventListener("keydown", send);
    };
}, []);

    function registerNewPc(e){
        e.preventDefault();
        if (e.pageX === 0 && e.pageY === 0) return 

        const formData = new FormData();
        formData.append("pcName", pcNameInputRef.current.value);
		formData.append("cpu", cpuInputRef.current.value);
		formData.append("gpu", gpuInputRef.current.value);
        formData.append("pcType", computerTypeInputRef.current.value);
		formData.append("ramType", ramTypeInputRef.current.value);
		formData.append("ramSpeed", ramSpeedInputRef.current.value);
		formData.append("ramAmount", ramAmountInputRef.current.value);
		const files = imageInputRef.current.files;

        for (let i = 0; i < files.length; i++){
            formData.append("files", files[i]);
        }

          // validations:
          const cpu = cpuInputRef.current.value;
          if (cpu.length < 2 || cpu.length > 20) {
              setErrorMessage("CPU must be between 2 and 10 characters.");
              return; 
          }
          else if (
            !pcNameInputRef.current.value ||
            !cpuInputRef.current.value ||
            !gpuInputRef.current.value ||
            !computerTypeInputRef.current.value ||
            !ramTypeInputRef.current.value ||
            !ramSpeedInputRef.current.value ||
            !ramAmountInputRef.current.value ||
            !imageInputRef.current.value
        ) {
            setErrorMessage("Please, fill all fields and select a PC image.");
            return;
        }

        savePc(formData, (response) => {
			if (response.status) navigate("/");
			else {
				setErrorMessage("Addition to database was unsuccessful");
			}
		});
    }

    const handleCloseError = () => {
      setErrorMessage(""); 
  };

    const handleEnterKeyForSelect = (e, selectRef) => {
      if (e.key === "Enter" && selectRef && selectRef.current) {
          e.preventDefault();
          const options = selectRef.current.getElementsByTagName('option');
          const optionsLength = options.length;
          if (optionsLength > 0) {
              selectRef.current.size = optionsLength;
              selectRef.current.focus();
          }
      }
    };

    return (
        <div className="add-pc-bg flex flex-col items-center overflow-y-scroll pt-10 px-6">
             <div className='flex align-center mt-10'> 
				<img className="w-[80px] md:mt-0 mb-5" src={clickImage} alt="click" />
				<p className='text-[#f2634a] text-6xl mt-2'>Rentify</p>
			</div>
            <div className="flex items-center gap-2 mb-20 bg-[#adaaaa1e] rounded-full px-10 py-2 ms-10">
                <h1 className="text-4xl text-[#ffffff]">Add Pc Form</h1>
            </div>
            <div className="min-w-[300px] sm:min-w-[500px] bg-[#1d1c1ce0] rounded-xl text-[white] p-10">
            {/* {message && (
                <p className="bg-[#df595959] text-[#ffe7e7] text-center rounded-2xl my-5 py-1">{message}</p>
            )} */}
                <h1 className="text-xl sm:text-2xl font-medium mb-2 text-[white]">PC details</h1>
                <hr className="mb-5 border-t-1 border-gray-500" />
                <form>
                    {errorMessage && <ErrorMessage message={errorMessage} onClose={handleCloseError} />}
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-2/6 mb-2 sm:mb-0">PC name:</span>
                            <input 
                                ref={pcNameInputRef}
                                type="text"
                                placeholder="Enter title..." 
                                onKeyDown={(e) => handleEnterKeyForSelect(e, pcNameInputRef)}
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-2/6 mb-2 sm:mb-0">Processor:</span>
                            <input 
                                ref={cpuInputRef}
                                type="text"
                                placeholder="Enter CPU..." 
                                onKeyDown={(e) => handleEnterKeyForSelect(e, gpuInputRef)}
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-2/6 mb-2 sm:mb-0">Graphic card:</span>
                            <input 
                                ref={gpuInputRef}
                                type="text" 
                                placeholder="Enter GPU..." 
                                onKeyDown={(e) => handleEnterKeyForSelect(e, computerTypeInputRef)}
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-2/6 mb-2 sm:mb-0">PC type:</span>
                            <select 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]"
                                ref={computerTypeInputRef}
                                onKeyDown={(e) => handleEnterKeyForSelect(e, ramTypeInputRef)}
                                >
                                <option>Macbook</option>
                                <option>Laptop</option>
                                <option>Desktop Computer</option>
                            </select>
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-2/6 mb-2 sm:mb-0">RAM type:</span>
                            <select 
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]"     
                                ref={ramTypeInputRef}
                                onKeyDown={(e) => handleEnterKeyForSelect(e, ramSpeedInputRef)}
                                >
                                <option>DDR</option>
                                <option>DDR2</option>
                                <option>DDR3</option>
                                <option>DDR4</option>
                                <option>DDR5</option>
                            </select>
                        </label>
                    </div>
                    <div className="mb-2">
                    <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-2/6 mb-2 sm:mb-0">RAM speed:</span>
                            <input 
                                ref={ramSpeedInputRef}
                                type="number" 
                                placeholder="Enter RAM (Mhz)..." 
                                onKeyDown={(e) => handleEnterKeyForSelect(e, ramAmountInputRef)}
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-2/6 mb-2 sm:mb-0">RAM amount:</span>
                            <input 
                                ref={ramAmountInputRef}
                                type="number" 
                                placeholder="Enter RAM (GB)..." 
                                onKeyDown={(e) => handleEnterKeyForSelect(e, imageInputRef)}
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex flex-col sm:flex-row items-center">
                            <span className="select-none w-full sm:w-2/6 mb-2 sm:mb-0">Pc images:</span>
                            <input 
                                ref={imageInputRef} 
                                type="file"
                                accept=".jpg,.png" 
                                placeholder="Enter RAM (GB)..." 
                                onKeyDown={(e) => handleEnterKeyForSelect(e, imageInputRef)}
                                multiple
                                onChange={(e) => {
                                    if (e.target.files.length > 2){
                                        setErrorMessage("Maximum file choose: 2");
                                        e.target.value = ""
                                    }
                                }}
                                className="outline-none w-full sm:w-4/5 px-2 py-1" />
                        </label>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button 
                            className="bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 mt-4"
                            onClick={e=>registerNewPc(e)}
                            >Add new PC
                        </button>
                        <Link
                            to="/"
                            className="block md:inline-block bg-[#331c39] hover:bg-purple-800 rounded text-white px-5 py-1 text-center overflow-hidden mt-4"
                            style={{ maxWidth: "200px" }}
                        >
                            Home
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
