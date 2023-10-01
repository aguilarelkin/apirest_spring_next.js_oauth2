"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createImage, createProducts } from "@/modules/services/productoService";
import { hasRole, isAutenticated } from "@/modules/auth/authenticated";
import generar from "@/modules/auth/oauth";

function Create() {
    const [id, setId] = useState<string>("");
    const [nombre, setNombre] = useState<string>("");
    const [precio, setPrecio] = useState<string | number>("");
    const [cantidad, setCantidad] = useState<string | number>("");
    const [imagen, setImagen] = useState<string | null>();

    const [role, setRoles] = useState<string[]>([]);

    const [createImg, setCreateImg] = useState<boolean>(false);

    const router = useRouter();

    useEffect(
        () => {
            if (isAutenticated()) {
                //  setLog(true);
                if (!hasRole().includes('ROLE_ADMIN')) {
                    router.push('/main');
                    alert("Operación incorrecta");
                } else {
                    setRoles(hasRole());
                }

                //findProducts();
            } /* else {
                generar();
            } */
        }, []
    );

    const createProduct = async (event: any): Promise<void> => {
        event.preventDefault();

        const data: String = JSON.stringify(
            {
                nombre,
                precio,
                cantidad,
                "imagen": "image.png",
            }

        );
        try {
            let response: Response | undefined = await createProducts(data);
            let json;

            if (response?.status === 200) {
                json = await response.json();

                alert("Producto creado")
                console.log(json.cliente.id)
                setId(json.cliente.id);
                setCreateImg(true);

            } else {
                console.log("Error")
            }
            if (response?.status === 500) {
                alert("Producto registrado")
            }

        } catch (error) {

        }


    }

    const enviarImagen = async (event: any) => {
        event.preventDefault();

        if (!imagen) {
            alert("SELECCIONAR IMAGEN NO DOCUMETOS O VIDEOS O DEJAR CAMPO VACIÓ ")
        } else {
            let formData = new FormData();
            formData.append("archivo", imagen);
            formData.append("id", id);

            try {
                let response: Response | undefined = await createImage(formData);

                if (response?.status === 201) {
                    alert("Imagen agregada")
                    router.push(`/`)
                }
            } catch (error) {

            }
        }
    }

    const seleccionarFoto = (event: any) => {
        if (event.target.files != undefined && event.target.files.length > 0) {
            if (event.target.files) {
                console.log(event.target.files[0].type.indexOf("image") >= 0)
                if (event.target.files[0].type.indexOf("image") >= 0) {
                    setImagen(event.target.files[0])
                } else {
                    setImagen(null);
                    alert("SELECCIONAR IMAGEN")
                    //Swal.fire('Error', 'Seleccinar una imagen', 'error');
                }

            }
        }
    }

    return (

        <>
            {
                role.length > 0
                    ?
                    <>
                        <div>

                            {createImg
                                ?
                                <h1 className="uppercase text-center text-white truncate text-7xl font-mono font-black m-12 ">Imagen</h1>
                                :
                                <h1 className="uppercase text-center text-white truncate text-7xl font-mono font-black m-12 ">Crear </h1>
                            }
                        </div>
                        {
                            !createImg
                                ?
                                <center>
                                    <div className="container  text-left lg:px-96 lg:w-4/5 sm:p-6 md:p-8 ">
                                        <form onSubmit={createProduct}
                                        >
                                            {

                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input onChange={(e) => { setId(e.target.value) }} value={id}
                                                        type="text" disabled name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ID</label>
                                                </div>

                                            }
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input onChange={(e) => { setNombre(e.target.value) }} value={nombre}
                                                    type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input onChange={(e) => { setPrecio(e.target.value) }} value={precio}
                                                    type="number" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Precio</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input onChange={(e) => { setCantidad(e.target.value) }} value={cantidad}
                                                    type="number" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cantidad</label>
                                            </div>
                                            <center>
                                                <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar</button>
                                            </center>
                                        </form>
                                    </div>
                                </center>
                                :
                                <center>
                                    <div className="container  text-left lg:px-96 lg:w-4/5 sm:p-6 md:p-8">
                                        <form onSubmit={enviarImagen}
                                        >
                                            <label className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white" htmlFor="file_input">Subir archivo</label>
                                            <input onChange={(e) => { seleccionarFoto(e) }}
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
                    </>
                    :
                    <h1>Cargando..s.</h1>
            }
        </>

    );
}

export default Create;