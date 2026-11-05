
import { useState } from 'react'

const App = () => {
  const API_URL = 'https://calculator-mtq1.onrender.com'

  const [display, setDisplay] = useState('0')
  const [firstNum, setFirstNum] = useState(null)
  const [operator, setOperator] = useState('')
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('')
  const [isNewNumber, setIsNewNumber] = useState(false)

  const handleNumber = (num) => {
    if (isNewNumber) {
      setDisplay(num)
      setIsNewNumber(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }

    setResult('')

    if (operator === 'percentage') {
      setExpression(`${firstNum}% of ${isNewNumber ? num : display === '0' ? num : display + num}`)
    } else if (operator) {
      setExpression(`${firstNum} ${operator} ${isNewNumber ? num : display === '0' ? num : display + num}`)
    } else {
      setExpression(isNewNumber ? num : display === '0' ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (isNewNumber) {
      setDisplay('0.')
      setIsNewNumber(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }

    setResult('')
  }

  const chooseOperator = (op) => {
    const number = result !== '' ? result : display

    setFirstNum(number)
    setOperator(op)
    setExpression(
      op === 'percentage' ? `${number}% of` : `${number} ${op}`
    )
    setDisplay('0')
    setResult('')
    setIsNewNumber(true)
  }

  const calculate = async () => {
    if (firstNum === null || !operator || isNewNumber) return

    const endpoints = {
      '+': 'add',
      '-': 'sub',
      '*': 'multiply',
      '/': 'divide',
      'mod': 'module',
      'percentage': 'percentage'
    }

    if ((operator === '/' || operator === 'mod') && Number(display) === 0) {
      setResult(operator === '/' ? 'Cannot divide by zero' : 'Invalid modulo')
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/${endpoints[operator]}/${firstNum}/${display}`
      )

      const data = await response.json()

      setExpression(
        operator === 'percentage'
          ? `${firstNum}% of ${display}`
          : `${firstNum} ${operator} ${display}`
      )

      if (!response.ok) {
        setResult(data.message || data.error || 'Error')
      } else {
        setResult(String(data.data))
      }

      setFirstNum(null)
      setOperator('')
      setIsNewNumber(true)

    } catch (error) {
      setResult('Server Error')
      console.log(error)
    }
  }

  const calculateSquare = async () => {
    const number = result !== '' ? result : display

    try {
      const response = await fetch(
        `${API_URL}/square/${number}`
      )

      const data = await response.json()

      setExpression(`${number}²`)

      if (!response.ok) {
        setResult(data.message || data.error || 'Error')
      } else {
        setResult(String(data.data))
      }

      setFirstNum(null)
      setOperator('')
      setIsNewNumber(true)

    } catch (error) {
      setResult('Server Error')
      console.log(error)
    }
  }

  const clear = () => {
    setDisplay('0')
    setFirstNum(null)
    setOperator('')
    setExpression('')
    setResult('')
    setIsNewNumber(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 p-4">

      <div className="w-80 bg-slate-900 p-6 rounded-2xl shadow-xl">

        <h1 className="text-white text-2xl text-center mb-5">
          Calculator
        </h1>

        <div className="bg-slate-700 rounded-lg p-4 mb-5 text-right">

          <p className="text-slate-300 text-xl min-h-8 break-all">
            {expression}
          </p>

          <p className="text-white text-5xl font-bold mt-4 min-h-16 break-all">
            {result}
          </p>

        </div>

        <div className="grid grid-cols-4 gap-3">

          <button onClick={clear} className="bg-red-400 p-4 rounded-lg">AC</button>
          <button onClick={() => chooseOperator('mod')} className="bg-blue-300 p-4 rounded-lg">mod</button>
          <button onClick={() => chooseOperator('percentage')} className="bg-blue-300 p-4 rounded-lg">%</button>
          <button onClick={calculateSquare} className="bg-blue-300 p-4 rounded-lg">x²</button>
          <button onClick={() => handleNumber('7')} className="bg-white p-4 rounded-lg">7</button>
          <button onClick={() => handleNumber('8')} className="bg-white p-4 rounded-lg">8</button>
          <button onClick={() => handleNumber('9')} className="bg-white p-4 rounded-lg">9</button>
          <button onClick={() => chooseOperator('/')} className="bg-blue-300 p-4 rounded-lg">÷</button>
          <button onClick={() => handleNumber('4')} className="bg-white p-4 rounded-lg">4</button>
          <button onClick={() => handleNumber('5')} className="bg-white p-4 rounded-lg">5</button>
          <button onClick={() => handleNumber('6')} className="bg-white p-4 rounded-lg">6</button>
          <button onClick={() => chooseOperator('*')} className="bg-blue-300 p-4 rounded-lg">×</button>
          <button onClick={() => handleNumber('1')} className="bg-white p-4 rounded-lg">1</button>
          <button onClick={() => handleNumber('2')} className="bg-white p-4 rounded-lg">2</button>
          <button onClick={() => handleNumber('3')} className="bg-white p-4 rounded-lg">3</button>
          <button onClick={() => chooseOperator('-')} className="bg-blue-300 p-4 rounded-lg">−</button>
          <button onClick={() => handleNumber('0')} className="bg-white p-4 rounded-lg col-span-2">0</button>
          <button onClick={handleDecimal} className="bg-white p-4 rounded-lg">.</button>
          <button onClick={() => chooseOperator('+')} className="bg-blue-300 p-4 rounded-lg">+</button>
          <button onClick={calculate} className="bg-green-400 p-4 rounded-lg col-span-4">=</button>

        </div>

      </div>
    </div>
  )
}

export default App
