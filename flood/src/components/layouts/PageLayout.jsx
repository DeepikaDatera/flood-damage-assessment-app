import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

const PageLayout = () => {
    return (
        <div className="flex flex-col sm:flex-row min-h-screen">
            <MobileHeader />
            <div className='hidden sm:block'>
                <Sidebar />
            </div>
            <div className="flex-1 bg-bgBlue flex flex-col">
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default PageLayout;