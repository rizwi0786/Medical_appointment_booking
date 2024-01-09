export const seperate = (inputString)=>{
    

// Define a regular expression to match the day and the duration
const regex = /^(\w+).*?(\d+\s*(?:AM|PM)\s*-\s*\d+\s*(?:AM|PM))$/;

// Use the regular expression to extract matches
const matches = inputString.match(regex);

// Check if there are matches
if (matches && matches.length === 3) {
  const day = matches[1]; // Extracted day
  const duration = matches[2]; // Extracted duration

  console.log("Day:", day);
  console.log("Duration:", duration);
} else {
  console.log("Invalid input string format");
}
return matches;
}