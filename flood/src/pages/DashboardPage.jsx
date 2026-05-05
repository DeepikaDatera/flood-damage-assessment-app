import { ConfigProvider, Tabs } from 'antd'
import React from 'react'
import PageTitle from "../components/ui/PageTitle";
import Dashboard from '../components/dashboard/Dashboard';

export default function DashboardPage() {
    const [activeKey, setActiveKey] = React.useState('1');
    const items = [
        { key: '1', label: 'All Assessments', children: <Dashboard status={"all"} /> },
        { key: '2', label: 'My Assessments', children: <Dashboard status={"mine"} /> },
    ];
    const onChange = key => {
        setActiveKey(key)
    };
    const token = sessionStorage.getItem("token")
    return (
        <>
            <PageTitle title={"Assessment Dashboard"} subtitle={new Date().toDateString()} />
            {
                !token ? <div className='px-4'><Dashboard status={"all"} /></div> :
                    <div className='px-4'>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Tabs: {
                                        itemSelectedColor: '#00e5ff',
                                        inkBarColor: '#00e5ff',
                                        itemHoverColor: '#00e5ff',
                                        horizontalItemGutter: 32,
                                        itemActiveColor: '#00e5ff',
                                        cardBg: '#112030',
                                        horizontalItemPaddingLG: '12px 24px',
                                    },
                                },
                                token: {
                                    colorText: '#5a7fa0',
                                    colorBorderSecondary: '#1e3a5f',
                                    colorBgContainer: '#0a1625',
                                    fontSize: 14,
                                    fontWeightStrong: 600,
                                }
                            }}
                        >
                            <Tabs onChange={onChange} className='w-full flex-1 px-4' activeKey={activeKey} items={items} />
                        </ConfigProvider>
                    </div>
            }

        </>
    )
}
