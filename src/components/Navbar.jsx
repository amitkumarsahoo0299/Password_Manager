import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-500'>  &lt;</span>
         
          Pass
          <span className='text-green-500'>OP/&gt;</span>
         

        </div>
      <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li>
      </ul>
      <button className='text-white bg-green-500 my-5 rounded-full flex justify-between items-center ring-white ring-1'>
        <img className="invert p-3 w-12" src="/icons/github.png" alt="github"  />
        <span className="font-bold px-2"><a href="https://github.com/amitkumarsahoo0299" target="_blank">GitHub</a></span>
      </button>
      </div>
    </nav>
  )
}

export default Navbar
