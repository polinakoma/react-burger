import styles from './ConstructorFilling.module.css';
import { CONSTRUCTOR_DELETE } from '../../services/actions/ingredients.js';
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } 
from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { CONSTRUCTOR_REORDER } from '../../services/actions/ingredients.js';
import { useDispatch } from 'react-redux';


function ConstructorFilling ({ingredient, index}) {

	const dispatch = useDispatch();

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

	const handleDeleteItem = () => {
		dispatch({
			type: CONSTRUCTOR_DELETE,
			payload: ingredient.key
		})
	};

    return (
        <li className={`${styles.overlay} mb-4`} ref={ref} style={{opacity}}>
            <div className={styles.points}>
                <DragIcon type="primary" />
            </div>  
                <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={handleDeleteItem}
        		/>
        </li>
    );
};


export default ConstructorFilling;