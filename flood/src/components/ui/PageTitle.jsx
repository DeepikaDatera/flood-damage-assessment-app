
export default function PageTitle({ title, subtitle }) {
    return (
        <div className='border-b border-gray-700 p-4'>
            <p className='text-white text-xl font-semibold '>{title}</p>
            <p className='text-subTitleClr text-sm'>{subtitle}</p>
        </div>
    )
}
