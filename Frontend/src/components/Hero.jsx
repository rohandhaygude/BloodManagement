import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="bg-gray-900 text-white font-sans py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-600/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-72 h-72 bg-red-900/40 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <main className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 relative z-10">
        
        {/* Left Content */}
        <div className="md:w-1/2 flex flex-col items-start justify-center text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-900/30 border border-red-500/30 text-red-400 text-sm mb-6 font-medium shadow-sm">
            🚀 Next-Gen Blood Matching System
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-2xl leading-tight">
            {title ? (
              title
            ) : (
              <>
                Save Lives with Smart <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Blood Donation</span>
              </>
            )}
          </h1>
          
          <p className="mt-6 text-xl text-gray-400 max-w-lg">
            Real-time donor matching, emergency alerts, and a seamless dashboard for hospitals and heroes. Find blood when it matters most.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/request" className="px-8 py-4 text-center bg-red-600 hover:bg-red-500 rounded-xl font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              Request Blood Now
            </Link>
            <Link to="/login" className="px-8 py-4 text-center bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl font-bold text-lg transition-transform transform hover:-translate-y-1">
              Become a Donor
            </Link>
          </div>
        </div>

        {/* Right Image Segment */}
        <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center items-center relative">
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            <img 
              className="object-contain w-full h-full drop-shadow-[0_20px_50px_rgba(220,38,38,0.2)] animate-pulse-slow" 
              src={imageUrl || "/hero.png"} 
              alt="Hero Vector" 
              style={{ animationDuration: '4s' }}
            />
          </div>
        </div>
        
      </main>

      {/* Feature section moved into hero for better impact below fold */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-24 px-6 relative z-10">
        {[
          { icon: '🤖', title: "AI-Powered Matching", desc: "Instantly pairs patients with nearby available donors of the correct blood type." },
          { icon: '⚡', title: "Emergency Alerts", desc: "Instant SMS pushes and notifications for critical, high-urgency requirements." },
          { icon: '🔒', title: "Secure & Verified", desc: "Role-based verification ensuring safe, transparent, and trusted blood transfers." }
        ].map((feat, i) => (
          <div key={i} className="bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-colors shadow-lg hover:shadow-red-500/10 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">{feat.title}</h3>
            <p className="text-gray-400">{feat.desc}</p>
          </div>
        ))}
      </section>

    </div>
  )
}

export default Hero;
