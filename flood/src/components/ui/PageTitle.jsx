
export default function PageTitle({ title, subtitle }) {
    const userEmail = sessionStorage.getItem("userEmail")
    return (
        <div className='border-b border-gray-700 p-4 flex justify-between items-center mt-20 sm:mt-0'>
            <div>
                <p className='text-white text-xl font-semibold '>{title}</p>
                <p className='text-subTitleClr text-sm'>{subtitle}</p>
            </div>
            <p className='text-subTitleClr text-sm'>{userEmail ?? "Guest User"} </p>
        </div>
    )
}
