import styles from './ConstructorCard.module.css';
import { CONSTRUCTOR_DELETE } from '../../services/actions/ingredients.js';
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } 
from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import store from '../../services';
import { CONSTRUCTOR_REORDER } from '../../services/actions/ingredients.js';


function ConstructorCard({ingredient, index}) {

	const { dispatch } = store;

    const ref = useRef(null)
    const id = ingredient._id;

    const moveIngredient = (dragIndex, hoverIndex) => {
        dispatch({
            type: CONSTRUCTOR_REORDER,
            dragIndex, hoverIndex
        })
    };

    const [{ handlerId }, drop] = useDrop({
        accept: 'constructorCard',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
			if (!ref.current) {
				return
			}

			const dragIndex = item.index;
			const hoverIndex = index;
		
			if (dragIndex === hoverIndex) {
				return;
			};
		
			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			const hoverMiddleY =
			(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor.getClientOffset();

			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
		
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			};

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			};

			moveIngredient(dragIndex, hoverIndex);

			item.index = hoverIndex;
    	},
    });

	const [{ isDragging }, drag] = useDrag({
    	type: 'constructorCard',
    	item: () => {
      		return { id, index }
    	},
    	collect: (monitor) => ({
      		isDragging: monitor.isDragging(),
    	}),
  	});

  	const opacity = isDragging ? 0 : 1;

  	drag(drop(ref));

    return (
        <li className={`${styles.overlay} mb-4`} key={ingredient.uuid} ref={ref} style={{opacity}}>
            <div className={styles.points}>
                <DragIcon type="primary" />
            </div>  
                <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={(() => 
                    dispatch({
                        type: CONSTRUCTOR_DELETE,
                        payload: ingredient.key
                    })
                )}
        		/>
        </li>
    );
};


export default ConstructorCard;