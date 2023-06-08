import React from 'react'

const Suggestions = ({ carbonFootprint }) => {
  let suggestions = []

  if (carbonFootprint <= 5) {
    suggestions = [
      'Reduce food waste by planning meals and buying only what you need.',
      'Opt for public transportation or carpooling instead of driving alone.',
      'Use energy-efficient appliances and turn off lights when not in use.',
    ]
  } else if (carbonFootprint <= 10) {
    suggestions = [
      'Choose locally sourced and seasonal foods to reduce carbon emissions from transportation.',
      'Consider cycling or walking for short-distance trips.',
      'Plant trees or support reforestation initiatives to offset your carbon footprint.',
    ]
  } else {
    suggestions = [
      'Transition to a plant-based diet to significantly reduce your carbon footprint.',
      'Minimize air travel and consider offsetting your emissions when you do fly.',
      'Advocate for renewable energy and support policies that address climate change.',
    ]
  }

  return (
    <div>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  )
}

export default Suggestions
