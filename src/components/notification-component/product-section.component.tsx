import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductSection = () => {
  const [vibracionActiva, setVibracionActiva] = useState(false);
  const [productsReady, setProductsReady] = useState(false);

  // Función para simular la recepción de estado "ready" desde el backend
  useEffect(() => {
    if (vibracionActiva && productsReady) {
      navigator.vibrate([800, 200, 800]) // Activar vibración cuando un producto está listo

    // Mostrar notificación usando react-toastify
    toast.success('¡Producto listo!', { autoClose: 3000 });
  }
  }, [productsReady, vibracionActiva])

  const handleAccederProductos = () => {
    // navigator.vibrate([800, 200, 800]); // Iniciar la vibración al acceder al apartado de productos
    setTimeout(() => setProductsReady(true), 30000);
    setVibracionActiva(true);
  };


  return (
    <div>
      <h2>Sección de Productos</h2>
      <button onClick={handleAccederProductos}>Acceder a Productos</button>
      <br />
      {/* <button onClick={simularEstadoReady}>Simular Producto Ready</button> */}
      <ToastContainer /> {/* Componente de react-toastify para mostrar las notificaciones */}
    </div>
  );
};

export default ProductSection;
