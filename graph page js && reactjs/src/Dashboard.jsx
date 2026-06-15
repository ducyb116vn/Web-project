const Dashboard = () => {
    const dashboardData = [
        {
            title: "Total Revenue",
            value: "$42,847",
            desc: "Monthly revenue increased by 23% compared to last month.",
            icon: "fa-chart-bar",
            renderChart: () => (
                <div className="h-16 w-full rounded relative">
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end gap-1 px-2 pb-2">
                        <div className="w-full bg-neon-cyan/20 h-[40%] rounded-sm"></div>
                        <div className="w-full bg-neon-cyan/40 h-[60%] rounded-sm"></div>
                        <div className="w-full bg-neon-cyan/60 h-[30%] rounded-sm"></div>
                        <div className="w-full bg-neon-cyan/80 h-[80%] rounded-sm"></div>
                        <div className="w-full bg-neon-cyan h-[50%] rounded-sm"></div>
                    </div>
                </div>
            )
        },
        {
            title: "Active Users",
            value: "18.5K",
            desc: "Real-time analytics showing active users.",
            icon: "fa-users",
            renderChart: () => (
                <div className="h-16 w-full rounded relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0 30 Q 20 10 40 25 T 100 15" fill="none" stroke="#00ffcc" strokeWidth="2" />
                        <path d="M0 30 Q 20 10 40 25 T 100 15 V 40 H 0 Z" fill="rgba(0, 255, 204, 0.1)" />
                    </svg>
                </div>
            )
        },
        {
            title: "Conversion Rate",
            value: "94.3%",
            desc: "Customer satisfaction rate based on recent surveys.",
            icon: "fa-bullseye",
            renderChart: () => (
                <div className="h-16 w-full flex items-center gap-1">
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[94%] bg-gradient-to-r from-neon-cyan to-neon-blue"></div>
                    </div>
                </div>
            )
        },
        {
            title: "Performance",
            value: "7,392",
            desc: "Overall system performance optimal.",
            icon: "fa-rocket",
            renderChart: () => (
                <div className="h-16 w-full flex justify-between items-end pb-2 px-1">
                    <div className="w-2 bg-neon-pink/30 h-[30%] rounded-full"></div>
                    <div className="w-2 bg-neon-pink/50 h-[50%] rounded-full"></div>
                    <div className="w-2 bg-neon-pink/70 h-[70%] rounded-full"></div>
                    <div className="w-2 bg-neon-pink h-[90%] rounded-full"></div>
                    <div className="w-2 bg-neon-pink h-[60%] rounded-full"></div>
                    <div className="w-2 bg-neon-pink/40 h-[40%] rounded-full"></div>
                </div>
            )
        },
        {
            title: "Monthly Growth",
            value: "+28.5%",
            desc: "Consistent month-over-month growth.",
            icon: "fa-money-bill-trend-up",
            renderChart: () => (
                <div className="h-16 w-full rounded relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0 35 L 20 25 L 40 30 L 60 15 L 80 20 L 100 5" fill="none" stroke="#ff8e53" strokeWidth="2" />
                        <circle cx="100" cy="5" r="2" fill="#ff8e53" />
                    </svg>
                </div>
            )
        },
        {
            title: "System Uptime",
            value: "99.9%",
            desc: "Exceptional reliability with minimal downtime.",
            icon: "fa-bolt",
            renderChart: () => (
                <div className="h-16 w-full flex items-center">
                    <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden flex">
                        <div className="h-full w-[99.9%] bg-gradient-to-r from-neon-cyan to-neon-blue"></div>
                        <div className="h-full w-[0.1%] bg-red-500"></div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section id="dashboard" className="py-20 px-6 bg-gradient-to-b from-dark to-[#0f1329]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold mb-10 text-center text-gradient">Dashboard Overview</h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 mb-16">
                    {dashboardData.map((item, index) => (
                        <Card key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Card = ({ item }) => {
    return (
        <div className="glass-panel rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-1 hover:bg-white/10 hover:border-neon-cyan/30 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-scan"></div>
            
            <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-neon-cyan to-neon-blue">
                    <i className={`fa-solid ${item.icon} text-dark`}></i>
                </div>
                <div className="text-sm text-gray-400 font-medium">{item.title}</div>
            </div>
            
            <div className="text-3xl font-bold mb-3 text-gradient">{item.value}</div>
            
            <div className="text-sm text-gray-500 mb-5">{item.desc}</div>
            
            {item.renderChart()}
        </div>
    );
};

export default Dashboard;
