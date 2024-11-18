import React from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter();
    const navigation = [
      { name: 'Home', href: '/automation' },
      { name: 'Workflow', href: '/workflow' },
      { name: 'Company', href: '#' },
      { name: 'Contact Us', href: '#' },
    ]
  return (
    <>
 <header className="">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              {/* <Bars3Icon aria-hidden="true" className="h-6 w-6" /> */}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link href={item.href} key={item.name}  className=" hover:bg-purple-100 p-2 rounded-lg text-sm/6 font-semibold text-gray-900 cursor-pointer">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href={'/login'} className="  hover:bg-purple-100 p-2 rounded-lg text-sm/6 font-semibold text-gray-900 cursor-pointer">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
       
      </header>
    </>
  )
}

export default Navbar