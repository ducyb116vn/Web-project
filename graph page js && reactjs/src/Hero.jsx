const Hero = () => {
    return (
    <section id="home"
        class="relative min-h-screen w-screen flex items-center overflow-hidden bg-gradient-to-br from-dark to-dark-light">
        <div
            class="absolute inset-0 opacity-40 animate-bg-shift pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,204,0.1),transparent_70%)]">
        </div>

        <div
            class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center pt-24 md:pt-0">
            <div class="animate-slide-left text-center md:text-left">
                <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8 text-gradient">Data Analytics<br />Dashboard
                </h1>
                <p class="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">Transform your data into
                    actionable insights with our cutting-edge analytics platform. Real-time monitoring, intelligent
                    predictions, and beautiful visualizations.</p>
                <a href="#dashboard"
                    class="inline-block px-10 py-4 bg-gradient-to-br from-neon-pink to-neon-orange text-white rounded-full font-semibold shadow-[0_4px_15px_rgba(255,107,107,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,107,0.4)] transition-all">Get
                    Started</a>
            </div>

            <div class="animate-slide-right relative h-[400px] w-full flex justify-center md:justify-end">
                <div class="relative w-full h-full max-w-[400px]">
                    <div
                        class="absolute bottom-0 left-[15%] w-[60px] h-[250px] bg-gradient-to-b from-dark-light to-dark border border-neon-cyan/20 overflow-hidden shadow-[0_0_20px_rgba(0,255,204,0.1)]">
                        <div
                            class="absolute bottom-0 inset-x-0 h-[45%] bg-gradient-to-t from-neon-cyan/60 to-transparent animate-pulse-slow">
                        </div>
                        <div
                            class="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,rgba(255,255,255,0.05)_8px,rgba(255,255,255,0.05)_10px)]">
                        </div>
                    </div>
                    <div
                        class="absolute bottom-0 left-[35%] w-[80px] h-[320px] bg-gradient-to-b from-dark-light to-dark border border-neon-cyan/20 overflow-hidden z-10 shadow-[0_0_20px_rgba(0,255,204,0.1)]">
                        <div
                            class="absolute bottom-0 inset-x-0 h-[60%] bg-gradient-to-t from-neon-pink/60 to-transparent animate-pulse-slow [animation-delay:0.5s]">
                        </div>
                        <div
                            class="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,rgba(255,255,255,0.05)_8px,rgba(255,255,255,0.05)_10px)]">
                        </div>
                    </div>
                    <div
                        class="absolute bottom-0 right-[15%] w-[100px] h-[280px] bg-gradient-to-b from-dark-light to-dark border border-neon-cyan/20 overflow-hidden shadow-[0_0_20px_rgba(0,255,204,0.1)]">
                        <div
                            class="absolute bottom-0 inset-x-0 h-[35%] bg-gradient-to-t from-neon-blue/60 to-transparent animate-pulse-slow [animation-delay:1s]">
                        </div>
                        <div
                            class="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,rgba(255,255,255,0.05)_8px,rgba(255,255,255,0.05)_10px)]">
                        </div>
                    </div>
                    <div
                        class="absolute bottom-0 left-[90%] w-[70px] h-[200px] bg-gradient-to-b from-dark-light to-dark border border-neon-cyan/20 overflow-hidden shadow-[0_0_20px_rgba(0,255,204,0.1)]">
                        <div
                            class="absolute bottom-0 inset-x-0 h-[35%] bg-gradient-to-t from-neon-orange/60 to-transparent animate-pulse-slow [animation-delay:1s]">
                        </div>
                        <div
                            class="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,rgba(255,255,255,0.05)_8px,rgba(255,255,255,0.05)_10px)]">
                        </div>
                    </div>
                    <div
                        class="absolute h-[2px] w-[100px] top-[30%] left-[10%] bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-scan">
                    </div>
                    <div
                        class="absolute h-[2px] w-[150px] top-[50%] right-[15%] bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-scan [animation-delay:1s]">
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Hero;