exports.findItemInCart = (cart, hotelId) => {
    return cart.items.find(item => item.hotel.toString() === hotelId.toString());
  };
  
  exports.updateCartQuantity = (item, quantity) => {
    item.quantity += quantity;
  };
  