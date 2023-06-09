import React, { useState } from 'react'

const CarbonFootprintForm = ({ onCalculate }) => {
  const [electricity, setElectricity] = useState('')
  const [naturalGas, setNaturalGas] = useState('')
  const [fuel, setFuel] = useState('')
  const [meals, setMeals] = useState('')
  const [flights, setFlights] = useState('')
  const [carMileage, setCarMileage] = useState('')
  const [electricityCarbon, setElectricityCarbon] = useState('')
  const [carMilageCarbon, setCarMileageCarbon] = useState('')
  const [naturalGasCarbon, setNaturalGasCarbon] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const carbonFootprint = calculateCarbonFootprint()
    electricityCarbonFootprint() // API to calculate carbon produced from electricity
    naturalGasCarbonFootprint() // API to calculate carbon produced from natural gas
    carCarbonFootprint() // API to calculate carbon produced from miles driven
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

  const electricityCarbonFootprint = async () => {
    fetch('https://beta4.api.climatiq.io/estimate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TH8632GBXQMVTHG86GSK121QHR6J'
      },
      body: JSON.stringify({
        emission_factor: {
          activity_id: "electricity-supply_grid-source_supplier_mix",
          source: "EPA",
          region: "US-NJ",
          year: 2022,
          source_lca_activity: "electricity_generation",
          data_version: "^1"
        },
        parameters: {
          energy: parseInt(electricity, 10),
          energy_unit: 'kWh'
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setElectricityCarbon(data.co2e)
    })
    .catch(error => {
      console.error(error);
    });
  };

  const carCarbonFootprint = async () => {
    fetch('https://beta4.api.climatiq.io/estimate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TH8632GBXQMVTHG86GSK121QHR6J'
      },
      body: JSON.stringify({
        emission_factor: {
          activity_id: "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na",
          source: "EPA",
          region: "US",
          year: 2022,
          source_lca_activity: "use_phase",
          data_version: "^1"
        },
        parameters: {
          distance: parseInt(carMileage), // This would be how many miles driven
          distance_unit: 'mi'
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCarMileageCarbon(data.co2e)
    })
    .catch(error => {
      console.error(error);
    });
  };


  const naturalGasCarbonFootprint = async () => {
    fetch('https://beta4.api.climatiq.io/estimate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TH8632GBXQMVTHG86GSK121QHR6J'
      },
      body: JSON.stringify({
        emission_factor: {
          activity_id: "fuel-type_natural_gas-fuel_use_stationary_combustion",
          source: "EPA",
          region: "US",
          year: 2022,
          source_lca_activity: "fuel_combustion",
          data_version: "^1"
        },
        parameters: {
          energy: parseInt(naturalGas, 10),
          energy_unit: 'kWh'
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setNaturalGasCarbon(data.co2e)
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label htmlFor="electricity" className="text-gray-800">
          Electricity Usage (kWh/month):
        </label>
        <input
          id="electricity"
          className="border border-gray-300 rounded px-2 py-1 w-full"
          type="number"
          step="any"
          value={electricity}
          onChange={(e) => setElectricity(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="naturalGas" className="text-gray-800">
          Natural Gas Usage (thousand cubic feet/month):
        </label>
        <input
          id="naturalGas"
          className="border border-gray-300 rounded px-2 py-1 w-full"
          type="number"
          step="any"
          value={naturalGas}
          onChange={(e) => setNaturalGas(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="fuel" className="text-gray-800">
          Fuel Usage (gallons/month):
        </label>
        <input
          id="fuel"
          className="border border-gray-300 rounded px-2 py-1 w-full"
          type="number"
          step="any"
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="meals" className="text-gray-800">
          Daily Meals (number of meals/day):
        </label>
        <input
          id="meals"
          className="border border-gray-300 rounded px-2 py-1 w-full"
          type="number"
          step="any"
          value={meals}
          onChange={(e) => setMeals(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="flights" className="text-gray-800">
          Flights per Year:
        </label>
        <input
          id="flights"
          className="border border-gray-300 rounded px-2 py-1 w-full"
          type="number"
          step="any"
          value={flights}
          onChange={(e) => setFlights(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="carMileage" className="text-gray-800">
          Car Mileage per Month (miles):
        </label>
        <input
          id="carMileage"
          className="border border-gray-300 rounded px-2 py-1 w-full"
          type="number"
          step="any"
          value={carMileage}
          onChange={(e) => setCarMileage(e.target.value)}
          required
        />
      </div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Calculate
      </button>
    </form>
  )
}

export default CarbonFootprintForm
