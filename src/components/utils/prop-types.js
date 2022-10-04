import PropTypes from 'prop-types';

export const ingredientPropType = PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.any.isRequired,
    image_mobile: PropTypes.any,
    image_large: PropTypes.any,
    __v: PropTypes.number
})