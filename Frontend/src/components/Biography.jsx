import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className="bg-gray-900 py-20 px-6 relative overflow-hidden">
      {/* Aesthetic glowing background */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] pointer-events-none transform -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Side: Image */}
        <div className="lg:w-1/2 flex justify-center w-full">
          <div className="relative group p-4 border border-gray-700/50 bg-gray-800/30 rounded-3xl backdrop-blur-sm">
            <img 
              src={imageUrl} 
              alt="About Blood Management System" 
              className="w-full max-w-md rounded-2xl drop-shadow-[0_20px_50px_rgba(220,38,38,0.15)] group-hover:scale-105 transition-transform duration-500 object-cover aspect-square md:aspect-auto"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:w-1/2 space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-900/30 border border-red-500/30 text-red-400 text-sm font-semibold tracking-wider">
            BIOGRAPHY
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Who We Are
          </h2>
          
          <div className="w-20 h-1.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>

          <div className="space-y-4 text-lg text-gray-400">
            <p>
              We are a digitally native platform dedicated to modernizing and simplifying blood donation 
              and lifecycle management. Our unified system closes the gap between donors, recipients, 
              and clinical hospital environments seamlessly.
            </p>
            <p className="pl-4 border-l-2 border-red-600/50 text-gray-300 italic">
              "Our mission is to save lives by building a decentralized, instantly accessible network of 
              verified heroes."
            </p>
            <p>
              By leveraging real-time data transparency, we aim to drastically reduce logistical delays 
              during maximum urgencies while ensuring unparalleled reliability for all parties involved.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6">
             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
               <h4 className="text-3xl font-bold text-red-500 mb-1">24/7</h4>
               <p className="text-gray-400 text-sm">Emergency Availability</p>
             </div>
             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
               <h4 className="text-3xl font-bold text-red-500 mb-1">100%</h4>
               <p className="text-gray-400 text-sm">Verified Donors</p>
             </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}

export default Biography