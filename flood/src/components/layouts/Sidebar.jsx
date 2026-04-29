import { ConfigProvider, Menu } from 'antd'
import { Link } from 'react-router-dom';
import DashboardSvg from '../../assets/svg/DashboardSvg';
import PlusSvg from '../../assets/svg/PlusSvg';
import ParagraphText from '../ui/ParagraphText';
import { useLocation } from "react-router-dom";
import { ExitDoorIcon } from '../../assets/svg/ExitDoorIcon';
import ModeTab from './ModeTab';


export default function Sidebar({ setOpenDrawer }) {
    const location = useLocation();

    const getSelectedKey = () => {
        if (location.pathname.startsWith("/dashboard")) return "1";
        if (location.pathname.startsWith("/new-assessment")) return "2";
        return "1";
    };

    const handleMenuClick = () => {
        setOpenDrawer && setOpenDrawer(false);
    }
    const items = [
        {
            key: '1',
            label: <Link to="/dashboard" onClick={handleMenuClick} className="flex items-center gap-2"><DashboardSvg /> Dashboard</Link>,
        },
        {
            key: '2',
            label: (
                <Link to="/new-assessment" onClick={handleMenuClick} className="flex items-center gap-2">
                    <PlusSvg /> New Assessment
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link to="/" className="flex items-center gap-2">
                    <ExitDoorIcon /> Exit
                </Link>
            ),
        },
    ];
    return (
        <div className=" w-full sm:w-64 h-full flex border-r border-gray-700 bg-bgBlue  flex-col px-3 py-4 gap-3">
            <div className="text-xl font-semibold text-white py-2">
                <ParagraphText className={"text-xs font-normal"}>MADISON COUNTY NC</ParagraphText>
                FloodAssess
            </div>
            <div className='px-1'>
                <ModeTab />
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            colorBgContainer: "#0a1628",
                            itemSelectedBg: '#00d4ff18',
                            itemSelectedColor: '#00d4ff',
                            itemColor: '#7da3c0',
                            itemHoverBg: '#162d52',
                            itemActiveBg: '#162d52',
                            itemHoverColor: '#00d4ff',

                        },
                    },
                }}
            >
                <Menu
                    className="flex-1 overflow-auto mt-1"
                    selectedKeys={[getSelectedKey()]}
                    mode="inline"
                    items={items}
                />
            </ConfigProvider>
        </div>
    )
}
