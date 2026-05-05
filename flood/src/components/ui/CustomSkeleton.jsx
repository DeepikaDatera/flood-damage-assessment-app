import { ConfigProvider, Skeleton } from "antd";

export default function CustomSkeleton({ isLoading, children }) {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Skeleton: {
                        gradientFromColor: "#1e3a5f",
                        gradientToColor: "#112030",
                    },
                },
            }}
        >
            <Skeleton active loading={isLoading} paragraph={{ rows: 5 }} >{children}</Skeleton>
        </ConfigProvider>
    )
}
