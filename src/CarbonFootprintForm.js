import React, { useState } from 'react'

const CarbonFootprintForm = ({ onCalculate }) => {
  const [electricity, setElectricity] = useState('')
  const [naturalGas, setNaturalGas] = useState('')
  const [fuel, setFuel] = useState('')
  const [meals, setMeals] = useState('')
  const [flights, setFlights] = useState('')
  const [carMileage, setCarMileage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const carbonFootprint = calculateCarbonFootprint()
    onCalculate(carbonFootprint)
  }

  const calculateCarbonFootprint = () => {
    const electricityCarbon = parseFloat(electricity) * 1.34 // Assume 1.34 lb CO2e per kWh (American customary unit)
    const naturalGasCarbon = parseFloat(naturalGas) * 119.58 // Assume 119.58 lb CO2e per thousand cubic feet (American customary unit)
    const fuelCarbon = parseFloat(fuel) * 19.64 // Assume 19.64 lb CO2e per gallon (American customary unit)
    const mealsCarbon = parseFloat(meals) * 11 // Assume 11 lb CO2e per meal
    const flightsCarbon = parseFloat(flights) * 4.62 // Assume 4.62 lb CO2e per mile (average domestic flight distance)
    const carMileageCarbon = parseFloat(carMileage) * 0.0088 // Assume 0.0088 lb CO2e per mile

    const totalCarbonFootprint =
      electricityCarbon +
      naturalGasCarbon +
      fuelCarbon +
      mealsCarbon +
      flightsCarbon +
      carMileageCarbon

    return totalCarbonFootprint.toFixed(2)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-gray-800">
          Electricity Usage (kWh/month):
          <input
            className="border border-gray-300 rounded px-2 py-1 w-full"
            type="number"
            step="any"
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-800">
          Natural Gas Usage (thousand cubic feet/month):
          <input
            className="border border-gray-300 rounded px-2 py-1 w-full"
            type="number"
            step="any"
            value={naturalGas}
            onChange={(e) => setNaturalGas(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-800">
          Fuel Usage (gallons/month):
          <input
            className="border border-gray-300 rounded px-2 py-1 w-full"
            type="number"
            step="any"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-800">
          Daily Meals (number of meals/day):
          <input
            className="border border-gray-300 rounded px-2 py-1 w-full"
            type="number"
            step="any"
            value={meals}
            onChange={(e) => setMeals(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-800">
          Flights per Year:
          <input
            className="border border-gray-300 rounded px-2 py-1 w-full"
            type="number"
            step="any"
            value={flights}
            onChange={(e) => setFlights(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-800">
          Car Mileage per Month (miles):
          <input
            className="border border-gray-300 rounded px-2 py-1 w-full"
            type="number"
            step="any"
            value={carMileage}
            onChange={(e) => setCarMileage(e.target.value)}
          />
        </label>
      </div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        type="submit">
        Calculate
      </button>
    </form>
  )
}

export default CarbonFootprintForm
