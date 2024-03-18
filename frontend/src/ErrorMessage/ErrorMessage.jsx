import PropTypes from "prop-types";

export default function ErrorMessage({ message, onClose }) {
    const handleClick = () => {
        onClose(); 
    };

    return (
        <div className="bg-[#e1574a7e] text-[#ffe7e7] px-4 py-2 rounded-2xl my-5" onClick={handleClick}>
            {message}
        </div>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired, 
};