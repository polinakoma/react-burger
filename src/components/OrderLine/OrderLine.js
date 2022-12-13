import styles from './OrderLine.module.css'


export const OrderLine = () => {

    return (
        <main className={styles.main}>
            <h1 className={`${styles.heading} mt-10 mb-5`}>Лента заказов</h1>
            <div className={styles.container}>
                <section className={`${styles.orderLine} mr-15`}>

                    <div className={`${styles.orderItem} pt-6 pl-6 pr-6 pb-6`}>
                        <div className={styles.orderDetails}>
                            <p className={styles.orderNumber}>#034535</p>
                            <p className={styles.orderDate}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h2 className={`${styles.orderTitle} mt-6 mb-6`}>Death Star Starship Main бургер</h2>
                        <div className={styles.orderInfo}>
                            <p className={styles.orderImage}>Картинки</p>
                            <p className={styles.orderPrice}>цена</p>
                        </div>


                    </div>

                </section>

                <section className={styles.statistics}>
                </section>
            </div>
            

        </main>
    )
}

export default OrderLine;