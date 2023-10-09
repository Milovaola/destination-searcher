# Travel Destination Searcher

## Overview

Travel Destination Searcher is a React application designed to assist users in searching for travel destinations and
exploring details about them. The application allows users to search for destinations by name and view detailed
information about the selected destination and top 5 nearby destinations.

[Live Demo](#)

## Technologies

- **React:** For building the user interface.
- **TypeScript:** For static type-checking.
- **Chakra UI:** For designing the UI components.
- **React Query:** For managing asynchronous state and performing API queries.
- **Prettier:** For code formatting.

## Design Decisions & Implementation Details

1. **Fake API**
   The fake-api.ts file exports asynchronous functions that mimic API calls by filtering the provided data based on user
   input and resolving the promise with matched data.
   When the user searches for ‘fail’, the function rejects the promise to simulate an error.
2. **Destination Recommendation Algorithm**
   Algorithm calculates nearby destinations based on geographical proximity (latitude and longitude).
3. **Error Handling**
   Implemented error handling for API requests to manage error states gracefully and display an error message near the
   combobox when needed.
4. **Loading State**
   Loading indicators are displayed during data fetching to enhance the UX.
5. **Accessibility**
   Ensured that the combobox and all interactive elements are keyboard accessible and comply with accessibility
   guidelines.

### Destination Search

- Asynchronous combobox to fetch and display matching destination names from a fake API.
- A fake API is utilized to mimic the process of querying a real API.

### Destination Details

- Displays detailed information about the selected destination, including name, description, and top 5 nearby
  destinations.

## Features

- **Client-side Caching**: Using React Query to cache the results of the fake API requests.
- **Debounce User Input**: Debounce implemented to minimize API calls during user input.
- **Accessible UI**: Chakra UI provides a set of accessible and reusable UI components that follow the WAI-ARIA
  standards.
- **Deep Link**: Facilitated deep linking to enable users to share specific states of the application through URLs.
