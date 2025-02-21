import React from "react";
import Button from "@/components/Button";
import { useFormContext } from "@/context/FormContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const formContext = useFormContext();
  const error = formContext.error;
  const loading = formContext?.loading;
  // const data = formContext?.formData

  // console.log(data, "formdata")
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Confirm Submission</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to submit the form? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4">
          <Button
            className="px-4 py-2 border border-gray-500 text-gray-700 rounded-md"
            onClick={onClose}
            label="Cancel"
          />
          <Button
            className="px-4 py-2 bg-primary text-white rounded-md"
            onClick={onConfirm}
            disabled={loading}
            label={loading ? "Proceed...." : "Proceed"}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Modal;
