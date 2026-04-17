import React from 'react'

const Blood = () => {

  const bloodGroups = [
    { type: "A+", info: "Donate to A+, AB+" },
    { type: "A-", info: "Donate to A+, A-, AB+, AB-" },
    { type: "B+", info: "Donate to B+, AB+" },
    { type: "B-", info: "Donate to B+, B-, AB+, AB-" },
    { type: "O+", info: "Donate to all positive types" },
    { type: "O-", info: "Universal Donor" },
    { type: "AB+", info: "Universal Recipient" },
    { type: "AB-", info: "Receives from all negative types" }
  ]

  return (
    <div className="bg-gray-900 py-24 px-6 relative overflow-hidden border-t border-gray-800">
      {/* Background glow lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-gray-900 to-gray-900 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Blood Types <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Compatibility</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Understand the compatibility matrix. Knowing your blood type is an essential part of discovering how many lives you can save.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodGroups.map((group, index) => (
            <div 
              key={index} 
              className="bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] group flex flex-col items-center text-center translate-y-0 hover:-translate-y-2"
            >
              <div className="h-20 w-20 bg-gray-900 rounded-full flex items-center justify-center mb-4 border border-red-500/20 group-hover:border-red-500/60 transition-colors shadow-inner">
                <span className="text-3xl font-black text-red-500 group-hover:text-red-400 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                  {group.type}
                </span>
              </div>
              <p className="text-gray-300 font-medium">
                {group.info}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Blood