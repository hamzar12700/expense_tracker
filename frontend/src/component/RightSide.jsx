import React, { useState } from 'react'

const RightSide = () => {

  const [formData, setFormData] = useState({
    item: "",
    amount: 0,
    category: ""
  })

  const [formSubmit, setFormSubmit] = useState([])



  const submitHandler = () => {
    const { item, amount, category } = formData
    if (!item || amount <= 0 || !category) {
      alert("please fill your form data")
      return
    }

    setFormSubmit(prev => [...prev, { ...formData }]);

    console.log(formSubmit);
    setFormData({
      item: "",
      amount: 0,
      category: ""
    })

  }
  return (
    <div className='my-10 mx-10'>
      <h1 className='text-2xl my-10'>Your Todo List:</h1>

      <div className='flex gap-2'>

        {/* enter your item.......... */}
        <input type="text" className='w-full px-3 py-2 border rounded-md focus:border-green-600 focus:outline-none' placeholder='enter your item name'
        value={formData.item}
          onChange={(e) => setFormData({ ...formData, item: e.target.value })} />
        {/* <input type="checkbox" /> */}

        {/* dropdown list.......... */}
        <select
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        value={formData.category}
          name="" id="" className='w-full px-3 py-2 border rounded-md focus:border-green-600 focus:outline-none'>
          <option value="" disabled selected>select an item</option>
          <option value="laptop">laptop</option>
          <option value="mouse">mouse</option>
        </select>

        {/* enter your amount.......... */}
        <input
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          type="text"
          inputMode="numeric"
        value={formData.amount}
          pattern="[0-9]*"
          placeholder="Enter your amount"
          className="w-full px-3 py-2 border rounded-md focus:border-green-600 focus:outline-none"
        />

        <button className='border px-5 hover:bg-transparent hover:text-black rounded cursor-pointer border-green-600 transition-all duration-300 ease-in bg-green-600 text-white py-2' onClick={submitHandler}>Add</button>
      </div>

      <div className='min-h-110 mt-2'>
        {formSubmit.map((items, index) => {
          return <div className='w-full border border-green-600 text-black h-20 mb-3 flex items-center
           justify-between rounded px-5'>
            <h1>{items.item}</h1>
            <h1>{items.amount}</h1>
            <h1>{items.category}</h1>
          </div>
        })}
      </div>

    </div>
  )

}
export default RightSide