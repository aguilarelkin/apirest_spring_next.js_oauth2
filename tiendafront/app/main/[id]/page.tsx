"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { deleteProductId, findProductPage } from '@/modules/services/productoService';
import { hasRole, isAutenticated } from '@/modules/auth/authenticated';
import generar from '@/modules/auth/oauth';
import { logoutAuth } from '@/modules/close/logout';
import Navigation from '@/modules/components/Navigation';
import { Product } from '@/modules/entity/product';
import { CustomId } from '@/modules/entity/data';
import Pagina from '@/modules/components/Pagina';
import { getNumberPage, setNumberPage } from '@/modules/numberpage/number';

function MainPage({ params }: CustomId) {

    const { id }: any = params;

    const [pagePro, setPagePro] = useState<number>(id);
    const [pageTotal, setPageTotal] = useState<number[]>([]);
    const [total, setTotal] = useState<number>(0);

    const [product, setProduct] = useState<Product[]>();
    const [log, setLog] = useState<boolean>(false);
    const [role, setRoles] = useState<string[]>([]);
    const [auten, setAuten] = useState<boolean | undefined>(false);

    const router = useRouter();

    useEffect(
        () => {

            if (isAutenticated()) {
                setAuten(isAutenticated());
                setLog(true);
                setRoles(hasRole());
                pageChanges();
                findProducts();
            } /* else {
                generar();
            } */

        }, [pagePro]
    );

    const pageChanges = async () => {

        if (pagePro > 0) {
            setNumberPage(id);
            setPagePro(getNumberPage());
        } else if (pagePro == 0) {
            setNumberPage(0);
            setPagePro(getNumberPage());
        }
        if (pagePro == undefined) {
            setPagePro(getNumberPage());
        }
    }

    const update = (id: number) => {
        router.push(`create/${id}`)
    }

    const deleteProduct = async (id: number): Promise<void> => {

        try {
            let response = await deleteProductId(id);

            if (response?.status === 200) {
                alert("Producto eliminado con éxito")
                window.location.reload()

            } else {

            }

        } catch (error) {

        }
    }

    const findProducts = async () => {
        if (pagePro != undefined || id != undefined) {
            try {
                let resopnse: Response | undefined = await findProductPage(id);
                let json;
                if (resopnse?.status === 200) {
                    json = await resopnse.json();
                    setProduct(json.content);
                    calcularPage(json.totalPages, json.totalElements);
                    setTotal(json.totalPages);
                }
            } catch (error) {

            }
        }
    };

    const calcularPage = (total: number, totalEl: number) => {
        let pag;
        let desde = 0;
        let hasta = 0;

        if (Math.floor(pagePro) + 5 <= total) {
            desde = Math.floor(pagePro) + 1;//= total.slice(pagePro-1*5,pagePro*5)// Math.min(Math.max(1, pagePro -3 ), total - 4);
            hasta = Math.floor(pagePro) + 5;//= Math.max(Math.min(total, pagePro  + 3), 5);      
        } else {
            console.log(Math.floor(pagePro) + (total - (Math.floor(pagePro))))
            desde = Math.floor(pagePro) + 1;
            hasta = Math.floor(pagePro) + (total - (Math.floor(pagePro)));//= Math.max(Math.min(total, pagePro  + 3), 5);
        }
        if (total > 4) {
            pag = new Array(hasta - desde + 1).fill(0).map((valor, indice) => indice + desde);
        } else {
            pag = new Array(total).fill(0).map((valor, indice) => indice + 1);
        }
        setPageTotal(pag);
    }

    return (
        <>
            <Navigation /* user={auten ? user : ""} */ sesion={auten} roles={auten ? hasRole() : []} />
            <main className="flex  flex-col items-center justify-between ">

                <div className="p-48 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
                    <div className="mb-32 grid text-center lg:mb-10 lg:grid-cols-1 lg:text-left ">
                        {
                            product !== undefined && product?.length > 0 ?
                                <>
                                    <table className="table-auto  text-left text-gray-500 dark:text-gray-400 mb-3 text-2xl font-semibold">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 mb-3 text-2xl font-semibold">
                                                    Producto
                                                </th>
                                                <th scope="col" className="px-6 py-3 mb-3 text-2xl font-semibold">
                                                    Precio
                                                </th>
                                                <th scope="col" className="px-6 py-3 mb-3 text-2xl font-semibold">
                                                    imagen
                                                </th>
                                                <th scope="col" className="px-6 py-3 mb-3 text-2xl font-semibold">
                                                    cantidad
                                                </th>
                                                {role?.length > 0 && role.includes('ROLE_ADMIN')
                                                    ?
                                                    <th scope="col" className="px-6 py-3 text-center mb-3 text-2xl font-semibold">
                                                        Operaciones
                                                    </th>
                                                    :
                                                    <></>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                product.map(
                                                    (prod, i) => (
                                                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {prod.nombre}
                                                            </th>
                                                            <th className="px-6 py-4">
                                                                {prod.precio}
                                                            </th>
                                                            <th className="px-6 py-4">
                                                                <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
                                                                    <Image
                                                                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                                                        src="/next.svg"
                                                                        alt="Next.js Logo"
                                                                        width={180}
                                                                        height={37}
                                                                        priority
                                                                    />
                                                                </div>
                                                                <img className="p-8 rounded-t-lg" src={"http://localhost:8080/api/v1/uploads/img/" + prod.imagen} alt="product image" />
                                                            </th>
                                                            <th className="px-6 py-4">
                                                                {prod.cantidad}
                                                            </th>
                                                            {role?.length > 0 && role.includes('ROLE_ADMIN')
                                                                ?
                                                                <th className="px-6 py-4 text-right">
                                                                    <div className="justify-items-center ">
                                                                        <button onClick={() => update(prod.id)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Actualizar</button>
                                                                        <button onClick={() => deleteProduct(prod.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                                                                    </div>
                                                                </th>
                                                                :
                                                                <></>}
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <div className="mr-80 ml-80">
                                        <Pagina pageTotal={pageTotal} pagePro={pagePro} total={total} />
                                    </div>
                                </>
                                :
                                <h1>No existe productos registrados</h1>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}
export default MainPage;