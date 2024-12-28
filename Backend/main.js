const { Groq } = require("groq-sdk");
const dotenv = require("dotenv").config();

// Initialize the Groq client with the API key from the environment variables
const groq = new Groq({ apiKey: process.env.API_KEY });

async function compareVehicles(entity1,entity2,n=10) {
  try {
    // Call the Groq API to compare vehicles with minimal randomness
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Create a detailed comparison table between ${entity1} and ${entity2} in JSON format. The JSON should include:

1. A header array with column names: 'Feature/Attribute', '${entity1}', and '${entity2}'.


2. A rows array where each object contains:

feature: The name of the feature or attribute being compared.

${entity1}: Details specific to ${entity1}.

${entity2}: Details specific to ${entity2}.



3. Ensure attributes such as Basic Information, Specifications, Performance, Cost, Popularity, Advantages, and Disadvantages are included.



The JSON output should be structured like this example:

{
  "header": ["Feature/Attribute", "${entity1}", "${entity2}"],
  "rows": [
    {
      "feature": "Basic Information",
      "${entity1}": "Details about ${entity1}",
      "${entity2}": "Details about ${entity2}"
    },
    {
      "feature": "Specifications",
      "${entity1}": "Specifications of ${entity1}",
      "${entity2}": "Specifications of ${entity2}"
    },
    ...
  ]
}
  give ${n} Feature/Attribute

Fill in the details for the specified entities and ensure the output is clean, clear, and easy to interpret `,
        },
      ],
      model: "llama3-8b-8192", // Ensure this model exists and is supported
      temperature: 0.0, // Set temperature to 0.0 to minimize randomness (no change in response)
    });

    // Extract the response content
    const responseContent = chatCompletion.choices[0]?.message?.content || "No response received.";
    return responseContent;

  } catch (error) {
    // Return the error message for better debugging
    return { error: error.message || "Failed to process the request." };
  }
}

// Export the function for use in other files
module.exports = {
  compareVehicles,
};
