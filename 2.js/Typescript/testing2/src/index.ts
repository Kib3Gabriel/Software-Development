// export const handleFormData = (e: any) => {
//     e.preventDefault();
  
//     const data = new FormData(e.target);
  
//     const value = Object.fromEntries(data.entries());
  
//     return value;
//   };

export const handleFormData = (e: any) => {
    e.preventDefault();
    
    console.log('Event target:', e.target); // Log to see the event target
    
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    return value;
};
