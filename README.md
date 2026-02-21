# Advanced Multi-Function Calculator Application

A comprehensive web-based calculator application featuring five specialized calculator types with independent state management and calculation history. Built entirely with vanilla HTML, CSS, and JavaScript without external dependencies.

## Overview

This application provides a unified interface for multiple calculation types, eliminating the need to switch between different tools or applications. Each calculator module operates independently while sharing a consistent, modern user interface with smooth animations and responsive design.

## Features

### Core Capabilities

The application integrates five distinct calculator modes:

#### 1. Basic Calculator
Standard arithmetic calculator for everyday calculations.
- Addition, subtraction, multiplication, and division operations
- Percentage calculations
- Exponentiation (power operations)
- Clear all (AC) and delete last entry (DEL) functions

#### 2. Scientific Calculator
Advanced mathematical operations for scientific and engineering calculations.
- All basic calculator operations
- Trigonometric functions (sin, cos, tan, asin, acos, atan)
- Logarithmic functions (log base 10, natural logarithm)
- Square root function
- Mathematical constants (π, e)
- Support for complex expressions with parentheses

#### 3. Equation Solver
Numerical solver for algebraic equations with single variable.
- Solves equations using the Newton-Raphson iterative method
- Displays detailed solution steps and verification
- Supports various function types including polynomial, trigonometric, and logarithmic
- Example inputs: `2*x + 5 = 15`, `x^2 - 4 = 0`

#### 4. Function Graph Plotter
Interactive function visualization tool.
- Plots mathematical functions on a coordinate grid
- Customizable x-axis range
- Supports polynomial, trigonometric, logarithmic, and absolute value functions
- Real-time rendering using HTML5 Canvas API
- Example inputs: `x^2`, `sin(x)`, `2*x+1`

#### 5. Currency Converter
Real-time currency conversion with live exchange rates.
- Fetches current exchange rates via REST API
- Supports 10 major international currencies
- Automatic conversion on input
- Displays current exchange rate information
- Offline functionality with fallback exchange rates

### Design Elements

- **Modern UI**: Glass-morphism effects with gradient backgrounds
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Transition effects for tab switching and button interactions
- **Color-Coded Interface**: Visual distinction between operators, functions, and calculation buttons
- **Professional Theme**: Purple gradient color scheme throughout the application

### Technical Features

**Independent State Management**
Each calculator module maintains its own calculation state independently. Users can seamlessly switch between calculator types without losing their work in any module.

**Calculation History System**
- Navigation through past calculations using arrow keys
- Last three calculations displayed in history panel
- Each calculator type maintains separate history
- Persistent results until explicitly cleared
- History cleared individually per calculator module

**Keyboard Support**
Full keyboard navigation for basic and scientific calculators:
- Numeric input (0-9)
- Operator keys (+, -, *, /)
- Decimal point (.)
- Enter key for calculation
- Escape key to clear all
- Backspace for deletion
- Arrow keys for history navigation

**State Persistence**
Calculation state is preserved when switching between calculator modules, allowing users to work across multiple calculation types simultaneously without data loss.

## Installation and Setup

### Requirements

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, or Opera 76+)
- No additional dependencies or build tools required

### Installation Instructions

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd Calculator
   ```

2. Open the application by launching `index.html` in your web browser:
   ```bash
   # Windows
   start index.html
   
   # macOS
   open index.html
   
   # Linux
   xdg-open index.html
   ```

Alternatively, simply double-click the `index.html` file to open it in your default browser.

## Usage Documentation

### Basic and Scientific Calculators

**Mouse/Touch Input:**
Click calculator buttons to input numbers, operators, and functions. Press the equals button to execute calculations.

**Keyboard Input:**
- `0-9`: Numeric input
- `+`, `-`, `*`, `/`: Mathematical operators
- `.`: Decimal point
- `Enter`: Execute calculation
- `Escape`: Clear all (AC function)
- `Backspace`: Delete last character
- `↑` (Up Arrow): Navigate to previous calculation in history
- `↓` (Down Arrow): Navigate to next calculation in history

### History Navigation

The history system provides access to previous calculations:

- Displays the three most recent calculations in the history panel
- Use arrow keys to navigate through complete calculation history
- Each calculator module maintains independent history
- History persists until cleared using the AC button
- Clearing history affects only the active calculator module

### Equation Solver Usage

1. Enter equation in the format: `expression = value`
   - Examples: `2*x + 5 = 15`, `x^2 - 9 = 0`, `sin(x) = 0.5`

2. Click the "Solve" button to execute

3. View the calculated solution and detailed verification steps

Note: The solver returns one solution per equation. For equations with multiple solutions, the result will be the solution nearest to x=0.

### Graph Plotter Usage

1. Enter a mathematical function using `x` as the variable
   - Examples: `x^2`, `sin(x)`, `2*x + 1`, `x^3 - 3*x`

2. Specify the x-axis range using the min and max input fields (default: -10 to 10)

3. Click "Plot" to render the function graph

4. The graph displays on a coordinate grid with axis labels

### Currency Converter Usage

1. Enter the amount to convert in the input field
2. Select the source currency from the "From" dropdown menu
3. Select the target currency from the "To" dropdown menu
4. View the converted amount and exchange rate automatically

**Supported Currencies:**
- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound Sterling)
- JPY (Japanese Yen)
- INR (Indian Rupee)
- AUD (Australian Dollar)
- CAD (Canadian Dollar)
- CHF (Swiss Franc)
- CNY (Chinese Yuan)
- KRW (South Korean Won)

## Project Structure

```
Calculator/
├── index.html        # Main HTML structure and markup
├── styles.css        # CSS styling and animations
├── script.js         # JavaScript application logic
└── README.md         # Project documentation
```

## Technology Stack

- **HTML5** - Application structure and semantic markup
- **CSS3** - Styling, animations, and responsive layout
- **JavaScript (ES6+)** - Application logic and interactivity
- **Canvas API** - Function graph rendering
- **Fetch API** - Exchange rate data retrieval
- **Vanilla JavaScript** - No external libraries or frameworks required

## Algorithm Implementation

### Newton-Raphson Method (Equation Solver)
The equation solver implements the Newton-Raphson iterative method for finding numerical solutions to equations. The algorithm makes successive approximations to the root, improving accuracy with each iteration until convergence within a specified tolerance.

### Canvas Rendering (Graph Plotter)
The graph plotter evaluates the input function at multiple x-coordinates across the specified range, then connects these points to create a continuous curve visualization using the HTML5 Canvas API.

### Currency Conversion
Exchange rate data is fetched from a third-party API on application load. Conversion calculations apply the current rates to transform amounts between currency pairs. The application includes fallback rates for offline functionality.

## Feature Comparison

| Feature | Basic | Scientific | Solver | Graph | Currency |
|---------|:-----:|:----------:|:------:|:-----:|:--------:|
| Arithmetic Operations | ✓ | ✓ | ✓ | ✓ | ✓ |
| Independent State | ✓ | ✓ | ✓ | ✓ | ✓ |
| History Navigation | ✓ | ✓ | ✓ | ✓ | ✓ |
| Keyboard Support | ✓ | ✓ | - | - | - |
| Result Persistence | ✓ | ✓ | ✓ | ✓ | ✓ |
| Trigonometric Functions | - | ✓ | - | - | - |
| Equation Solving | - | - | ✓ | - | - |
| Graph Visualization | - | - | - | ✓ | - |
| Currency Conversion | - | - | - | - | ✓ |

## Known Limitations

- The equation solver returns a single solution per equation
- Graph plotter uses a fixed y-axis range (-10 to 10)
- Exchange rates update only on page load
- Calculation history is cleared on page refresh
- Scientific notation is not currently supported

## Future Development

Potential enhancements for future versions:

- [ ] Implement localStorage for persistent calculation history
- [ ] Support for multiple equation solutions
- [ ] Dynamic y-axis scaling for graph plotter
- [ ] Additional currency support
- [ ] Unit conversion calculator
- [ ] Matrix calculator module
- [ ] Statistics calculator mode
- [ ] Theme customization options
- [ ] Export calculation history functionality
- [ ] Scientific notation support

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch
3. Implement changes with appropriate testing
4. Submit a pull request with detailed description of modifications

## Browser Compatibility

Tested and verified on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## License

This project is open source and available for educational and personal use.

## Acknowledgments

- Exchange rate data provided by [exchangerate-api.com](https://exchangerate-api.com)
- Mathematical functions implemented using JavaScript Math library

---

**Note**: This calculator application is designed for general educational and personal use. Critical calculations should be verified with specialized mathematical software.
