# Travel Destination Search Application

## The Task

You are tasked with creating a React, TypeScript application for searching travel destinations. Users should be able to
search for destinations and view details about them. Additionally, you will implement an algorithm to suggest nearby
destinations based on the selected destination.

### Requirements

**User Interface (UI):**

1. Create a React application with two main parts:
    - Destination Search: Allow users to search for travel destinations by name (the data is provided).
    - Destination Details: Display detailed information about the selected destination, including its name, description,
      and top 5 nearby destinations.

2. Implement an asynchronous combobox for the destination search that fetches and displays matching destination names
   from a fake API.
    - The fake API must only return the destination based on the user query, which means you cannot fetch all
      destinations at once.
    - You can create a file called fake-api.ts and export the async functions as fake APIs. Please console.log the
      arguments of all fake API functions.

3. Clicking on the nearby destinations should show the details of the selected destination and its nearby destinations.

**User Experience (UX):**

1. Implement error handling for API requests. When the user enters ‘fail’, the front end should mimic a backend error
   case and show an error message near Combobox.

2. Add loading indicators during data fetching.

3. The Combobox should be keyboard-accessible.

**Optional Bonus:**

- Implement client-side caching.
- Debounce user input.
- Make use of modern accessible UI libraries.
- Deep link to the current state.

### Submission Guidelines

1. Deploy the application and share the link.

2. Make your repository publicly accessible and share the link.

3. Include a README.md file that explains the design decisions and technology choices.
