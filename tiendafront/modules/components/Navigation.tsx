import { Collapse } from 'flowbite';
import { Dropdown } from 'flowbite';
import Link from "next/link";
import { logoutAuth } from "../close/logout";

function Navigation({ /* user, */ sesion, roles }: any) {
    // set the dropdown menu element
    const $targetEl = document.getElementById('user-dropdown');

    // set the element that trigger the dropdown menu on click
    const $triggerEl = document.getElementById('user-menu-button');

    // options with default values
    const options = {
        onHide: () => {
            console.log('dropdown has been hidden');
        },
        onShow: () => {
            console.log('dropdown has been shown');
        },
        onToggle: () => {
            console.log('dropdown has been toggled');
        }
    };
    const dropdown = new Dropdown($targetEl, $triggerEl, options);
    return (<>

        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900" >
            {sesion ?
                <>

                    <div className="container flex flex-wrap  justify-between">
                        <a href="http://localhost:3000/main" className="flex items-center">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTauzsPwOXL1qy2aUuujR3mrvf0Ow2cK1oTpA&usqp=CAU" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">BUSINESS</span>
                        </a>
                        <div className="  flex justify-between block order-last border border-gray-100 rounded-lg bg-gray-50 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <div className="order-last">     
                            <a href={"/main"} className="w-24  p-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Inicio</a>
                            </div>
                            {roles.length > 0 && roles.includes('ROLE_ADMIN')
                                ?
                                <>

                                    <div>
                                        <a href={"/create"} className="w-24 p-4 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Crear Producto</a>
                                    </div>
                                    <div>
                                        <a href="#" className="p-4 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Precios</a>
                                    </div>
                                    <div>
                                        <a href="#" className="p-4 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contacto</a>
                                    </div>
                                </>

                                :
                                <></>
                            }
                        </div>

                        <div className="flex justify-between">
                            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                <span className="sr-only"></span>
                                <img className="w-8 h-8 rounded-full" src={"http://localhost:8080/images/image.png"} alt="user photo" />
                            </button>

                            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">@♦☻{/* {user} */}</span>
                                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400"></span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Panel</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Configuración</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Ingresos</a>
                                    </li>
                                    <li>
                                        <Link onClick={() => logoutAuth()} href={"/"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </>
                :
                <>
                    <div className="container flex flex-wrap items-center justify-between mx-auto">
                        <a href="http://127.0.0.1:3000/" className="flex items-center">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTauzsPwOXL1qy2aUuujR3mrvf0Ow2cK1oTpA&usqp=CAU" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">BUSINESS</span>
                        </a>

                        <div className="flex items-center md:order-2">
                            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                                <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    <li>
                                        <a href={"/"} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">LOGIN</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            }
        </nav>
    </>)
}
export default Navigation;