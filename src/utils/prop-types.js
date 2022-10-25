import PropTypes from 'prop-types';

 const ingredientPropType = PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.any.isRequired,
    image_mobile: PropTypes.any.isRequired,
    image_large: PropTypes.any.isRequired,
    __v: PropTypes.number.isRequired
}.isRequired);

export default ingredientPropType;