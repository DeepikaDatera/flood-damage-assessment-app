
export default function OutlineButton({ children, className, onClick }) {
    return (
        <button type={"button"} className={`text-lg font-semiBold px-4 py-2 rounded-lg cursor-pointer w-full border bg-menuSelectedClr border-buttonClr text-buttonClr ${className || ''}`} onClick={onClick}>
            {children}
        </button>
    )
}
