
const Button = ({ 
    type = "primary", 
    size = "md", 
    text="Submit", 
    handleClick 
}) => {
  return (
    <button 
        onClick={handleClick}
        className={`btn btn-${type} btn-${size} p-2`}
    >
        <span style={{ fontSize: "1.2rem"}}>{text}</span>
    </button>
  )
}

export default Button;