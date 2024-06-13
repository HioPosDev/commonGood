import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductSection = () => {
  const [vibracionActiva, setVibracionActiva] = useState(false);

  // Función para simular la recepción de estado "ready" desde el backend
  const simularEstadoReady = () => {
    if (vibracionActiva) {
      navigator.vibrate([1000]); // Activar vibración cuando un producto está listo

      // Mostrar notificación usando react-toastify
      toast.success('¡Producto listo!', { autoClose: 3000 });
    }
  };

  const handleAccederProductos = () => {
    navigator.vibrate([800, 200, 800]); // Iniciar la vibración al acceder al apartado de productos
    setVibracionActiva(true);
    mostrarProductos(); // Función para mostrar productos
  };

  const mostrarProductos = () => {
    // Implementa la lógica para mostrar productos
  };

  return (
    <div>
      <h2>Sección de Productos</h2>
      <button onClick={handleAccederProductos}>Acceder a Productos</button>
      <br />
      <button onClick={simularEstadoReady}>Simular Producto Ready</button>
      <ToastContainer /> {/* Componente de react-toastify para mostrar las notificaciones */}
    </div>
  );
};

export default ProductSection;
