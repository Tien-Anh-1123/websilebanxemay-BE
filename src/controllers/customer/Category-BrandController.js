const db = require("../../models/index");

const getAllCategory = async (req, res) => {
  try {
    const [categories, brands] = await Promise.all([
      db.Category.findAll(),
      db.Brand.findAll(),
    ]);
    return res.status(200).json({
      success: true,
      data: {
        categories,
        brands,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductCategory = async (req, res) => {
  try {
    let limit = 8;
    let page = req.query.page;
    if (!page) {
      page = 1;
    }
    let category_id = req.params.category_id;
    const { count, rows: products } = await db.Product.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      where: {
        CategoryId: category_id,
      },
    });
    const totalPage = Math.ceil(count / limit);
    const result = {
      success: true,
      total_product: count,
      total_page: totalPage,
      current_page: page,
      products: products,
    };
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const getProductBrand = async (req, res) => {
  try {
    let limit = 8;
    let page = req.query.page;
    if (!page) {
      page = 1;
    }
    let brand_id = req.params.brand_id;
    const { count, rows: products } = await db.Product.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      where: {
        BrandId: brand_id,
      },
    });
    const totalPage = Math.ceil(count / limit);
    const result = {
      success: true,
      total_product: count,
      total_page: totalPage,
      current_page: page,
      products: products,
    };
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCategory,
  getProductCategory,
  getProductBrand,
};
