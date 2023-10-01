"use client"

import { useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { isAutenticated } from '@/modules/auth/authenticated';
import generar from '@/modules/auth/oauth';

export default function Home() {
  const router = useRouter();

  useEffect(
    () => {
      if (isAutenticated()) {
          //setSesion(isAutenticated());
          // Swal.fire('Login', `${getUsuario().username} ya estás autenticado`, 'info')
          router.push('/main');
      }  else {
          generar();
      } 
  }, []
  );

  return (<></>);
}
