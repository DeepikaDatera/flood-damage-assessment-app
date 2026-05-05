
export function H1Title({ children, className }) {
    return (
        <h1 className={`text-white text-4xl font-semibold ${className && className}`}>{children}</h1>
    )
}



export function H2Title({ children }) {
    return (
        <h1 className='text-white text-2xl font-semibold'>{children}</h1>
    )
}
