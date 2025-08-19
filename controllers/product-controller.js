const createProduct = async (req, res) => {
  res.send('create product');
};

const getAllProducts = async (req, res) => {
  res.send('get AllP roducts');
};

const getSingleProduct = async (req, res) => {
  res.send('get Single Product');
};
const updateProduct = async (req, res) => {
  res.send('update Product');
};

const deleteProduct = async (req, res) => {
  res.send('delete Product');
};

const uploadImage = async (req, res) => {
  res.send('upload Image');
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
