import { Spin } from "antd";

export default function PrimaryButton({ children, onClick, className, type, isLoading }) {
    return (
        <button type={type ?? 'submit'} className={`text-lg font-semiBold px-4 py-3 rounded-lg cursor-pointer flex items-center justify-center w-full bg-buttonClr ${className || ''}`} onClick={onClick} disabled={isLoading}>
            {isLoading ? <Spin /> : children}
        </button>
    )
}
