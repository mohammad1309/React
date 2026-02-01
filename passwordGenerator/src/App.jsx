import { useState, useCallback, useEffect, useRef } from "react"
import "./App.css"


function App() {

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passRef = useRef(null)

  const passGenerator = useCallback (() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) {
      str += "0123456789"
    }
    if (character) {
      str += "!@#$%^&*()_+~`|}{[]:;?><,./-="
    }
    let pass = ""
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    } 
    setPassword(pass)

  }, [length, number, character, setPassword])

  
   const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passGenerator()
  }, [length, number, character, passGenerator])

  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-4 my-8 text-orange-500 bg-gray-900 text-center">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden my-3 mx-2">
        <input 
        type="text"  
        value={password} 
        className="w-full py-1 px-3 outline-none rounded-l-lg text-gray-700 bg-gray-100 " 
        placeholder="Password"
        ref={passRef}
        readOnly 
        />
        <button 
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-1.5 shrink-0 rounded-r-lg ">Copy</button>
      </div>

      <div className='flex items-center justify-between gap-x-4 text-sm mt-3'>
        <div className='flex items-center gap-x-2 mb-3'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label className="text-white">Length: {length}</label>
        </div>

      <div className="flex items-center gap-x-1 mb-3 ">
      <input
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={() => {
              setNumber((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>

      <div className="flex items-center gap-x-1 mb-3">
          <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                  setCharacter((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
      </div>

     </div>

    </>
  )
}

export default App
