interface ButtonProps {
    text: string;
    children?: React.ReactNode;
}


const Button = ({
    text,
    children
}: ButtonProps) => {
    return ( 
        <button
            className="btn"
        >
            {text}
        </button>
    );
}
 
export default Button;