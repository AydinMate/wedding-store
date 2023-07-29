import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            boxShadow: '0 4px 15px 0 rgba(0, 0, 0, 0.1)',
            padding: '16px',
          },
          
        }}
      />
    </div>
  );
};

export default ToastProvider;
