
export default function ParagraphText({ children, className }) {
    return (
        <p className={`text-subTitleClr ${className || ''}`}>{children}</p>
    )
}
