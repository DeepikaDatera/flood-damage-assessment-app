import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

const AssessmentPieChart = ({ counts }) => {
    const data = [
        { name: "Good", value: counts?.good || 0 },
        { name: "Moderate", value: counts?.moderate || 0 },
        { name: "Bad", value: counts?.bad || 0 },
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const getPercentage = (value) => {
        if (!total) return 0;
        return ((value / total) * 100).toFixed(0);
    };

    return (
        <div className="w-full bg-fieldClr rounded-lg p-4">
            <div className="relative h-64">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-white">{total}</span>
                    <span className="text-xs text-gray-400">Total</span>
                </div>
            </div>
            <div className="flex justify-around mt-4 text-sm">
                {data.map((item, index) => (
                    <div key={item.name} className="flex gap-2">
                        <div
                            className="w-2.5 h-2.5 mt-1 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                        />
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-400">{item.name}</span>
                            <span className="text-white font-semibold">
                                {getPercentage(item.value)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssessmentPieChart;