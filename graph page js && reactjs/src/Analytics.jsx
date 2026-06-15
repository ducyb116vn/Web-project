import Text from "./common/Text";

const Analytics = () => {
  const statsData = [
    { value: "2.4M", label: "Page Views" },
    { value: "156K", label: "Unique Visitors" },
    { value: "4.2m", label: "Avg Session" },
    { value: "68%", label: "Return Rate" },
    { value: "89", label: "NPS Score" },
    { value: "3.2K", label: "Daily Active" },
  ];

  const monthlyTrends = [
    { height: "60%", value: 120, label: "Jan" },
    { height: "80%", value: 180, label: "Feb" },
    { height: "45%", value: 90, label: "Mar" },
    { height: "70%", value: 140, label: "Apr" },
    { height: "90%", value: 200, label: "May" },
    { height: "65%", value: 130, label: "Jun" },
  ];

  return (
    <section id="analytics" className="py-20 px-6 bg-gradient-to-b from-[#0f1329] to-dark-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-gradient">Advanced Analytics</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-10">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="glass-panel p-5 rounded-xl text-center hover:-translate-y-1 transition-transform border-t-2 border-t-transparent hover:border-t-neon-cyan"
            >
              <div className="text-2xl font-bold text-neon-cyan mb-1">{stat.value}</div>
                <Text  className="text-xs text-gray-400">
                  {stat.label}
                </Text>
              
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          <div className="glass-panel p-8 rounded-2xl min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <Text className="text-xl font-semibold">📈 Monthly Trends</Text>
              <div className="flex gap-2">y
                <button className="px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan rounded-lg text-xs hover:bg-neon-cyan/20">
                  2024
                </button>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10">
                  2023
                </button>
              </div>
            </div>
            <div className="h-[300px] flex items-end justify-around pb-5">
              {monthlyTrends.map((item, index) => (
                <div
                  key={index}
                  style={{ height: item.height }}
                  className="w-8 bg-gradient-to-b from-neon-cyan to-neon-blue rounded-t-md group relative cursor-pointer hover:brightness-125 transition-all hover:scale-y-105 origin-bottom"
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.value}
                  </span>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold">📊 Growth Analytics</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan rounded-lg text-xs">
                  Week
                </button>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10">
                  Month
                </button>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <svg className="w-full h-full" viewBox="0 0 500 300">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[50, 100, 150, 200, 250].map((y) => (
                  <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.05)" />
                ))}

                <path
                  d="M 0,200 L 62,180 L 125,150 L 187,170 L 250,120 L 312,140 L 375,100 L 437,130 L 500,110 L 500,300 L 0,300 Z"
                  fill="url(#gradient)"
                  opacity="0.3"
                />
                <path
                  d="M 0,200 L 62,180 L 125,150 L 187,170 L 250,120 L 312,140 L 375,100 L 437,130 L 500,110"
                  fill="none"
                  stroke="#00ffcc"
                  strokeWidth="3"
                  filter="drop-shadow(0 0 10px rgba(0, 255, 204, 0.5))"
                />
                <g className="fill-neon-cyan stroke-dark stroke-2 hover:r-6 transition-all">
                  {[
                    { cx: 0, cy: 200 }, { cx: 62, cy: 180 }, { cx: 125, cy: 150 },
                    { cx: 187, cy: 170 }, { cx: 250, cy: 120 }, { cx: 312, cy: 140 },
                    { cx: 375, cy: 100 }, { cx: 437, cy: 130 }, { cx: 500, cy: 110 }
                  ].map((pt, i) => (
                    <circle key={i} cx={pt.cx} cy={pt.cy} r="4" />
                  ))}
                </g>
              </svg>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold">🌍 Geographic Distribution</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan rounded-lg text-xs">
                  Global
                </button>
              </div>
            </div>
            <div className="h-[300px] flex items-end justify-around pb-5">
              <div className="w-16 bg-gradient-to-b from-neon-pink to-neon-orange rounded-t-md h-[85%] relative hover:brightness-125 transition-all">
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-white">42%</span>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400">USA</span>
              </div>
              <div className="w-16 bg-gradient-to-b from-teal-400 to-teal-600 rounded-t-md h-[65%] relative hover:brightness-125 transition-all">
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-white">28%</span>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400">EU</span>
              </div>
              <div className="w-16 bg-gradient-to-b from-blue-400 to-green-400 rounded-t-md h-[45%] relative hover:brightness-125 transition-all">
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-white">18%</span>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400">Asia</span>
              </div>
              <div className="w-16 bg-gradient-to-b from-purple-400 to-pink-500 rounded-t-md h-[25%] relative hover:brightness-125 transition-all">
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-white">12%</span>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400">Other</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold">📱 Device Analytics</h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-neon-pink rounded-full"></span>Mobile
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-neon-cyan rounded-full"></span>Desktop
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <svg className="w-full h-full" viewBox="0 0 500 300">
                {[60, 120, 180, 240].map(y => (
                    <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.05)" />
                ))}

                <path
                  d="M 0,180 L 71,160 L 142,140 L 214,120 L 285,100 L 357,90 L 428,80 L 500,70"
                  stroke="#ff6b6b"
                  strokeWidth="2"
                  fill="none"
                  filter="drop-shadow(0 0 10px rgba(255, 107, 107, 0.5))"
                />
                
                <path
                  d="M 0,220 L 71,210 L 142,200 L 214,190 L 285,185 L 357,180 L 428,175 L 500,170"
                  stroke="#00ffcc"
                  strokeWidth="2"
                  fill="none"
                  filter="drop-shadow(0 0 10px rgba(0, 255, 204, 0.5))"
                />

                <g fill="#ff6b6b">
                  <circle cx="0" cy="180" r="3" />
                  <circle cx="285" cy="100" r="3" />
                  <circle cx="500" cy="70" r="3" />
                </g>
                <g fill="#00ffcc">
                  <circle cx="0" cy="220" r="3" />
                  <circle cx="285" cy="185" r="3" />
                  <circle cx="500" cy="170" r="3" />
                </g>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Analytics;