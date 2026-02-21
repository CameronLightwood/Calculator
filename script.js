// Global Variables
let currentExpression = '';
let currentResult = '0';
let exchangeRates = {};

// Separate history for each calculator type
let basicHistory = [];
let scientificHistory = [];
let solverHistory = [];
let graphHistory = [];
let currencyHistory = [];

// Separate state for each calculator type
let basicState = { expression: '', result: '0' };
let scientificState = { expression: '', result: '0' };
let solverState = { expression: '', result: '0' };
let graphState = { expression: '', result: '0' };
let currencyState = { expression: '', result: '0' };

let historyIndex = -1;
let currentTab = 'basic';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set up tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Load exchange rates
    loadExchangeRates();

    // Initialize with basic tab
    currentTab = 'basic';
    restoreCurrentTabState();
    
    // Update display
    updateDisplay();
});

// Tab Switching
function switchTab(tabName) {
    // Save current tab's state before switching
    saveCurrentTabState();
    
    // Switch to new tab
    currentTab = tabName;
    historyIndex = -1;
    
    // Restore new tab's state
    restoreCurrentTabState();
    
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update content
    document.querySelectorAll('.calc-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    // Always update display when switching tabs to show correct history
    updateDisplay();
}

// Save current tab's state
function saveCurrentTabState() {
    const state = {
        expression: currentExpression,
        result: currentResult
    };
    
    switch(currentTab) {
        case 'basic':
            basicState = state;
            break;
        case 'scientific':
            scientificState = state;
            break;
        case 'solver':
            solverState = state;
            break;
        case 'graph':
            graphState = state;
            break;
        case 'currency':
            currencyState = state;
            break;
    }
}

// Restore current tab's state
function restoreCurrentTabState() {
    let state;
    
    switch(currentTab) {
        case 'basic':
            state = basicState;
            break;
        case 'scientific':
            state = scientificState;
            break;
        case 'solver':
            state = solverState;
            break;
        case 'graph':
            state = graphState;
            break;
        case 'currency':
            state = currencyState;
            break;
        default:
            state = { expression: '', result: '0' };
    }
    
    currentExpression = state.expression;
    currentResult = state.result;
}

// Calculator Functions
function appendNumber(num) {
    // Reset history navigation when typing
    historyIndex = -1;
    
    if (currentExpression === '' && currentResult !== '0' && currentResult !== 'Error') {
        // Starting fresh after a result - clear the result
        currentResult = '0';
    }
    currentExpression += num;
    saveCurrentTabState();
    updateDisplay();
}

function appendOperator(op) {
    // Reset history navigation when typing
    historyIndex = -1;
    
    if (currentExpression === '' && currentResult !== '0' && currentResult !== 'Error') {
        // Use previous result in new calculation
        currentExpression = currentResult;
    }
    
    // Replace × and ÷ with * and /
    if (op === '×') op = '*';
    if (op === '÷') op = '/';
    if (op === '−') op = '-';
    
    currentExpression += op;
    saveCurrentTabState();
    updateDisplay();
}

function appendFunction(func) {
    // Reset history navigation when typing
    historyIndex = -1;
    
    if (func === 'Math.PI') {
        currentExpression += Math.PI;
    } else if (func === 'Math.E') {
        currentExpression += Math.E;
    } else {
        currentExpression += func;
    }
    saveCurrentTabState();
    updateDisplay();
}

function clearAll() {
    currentExpression = '';
    currentResult = '0';
    historyIndex = -1;
    
    // Clear history for current tab only
    switch(currentTab) {
        case 'basic':
            basicHistory = [];
            basicState = { expression: '', result: '0' };
            break;
        case 'scientific':
            scientificHistory = [];
            scientificState = { expression: '', result: '0' };
            break;
        case 'solver':
            solverHistory = [];
            solverState = { expression: '', result: '0' };
            break;
        case 'graph':
            graphHistory = [];
            graphState = { expression: '', result: '0' };
            break;
        case 'currency':
            currencyHistory = [];
            currencyState = { expression: '', result: '0' };
            break;
    }
    
    updateDisplay();
}

function deleteLast() {
    // Reset history navigation when editing
    historyIndex = -1;
    
    currentExpression = currentExpression.slice(0, -1);
    saveCurrentTabState();
    updateDisplay();
}

function calculate() {
    if (currentExpression === '') return;
    
    try {
        // Prepare expression for evaluation
        let expr = currentExpression;
        let displayExpression = currentExpression; // Save for history
        
        // Replace common functions
        expr = expr.replace(/sin\(/g, 'Math.sin(');
        expr = expr.replace(/cos\(/g, 'Math.cos(');
        expr = expr.replace(/tan\(/g, 'Math.tan(');
        expr = expr.replace(/asin\(/g, 'Math.asin(');
        expr = expr.replace(/acos\(/g, 'Math.acos(');
        expr = expr.replace(/atan\(/g, 'Math.atan(');
        expr = expr.replace(/log\(/g, 'Math.log10(');
        expr = expr.replace(/ln\(/g, 'Math.log(');
        expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
        expr = expr.replace(/\^/g, '**');
        
        // Evaluate
        let result = eval(expr);
        
        // Format result
        if (typeof result === 'number') {
            if (!isFinite(result)) {
                currentResult = 'Error';
            } else {
                currentResult = parseFloat(result.toFixed(10)).toString();
                
                // Save to history based on current tab
                const historyItem = {
                    expression: displayExpression,
                    result: currentResult
                };
                
                if (currentTab === 'basic') {
                    basicHistory.push(historyItem);
                } else if (currentTab === 'scientific') {
                    scientificHistory.push(historyItem);
                }
                
                historyIndex = -1; // Reset history navigation
            }
        } else {
            currentResult = result.toString();
        }
        
        currentExpression = '';
    } catch (error) {
        currentResult = 'Error';
        currentExpression = '';
    }
    
    saveCurrentTabState();
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('expression').textContent = currentExpression || '';
    document.getElementById('result').textContent = currentResult;
    
    // Update history panel with current tab's history
    const historyPanel = document.getElementById('history-panel');
    let currentHistory = getCurrentHistory();
    
    if (currentHistory.length > 0) {
        const lastThree = currentHistory.slice(-3).reverse();
        let historyHTML = lastThree.map(item => 
            `<div style="opacity: 0.7; margin: 2px 0;">${item.expression} = ${item.result}</div>`
        ).join('');
        historyHTML += '<div style="opacity: 0.5; font-size: 10px; margin-top: 3px;">↑↓ Navigate history</div>';
        historyPanel.innerHTML = historyHTML;
    } else {
        historyPanel.innerHTML = '';
    }
}

// Get history for current tab
function getCurrentHistory() {
    switch(currentTab) {
        case 'basic':
            return basicHistory;
        case 'scientific':
            return scientificHistory;
        case 'solver':
            return solverHistory;
        case 'graph':
            return graphHistory;
        case 'currency':
            return currencyHistory;
        default:
            return [];
    }
}

// Equation Solver
function solveEquation() {
    const equationInput = document.getElementById('equation-input').value;
    const solutionDiv = document.getElementById('solution');
    const stepsDiv = document.getElementById('steps');
    
    if (!equationInput) {
        solutionDiv.textContent = 'Please enter an equation';
        stepsDiv.textContent = '';
        return;
    }
    
    try {
        // Parse equation (split by =)
        const parts = equationInput.split('=');
        if (parts.length !== 2) {
            throw new Error('Invalid equation format. Use format: expression = value');
        }
        
        const leftSide = parts[0].trim();
        const rightSide = parseFloat(parts[1].trim());
        
        if (isNaN(rightSide)) {
            throw new Error('Right side must be a number');
        }
        
        // Solve using numerical method (Newton-Raphson)
        const solution = solveForX(leftSide, rightSide);
        
        if (solution !== null) {
            solutionDiv.textContent = `x = ${solution.toFixed(6)}`;
            
            // Save to solver history
            solverHistory.push({
                expression: equationInput,
                result: `x = ${solution.toFixed(6)}`
            });
            updateDisplay();
            
            // Verify solution
            const verification = evaluateExpression(leftSide, solution);
            stepsDiv.innerHTML = `
                <strong>Solution Steps:</strong><br>
                1. Original equation: ${equationInput}<br>
                2. Solving for x...<br>
                3. Found: x ≈ ${solution.toFixed(6)}<br>
                4. Verification: ${leftSide.replace(/x/g, solution.toFixed(6))} = ${verification.toFixed(6)}<br>
                5. Expected: ${rightSide}<br>
                6. Error: ${Math.abs(verification - rightSide).toFixed(8)}
            `;
        } else {
            solutionDiv.textContent = 'No solution found';
            stepsDiv.textContent = 'Unable to find a solution. Try a different equation or check the format.';
        }
    } catch (error) {
        solutionDiv.textContent = 'Error';
        stepsDiv.textContent = error.message;
    }
}

function solveForX(expression, target) {
    // Newton-Raphson method
    let x = 0; // Initial guess
    const maxIterations = 1000;
    const tolerance = 0.000001;
    const h = 0.0001; // Small value for numerical derivative
    
    for (let i = 0; i < maxIterations; i++) {
        const fx = evaluateExpression(expression, x) - target;
        
        if (Math.abs(fx) < tolerance) {
            return x;
        }
        
        // Numerical derivative
        const fxh = evaluateExpression(expression, x + h) - target;
        const derivative = (fxh - fx) / h;
        
        if (Math.abs(derivative) < 1e-10) {
            // Try different starting point
            x = Math.random() * 20 - 10;
            continue;
        }
        
        x = x - fx / derivative;
        
        // Bounds check
        if (Math.abs(x) > 1e6) {
            x = Math.random() * 20 - 10;
        }
    }
    
    return null;
}

function evaluateExpression(expr, xValue) {
    try {
        // Replace x with value
        let evalExpr = expr.replace(/x/g, `(${xValue})`);
        
        // Replace functions
        evalExpr = evalExpr.replace(/sin\(/g, 'Math.sin(');
        evalExpr = evalExpr.replace(/cos\(/g, 'Math.cos(');
        evalExpr = evalExpr.replace(/tan\(/g, 'Math.tan(');
        evalExpr = evalExpr.replace(/sqrt\(/g, 'Math.sqrt(');
        evalExpr = evalExpr.replace(/log\(/g, 'Math.log10(');
        evalExpr = evalExpr.replace(/ln\(/g, 'Math.log(');
        evalExpr = evalExpr.replace(/\^/g, '**');
        
        return eval(evalExpr);
    } catch (error) {
        throw new Error('Invalid expression');
    }
}

// Graph Plotter
function plotGraph() {
    const functionInput = document.getElementById('function-input').value;
    const xMin = parseFloat(document.getElementById('x-min').value);
    const xMax = parseFloat(document.getElementById('x-max').value);
    const canvas = document.getElementById('graph-canvas');
    const ctx = canvas.getContext('2d');
    
    if (!functionInput) {
        alert('Please enter a function');
        return;
    }
    
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height, xMin, xMax);
    
    // Plot function
    try {
        plotFunction(ctx, canvas.width, canvas.height, xMin, xMax, functionInput);
        
        // Save to graph history
        graphHistory.push({
            expression: `f(x) = ${functionInput}`,
            result: `[${xMin}, ${xMax}]`
        });
        updateDisplay();
    } catch (error) {
        alert('Error plotting function: ' + error.message);
    }
}

function drawGrid(ctx, width, height, xMin, xMax) {
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();
    
    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }
    
    for (let i = 0; i < height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }
    
    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText('0', centerX + 5, centerY - 5);
    ctx.fillText(xMin.toFixed(1), 5, centerY - 5);
    ctx.fillText(xMax.toFixed(1), width - 40, centerY - 5);
}

function plotFunction(ctx, width, height, xMin, xMax, funcStr) {
    const scaleX = width / (xMax - xMin);
    const scaleY = height / 20; // Assuming y range of -10 to 10
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let firstPoint = true;
    
    for (let px = 0; px < width; px++) {
        const x = xMin + px / scaleX;
        
        try {
            const y = evaluateFunctionForGraph(funcStr, x);
            
            if (isFinite(y)) {
                const py = centerY - y * scaleY;
                
                if (py >= 0 && py <= height) {
                    if (firstPoint) {
                        ctx.moveTo(px, py);
                        firstPoint = false;
                    } else {
                        ctx.lineTo(px, py);
                    }
                } else {
                    firstPoint = true;
                }
            } else {
                firstPoint = true;
            }
        } catch (error) {
            firstPoint = true;
        }
    }
    
    ctx.stroke();
}

function evaluateFunctionForGraph(funcStr, x) {
    let expr = funcStr.replace(/x/g, `(${x})`);
    
    // Replace functions
    expr = expr.replace(/sin\(/g, 'Math.sin(');
    expr = expr.replace(/cos\(/g, 'Math.cos(');
    expr = expr.replace(/tan\(/g, 'Math.tan(');
    expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
    expr = expr.replace(/log\(/g, 'Math.log10(');
    expr = expr.replace(/ln\(/g, 'Math.log(');
    expr = expr.replace(/abs\(/g, 'Math.abs(');
    expr = expr.replace(/\^/g, '**');
    
    return eval(expr);
}

// Currency Converter
async function loadExchangeRates() {
    try {
        // Using Exchange Rate API (free tier)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        exchangeRates = data.rates;
        convertCurrency();
    } catch (error) {
        console.error('Error loading exchange rates:', error);
        // Fallback rates
        exchangeRates = {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            JPY: 149.50,
            INR: 83.12,
            AUD: 1.52,
            CAD: 1.36,
            CHF: 0.88,
            CNY: 7.24,
            KRW: 1329.50
        };
        convertCurrency();
    }
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    if (isNaN(amount) || amount < 0) {
        document.querySelector('.converted-amount').textContent = '0.00';
        return;
    }
    
    if (Object.keys(exchangeRates).length === 0) {
        document.querySelector('.converted-amount').textContent = 'Loading...';
        return;
    }
    
    // Convert from source currency to USD, then to target currency
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];
    
    // Display result
    document.querySelector('.converted-amount').textContent = 
        convertedAmount.toFixed(2) + ' ' + toCurrency;
    
    // Display exchange rate
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    document.getElementById('exchange-rate').textContent = 
        `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    
    // Save to currency history only if amount is valid
    if (amount > 0) {
        const historyItem = {
            expression: `${amount.toFixed(2)} ${fromCurrency}`,
            result: `${convertedAmount.toFixed(2)} ${toCurrency}`
        };
        
        // Only add if it's different from the last entry
        const lastEntry = currencyHistory[currencyHistory.length - 1];
        if (!lastEntry || lastEntry.expression !== historyItem.expression || lastEntry.result !== historyItem.result) {
            currencyHistory.push(historyItem);
            if (currencyHistory.length > 50) { // Limit to 50 entries
                currencyHistory.shift();
            }
            updateDisplay();
        }
    }
}

// Keyboard Support
document.addEventListener('keydown', function(event) {
    const activeTab = document.querySelector('.calc-content.active').id;
    
    // Arrow key navigation works for all calculator tabs
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        navigateHistory('up');
        return;
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        navigateHistory('down');
        return;
    }
    
    // Other keyboard shortcuts only for basic and scientific calculators
    if (activeTab !== 'basic' && activeTab !== 'scientific') return;
    
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// History Navigation
function navigateHistory(direction) {
    let currentHistory = getCurrentHistory();
    if (currentHistory.length === 0) return;
    
    if (direction === 'up') {
        if (historyIndex < currentHistory.length - 1) {
            historyIndex++;
        }
    } else if (direction === 'down') {
        if (historyIndex > 0) {
            historyIndex--;
        } else {
            // Clear when reaching the bottom
            historyIndex = -1;
            currentExpression = '';
            currentResult = '0';
            saveCurrentTabState(); // Save the cleared state
            updateDisplay();
            return;
        }
    }
    
    if (historyIndex >= 0) {
        const historyItem = currentHistory[currentHistory.length - 1 - historyIndex];
        currentExpression = historyItem.expression;
        currentResult = historyItem.result;
        saveCurrentTabState(); // Save the navigated state
        updateDisplay();
    }
}
