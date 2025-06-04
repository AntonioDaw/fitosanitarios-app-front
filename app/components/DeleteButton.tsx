'use client';
import { FaTrash } from 'react-icons/fa';
import { deleteCultivo } from '../helpers/api';

type DeleteButtonProps = {
  id: number;
  onDeleted?: () => void; // función opcional que se llama después de borrar
};

export default function DeleteButton({ id, onDeleted }: DeleteButtonProps) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmed = confirm('¿Estás seguro de que deseas borrar este cultivo?');
    if (!confirmed) return;

    await deleteCultivo(id);
    onDeleted?.();
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded transition"
      >
        <FaTrash className="w-5 h-5" />
      </button>
    </form>
  );
}
