
export default function ParagraphBoldText({ children, className }) {
    return (
        <p className={`text-buttonClr font-semibold ${className}`}>{children}</p>
    )
}
