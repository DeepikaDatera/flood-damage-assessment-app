const ModeTab = () => {
    const isOnline = navigator.onLine;

    return (
        <div
            className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm 
        ${isOnline
                    ? 'border-greenBorderClr text-greenTextClr'
                    : 'border-redBorderClr text-redTextClr'
                }
      `}
        >
            <div className={`w-2 h-2 rounded-full
        ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className="text-[10px]">
                {isOnline ? 'ONLINE MODE' : 'OFFLINE MODE'}
            </span>
        </div>
    );
};
export default ModeTab;