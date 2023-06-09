import React, { useState } from "react";
import CarbonFootprintForm from "./CarbonFootprintForm";
import Suggestions from "./Suggestions";
import CarbonFootprintImg from "./images/carbon-footprint.png";

const App = () => {
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [electricity, setElectricity] = useState('')
  const [naturalGas, setNaturalGas] = useState('')
  const [meals, setMeals] = useState('')
  const [flights, setFlights] = useState('')
  const [carMileage, setCarMileage] = useState('')
  const [showPopup, setShowPopup] = useState(false);

  const handleCarbonFootprint = (
    carbonFootprint,
    electricity,
    naturalGas,
    meals,
    flights,
    carMileage
  ) => {
    setCarbonFootprint(carbonFootprint);
    setElectricity(electricity);
    setNaturalGas(naturalGas);
    setMeals(meals);
    setFlights(flights);
    setCarMileage(carMileage);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-green-950">
      <div className="text-white py-4 px-8">
        <h2 className="text-white text-3xl font-bold text-center">
          Carbon Footprint Calculator
        </h2>
      </div>
      <div className="bg-green-200 min-h-screen flex items-center justify-center">
        <div className="flex-col">
          <div className="flex-row flex-1 bg-white p-8 rounded-lg shadow-md max-w-md my-5">
            <div className="flex justify-center mb-5">
              <img height="64" width="64" src={CarbonFootprintImg}></img>
            </div>
            <div>
              <p>
                Your carbon footprint represents the total amount of greenhouse
                gases generated by your actions.
              </p>
              <br></br>
              <p>
                Actions like driving to work, flying to another country, and
                even turning on your lights at home contribute to your carbon
                footrprint.
              </p>
              <br></br>
              <p>
                Enter your information below to see your average monthly carbon
                footprint (reprsented as CO<sub>2</sub>e ).
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md my-5">
            <CarbonFootprintForm onCalculate={handleCarbonFootprint} />
            {showPopup && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-10 max-w-xl">
                  <h2 className="text-lg text-center font-bold my-5">
                    Your average monthly carbon footprint: <br /> {carbonFootprint} kgs
                    CO<sub>2</sub>e
                  </h2>
                  <h3 className="mb-4">
                    Relative to the average American,
                    {carbonFootprint <= 1400 &&
                      " your carbon footprint is low. "}
                    {carbonFootprint > 1400 &&
                      carbonFootprint <= 1600 &&
                      " your carbon footprint is moderate. "}
                    {carbonFootprint > 1600 &&
                      " your carbon footprint is high. "}
                    Based on the questions we ask, an average American's carbon
                    footprint is about 1489kgs CO<sub>2</sub>e.
                  </h3>
                  <h3 className="text-lg text-center font-bold mb-2">
                    Suggestions for reducing your carbon footprint:
                  </h3>
                  <Suggestions
                    carbonFootprint={carbonFootprint}
                    electricity={electricity}
                    naturalGas={naturalGas}
                    meals={meals}
                    flights={flights}
                    carMileage={carMileage}
                  />
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
    </div>
  );
};

export default App;
