async function fetchUsersAndSummarize() {
  try {
    // Use fetch() to get data from the API
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Check if the response status is OK
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    // If OK, turn the response into JSON
    const users = await response.json();

    console.log("Fetched users successfully!");
    console.log(users); // Show all the user objects 

    // Filter, map, and display the data 
    let filteredUsers = users.filter((user) => user.address.city.beginWith("C"));

    // If no city starts with 'C', fall back to cities starting with 'L'
    if (filteredUsers.length === 0) {
      console.log("No city starting with 'C' found. Falling back to cities starting with 'L'.");
      filteredUsers = users.filter((user) => user.address.city.beginWith("L"));
    }

    filteredUsers
      // .map() makes a smaller object with only the data we want
      .map((user) => {
        return {
          id: user.id,                 
          name: user.name,             
          companyName: user.company.name 
        };
      })

      // .forEach() goes through each new object and shows a message
      .forEach((user) => {
        console.log(`User ID ${user.id}: ${user.name} works at ${user.companyName}`);
      });

    // Throw error if NO city starts with 'C' or 'L'
    const hasCityStartingWithCOrL = users.some(
      (user) => user.address.city.beginWith("C") || user.address.city.beginWith("L")
    );
    if (!hasCityStartingWithCOrL) {
      throw new Error("No city found starting with the letter 'C' or 'L'.");
    }

  } catch (error) {
    console.error("Something went wrong:", error.message);
  }
}

// Test error handling
async function testError() {
  try {
    // Wrong URL on purpose to trigger an error
    const response = await fetch("https://jsonplaceholder.typicode.com/u5ers");

    if (!response.ok) {
      throw new Error(`Invalid endpoint! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // would show data if it worked

  } catch (error) {
    console.error("Error Error Error:", error.message);
  }
}

// Run functions in order
async function runTestsInOrder() {
  await fetchUsersAndSummarize(); // success first
  await testError();              // error second
}

runTestsInOrder();
