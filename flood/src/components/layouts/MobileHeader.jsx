

import React, { useState } from 'react'

import hamburgIcon from '../../assets/svg/hamburg-icon.svg'

import { ConfigProvider, Drawer } from 'antd'

import Sidebar from './Sidebar'
import ParagraphText from '../ui/ParagraphText'
import ModeTab from './ModeTab'

const MobileHeader = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const showDrawer = () => {
        setOpenDrawer(prev => !prev);
    };

    return (
        <div className='bg-bgBlue p-3 border-b border-b-gray-700 fixed z-10 w-full sm:hidden'>
            <div className="flex items-center justify-between gap-4 relative">
                <div className='flex items-center gap-4'>
                    <figure className="flex items-center cursor-pointer" onClick={showDrawer}>
                        <img src={hamburgIcon} alt="Logo" className="w-7 h-7" />
                    </figure>
                    <div className="text-lg font-semibold text-white py-2">
                        FloodAssess
                        <ParagraphText className={"text-[8px] font-normal"}>MADISON COUNTY NC</ParagraphText>
                    </div>
                </div>
                <ModeTab />
            </div>
            <ConfigProvider theme={{
                components: {
                    Drawer: {
                        colorBgElevated: "#0a1628",
                    }
                }
            }}>
                <Drawer placement="left" onClose={showDrawer} open={openDrawer} className='bg-amber-200' size='default' bodyStyle={{ padding: 0 }}
                    closeIcon={<span style={{ color: "#fff", fontSize: "18px" }}>✕</span>}
                >
                    <Sidebar setOpenDrawer={setOpenDrawer} />
                </Drawer>
            </ConfigProvider>
        </div>
    )
}

export default React.memo(MobileHeader)