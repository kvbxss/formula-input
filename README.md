
# Formula Input App

A React-based formula input application where users can type formulas, select autocomplete suggestions, and calculate results. It uses Zustand for state management and React Query for fetching suggestions.

## Features

- **Formula Input**: Users can type a formula with variables and numbers.
- **Autocomplete**: Autocomplete suggestions based on user input and existing tags in the formula.
- **Formula Calculation**: After typing the formula, users can click on "Calculate" to get the result of the formula.
- **Tag Management**: Users can add and remove tags (variables) to the formula dynamically.

## Tech Stack

- **React**: Frontend UI.
- **Zustand**: State management.
- **React Query**: Fetch data for autocomplete suggestions.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Installation

To get started with the app, follow the steps below:

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/formula-input-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd formula-input-app
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage

### Formula Input

- **Typing a Formula**: Click on the formula input field and start typing. You can include variables and numbers.
- **Autocomplete**: While typing, suggestions will appear based on the existing tags and input text. Click on a suggestion to insert it into the formula.
- **Calculate Formula**: After entering a formula, click the "Calculate" button to evaluate the result. The result will appear below the formula input.
- **Clear Formula**: Click the "Clear Formula" button to clear the input field and reset the formula.

## Components

- **FormulaInput**: The main input component for typing and calculating formulas.
- **TagContentType**: A type that defines the structure of tags/variables in the formula.
- **useFormulaStore**: Zustand store for managing the state related to the formula input, including the formula, tags, and autocomplete suggestions.

## Example

Here's an example of how the application might look when used:

```txt
Formula Input: `x + y * 2`

Autocomplete Suggestions: 
- Variable: `x` -> Value: 10
- Variable: `y` -> Value: 5

Result: `20`
```

### Formula Calculation

- The formula input supports dynamic variables like `x`, `y`, etc. The result is calculated based on the entered formula and the values of the tags.

## Contributing

If you would like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes with a meaningful message.
5. Push to your fork.
6. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
