export default function PrimaryButton({ className = '', disabled, children,  color, bg, type, ...props }) {
  return (
      <button
          {...props}
          className={
              `inline-flex items-center px-4 py-2 
           text-white
              ${bg ? `bg-${bg}-600` : 'bg-gray-800'}
              border 
              border-transparent 
              rounded-md 
              font-semibold 
              text-xs 
              tracking-widest 
              hover:${bg ? `` : 'bg-gray-700'}
              focus:bg-gray-700 
              active:bg-gray-900 
              focus:outline-none 
              focus:ring-2 
              focus:ring-indigo-500 
              focus:ring-offset-2 
              transition 
              ease-in-out 
              duration-150 
              ${disabled && 'opacity-25'} ` + className
          }
          disabled={disabled}
      >
          {children}
      </button>
  );
}
