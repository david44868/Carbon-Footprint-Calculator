import React, { useState } from 'react'
import CarbonFootprintForm from './CarbonFootprintForm'
import Suggestions from './Suggestions'

const App = () => {
  const [carbonFootprint, setCarbonFootprint] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const handleCarbonFootprint = (carbonFootprint) => {
    setCarbonFootprint(carbonFootprint)
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className="bg-green-950">
      <div className="text-white py-4 px-8">
        <h2 className="text-white text-3xl font-bold text-center">
          Carbon Footprint Calculator
        </h2>
      </div>
      <div className="bg-green-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md">
        <CarbonFootprintForm onCalculate={handleCarbonFootprint} />
        {showPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">
                Your carbon footprint: {carbonFootprint} kgs CO2e
              </h2>
              <h3 className="text-lg font-bold mt-4 mb-4">
                {carbonFootprint <= 5000 && 'Your carbon footprint is low'}
                {carbonFootprint > 5000 && carbonFootprint <= 10000 && 'Your carbon footprint is moderate'}
                {carbonFootprint > 10000 && 'Your carbon footprint is high'}
              </h3>
              <h3 className="text-lg font-bold mb-2">
                Suggestions for reducing your carbon footprint:
              </h3>
              <Suggestions carbonFootprint={carbonFootprint} />
              <div className="flex justify-center">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default App
