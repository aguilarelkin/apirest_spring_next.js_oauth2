"use client";

import { CustomId } from "@/modules/entity/data";

function ProtEdit({ params }: CustomId) {
    const { id }: any = params;
    const { dat }: any = params;

    return (
        <>

        <div>

            <h1 className="uppercase text-center text-white truncate text-7xl font-mono font-black m-12 ">Crear </h1>  <h1 className="uppercase text-center  text-white truncate text-7xl font-mono font-black m-12 ">Actualizar </h1>
        </div>

        {


            <center>
                <div className="container  text-left lg:px-96 lg:w-4/5 sm:p-6 md:p-8 ">
                    <form //onSubmit={enviar} 
                    >
                        {

                            <div className="relative z-0 w-full mb-6 group">
                                <input //onChange={(e) => { setId(e.target.value) }} value={id} 
                                    type="text" disabled name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ID</label>
                            </div>

                        }

                        <div className="relative z-0 w-full mb-6 group">
                            <input //onChange={(e) => { setNombre(e.target.value) }} value={nombre} 
                                type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input //onChange={(e) => { setPrecio(e.target.value) }} value={precio} 
                                type="number" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Precio</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input //onChange={(e) => { setCantidad(e.target.value); setCantidadReal(e.target.value) }} value={cantidad} 
                                type="number" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cantidad</label>
                        </div>
                        <center>
                            <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar</button>
                        </center>
                    </form>
                </div>
            </center>

        }

        {

            <center>
                <div className="container  text-left lg:px-96 lg:w-4/5 sm:p-6 md:p-8">
                    <form //onSubmit={enviarImagen}
                    >
                        <div className="h-48 mt-12 bg-no-repeat flex justify-center bg-right">
                            <img src={"http://localhost:8080/api/v1/uploads/img/"} alt="" />
                        </div>
                        <label className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white" htmlFor="file_input">Subir archivo</label>
                        <input //onChange={(e) => { seleccionarFoto(e) }} 
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                        <div className="m-6 text-center">
                            <button className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
                        </div>
                    </form>
                    <div>

                    </div>
                </div>
            </center>

        }

        <div>Cargando...</div>

    </>
    );
}
export default ProtEdit;