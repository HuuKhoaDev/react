// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import './App.css'; 
// import Header from './Header';
// import Menuleft from './component/blog/Menuleft';
// import Footer from './Footer';
// import { UserContext } from './UserContext';

// function App(props) {
//   const user = 1

//   const [getTotalqty, setTotalQty] = useState(0);

//   let paramsLocation = useLocation();
//   console.log(paramsLocation);

//   function TotalQty(data) {
//     console.log(data); //=>7
//     setTotalQty(data);
//   }

//   function renderMenuleft() {
//     if (paramsLocation.pathname.includes("account")) {
//       return null;
//     } else if (paramsLocation.pathname.includes("cart")) {
//       return null;
//     } else {
//       return <Menuleft />;
//     }
//   }

//   return (
//     <UserContext.Provider value={{
//       TotalQty: TotalQty,
//       getTotalqty: getTotalqty
//     }}>
//       <>
//         <Header />
//         <section>
//           <div className='container'>
//             <div className='row'>
//               {renderMenuleft()}
//               {props.children}
//             </div>
//           </div>
//         </section>
//         <Footer />
//       </>
//     </UserContext.Provider>
//   );
// }

// export default App;

import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.css'; 
import Header from './Header';
import Menuleft from './component/blog/Menuleft';
import Footer from './Footer';
import { UserProvider } from './UserContext';

function App(props) {
  let paramsLocation = useLocation();
  console.log(paramsLocation);

  function renderMenuleft() {
    if (paramsLocation.pathname.includes("account") || paramsLocation.pathname.includes("cart")) {
      return null;
    } else {
      return <Menuleft />;
    }
  }

  return (
    <UserProvider>
      <>
        <Header />
        <section>
          <div className='container'>
            <div className='row'>
              {renderMenuleft()}
              {props.children}
            </div>
          </div>
        </section>
        <Footer />
      </>
    </UserProvider>
  );
}

export default App;
