import PropTypes from "prop-types";

export default function ErrorMessage({ message, onClose }) {
    const handleClick = () => {
        onClose(); 
    };

    return (
        <div className="bg-[#df595959] text-[#ffe7e7] text-center rounded-2xl my-5 py-1" onClick={handleClick}>
            {message}
        </div>
    );
}
ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired, 
};