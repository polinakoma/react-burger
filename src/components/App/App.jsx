import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js'
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor.js'
import Modal from '../Modal/Modal.js'
import OrderDetails from '../OrderDetails/OrderDetails.js'


function App() {
  const link = 'https://norma.nomoreparties.space/api/ingredients';

  const [ingredients, setIngredients] = React.useState([]);
 
  const getServerData = () => {
    fetch(link)
    .then(res => res.json())
    .then(json => setIngredients(json.data))
    .catch(error => console.log(`Ошибка загрузки данных - ${error}`))
  };

  React.useEffect(() => {
    getServerData()   
  }, []);

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);

  const closeModal = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleCloseModalByEsc = (evt) => {
    evt.key === "Escape" && closeModal();
  };

  function openOrderModal() {
    setIsOrderDetailsOpened(true);
  };

  return (
      <div className={styles.app}>  
        <AppHeader />

        <main className={styles.main}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstuctor ingredients={ingredients} handleOpenModal={openOrderModal}>
          </BurgerConstuctor>
        </main> 
        
        {isOrderDetailsOpened &&
              <Modal 
                onOverlayClick={closeModal}
                onEscKeydown={handleCloseModalByEsc}>
                <OrderDetails handleCloseModal={closeModal} />
              </Modal> 
        }  
      </div>
  );
};


export default App;
