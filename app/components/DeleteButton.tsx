

import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteAplicacion, deleteCultivo, deleteParcela, deleteProducto, deleteSector, deleteUsuario } from '../lib/api';
import ConfirmModal from './ConfirmarModal';

type DeleteButtonProps = {
  id: number;
  onDeleted?: () => void;
  className?: string;
  tipo?: string;
};

export default function DeleteButton({ id, onDeleted, className, tipo }: DeleteButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    if (tipo === 'Cultivo') {
      await deleteCultivo(id);
    }
    if (tipo === 'Producto') {
      await deleteProducto(id);
    }
    if (tipo === 'Parcela') {
      await deleteParcela(id);
    }
    if (tipo === 'Sector') {
      await deleteSector(id);
    }
    if (tipo === 'Aplicacion') {
      await deleteAplicacion(id);
    }
    if (tipo === 'Usuario') {
      await deleteUsuario(id);
    }

    setShowModal(false);
    onDeleted?.();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={className ?? 'bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded transition'}
      >
        <FaTrash className="w-5 h-5" />
      </button>

      <ConfirmModal
        visible={showModal}
        title="Confirmar cambio"
        message={`¿Estás seguro de que deseas eliminar el registro`}
        onConfirm={handleSubmit}
        onCancel={closeModal}
      />
    </>
  );
}

