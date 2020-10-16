const Product = require('../models/productModels')

//Gets all Products to /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))
  } catch (error) {
    console.log(error)
  }
}

//Get single Product to /api/products/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product Not Found' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(product))
    }
  } catch (error) {
    console.log(error)
  }
}

//create a product to api/products POST
async function createProduct(req, res) {
  try {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', async () => {
      const { title, description, price } = JSON.price(body)
      1
      const product = {
        title,
        description,
        price,
      }

      const newProduct = await Product.create(product)

      res.writeHead(201, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(newProduct))
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
}
