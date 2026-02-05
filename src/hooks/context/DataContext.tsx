// // import { createContext, useContext, useEffect, useState } from "react";
// import { getPromocodes } from "../services/promocode.service";
// import { getClients } from "../services/client.service";
// import { getItems } from "../services/item.service";

// const DataContext = createContext<any>(null);

// export const DataProvider = ({ children }) => {

//   const [promocodes, setPromocodes] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAllData = async () => {
//     try {
//       const [p, c, i] = await Promise.all([
//         getPromocodes(),
//         getClients(),
//         getItems(),
//       ]);

//       setPromocodes(p);
//       setClients(c);
//       setItems(i);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   return (
//     <DataContext.Provider
//       value={{ promocodes, clients, items, loading }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useData = () => useContext(DataContext);


// main tx
// import { DataProvider } from "./context/DataContext";

// <DataProvider>
//   <App />
// </DataProvider>



// to use it 
// import { useData } from "../context/DataContext";

// const CreateOrderPage = () => {

//   const { promocodes, clients, items, loading } = useData();

//   if (loading) return <p>Loading...</p>;

//   return (
//     <OrderForm
//       promocodes={promocodes}
//       clients={clients}
//       items={items}
//     />
//   );
// };
