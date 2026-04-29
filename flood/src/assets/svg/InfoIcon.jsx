

const InfoIcon = ({ className = "w-5 h-5 text-blue-400" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        className={className}
    >
        <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
        />
        <line
            x1="12"
            y1="10"
            x2="12"
            y2="16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <circle
            cx="12"
            cy="7"
            r="1.5"
            fill="currentColor"
        />
    </svg>

)
export default InfoIcon
