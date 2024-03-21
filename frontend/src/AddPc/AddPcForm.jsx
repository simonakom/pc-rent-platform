import clickImage from '../assets/screen.png'; 
import { useEffect, useRef } from "react";

export default function AddPcForm(){
    console.log("Component rerenders");

    const cpuInputRef = useRef(null);
    const gpuInputRef = useRef(null);
    const computerTypeInputRef = useRef(null);
    const ramTypeInputRef = useRef(null);
    const ramSpeedInputRef = useRef(null);
    const ramAmountInputRef = useRef(null);


    useEffect(() => {
        cpuInputRef.current.focus();
        cpuInputRef.current.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            gpuInputRef.current.focus();
          }
        });
        gpuInputRef.current.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              computerTypeInputRef.current.focus();
            }
          });
          computerTypeInputRef.current.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                ramTypeInputRef.current.focus();
              }
            });
          ramTypeInputRef.current.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              ramSpeedInputRef.current.focus();
            }
          });
          ramSpeedInputRef.current.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              ramAmountInputRef.current.focus();
            }
          });
          ramAmountInputRef.current.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              registerNewPc(e);
            }
          });
        }, []);

    function registerNewPc(e){
        e.preventDefault();
        const newPcObject = {
            cpu: cpuInputRef.current.value,
            gpu: gpuInputRef.current.value,
            ramType: ramAmountInputRef.current.value,
            ramSpeed: ramSpeedInputRef.current.value,
            ramAmount: ramAmountInputRef.current.value,
            pcType: computerTypeInputRef.current.value,
          };
          console.log(newPcObject);
    }
    const handleEnterKeyForSelect = (e, selectRef, buttonRef) => {
        if (e.key === "Enter") {
          e.preventDefault();
          selectRef.current.size = selectRef.current.length; 
          selectRef.current.focus();
          buttonRef.current.focus(); 
        }
      };

    return (
        <div className="add-pc-bg flex flex-col items-center overflow-y-scroll pt-10">
            <div className="flex items-center gap-2 my-16 bg-[#adaaaa1e] rounded-full px-10 py-2">
                <img className="w-[40px]" src={clickImage} alt="click" />
                <h1 className="text-4xl text-[#ffffff]">Add PC From</h1>
            </div>
            <div className="min-w-[300px] sm:min-w-[500px] bg-[#1d1c1ce0] rounded-xl text-[white] p-10">
            {/* {message && (
                <p className="bg-[#df595959] text-[#ffe7e7] text-center rounded-2xl my-5 py-1">{message}</p>
            )} */}
                <h1 className="text-xl sm:text-2xl font-medium mb-2 text-[white]">PC details</h1>
                <hr className="mb-5 border-t-1 border-gray-500" />
                <form>
                    {/* {errorMessage && <ErrorMessage message={errorMessage} onClose={handleCloseError} />} */}
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
                                placeholder="Enter RAM (Mhz)..." 
                                onKeyDown={(e) => handleEnterKeyForSelect(e, ramAmountInputRef)}
                                className="outline-none border-[1px] border-slate-800 w-full sm:w-4/5 px-2 py-1 rounded-md bg-[#88828860]" />
                        </label>
                    </div>
                        <div className="flex flex-col items-center justify-center">
                        <button 
                            className="bg-[#60346b] hover:bg-purple-800 rounded text-white px-8 py-2 mt-4"
                            onClick={e=>registerNewPc(e)}
                            >Add new PC
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}