import React, { useState } from 'react'
import CarbonFootprintForm from './CarbonFootprintForm'
import Suggestions from './Suggestions'

const App = () => {
  const [carbonFootprint, setCarbonFootprint] = useState(null)

  const handleCarbonFootprint = (carbonFootprint) => {
    setCarbonFootprint(carbonFootprint)
  }

  return (
    <div className="bg-green-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          Calculate Your Carbon Footprint
        </h1>
        <CarbonFootprintForm onCalculate={handleCarbonFootprint} />
        {carbonFootprint && (
          <div className="mt-8 animate__animated animate__fadeInUp">
            <h2 className="text-lg font-bold mb-4">
              Your Carbon Footprint: {carbonFootprint} tons CO2e
            </h2>
            <h3 className="text-lg font-bold mt-4 mb-4">
              {carbonFootprint <= 5 && 'Your Carbon Footprint is Low'}
              {carbonFootprint > 5 &&
                carbonFootprint <= 10 &&
                'Your Carbon Footprint is Moderate'}
              {carbonFootprint > 10 && 'Your Carbon Footprint is High'}
            </h3>
            <h3 className="text-lg font-bold mb-2">
              Suggestions for Reducing Your Carbon Footprint:
            </h3>
            <Suggestions carbonFootprint={carbonFootprint} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
