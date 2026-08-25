const Product = require("../Models/Products");
const sendEmail = require("../Middleware/sendEmail");

// const createProduct = async (req, res) => {
//     try {
//         const product = new Product(req.body)
//         await product.save()
//         res.status(201).json(product)
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// }

// module.exports = {createProduct}

// const updateProduct = async (req, res) => {
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {
//                 new: true, // Returns the updated document
//                 runValidators: true // Runs schema validation
//             }
//         )

//         if (!updatedProduct) {
//             return res.status(404).json({ message: "Product not found" })
//         }

//         res.status(200).json(updatedProduct)
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

// module.exports = { updateProduct }

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const { name, size, description, price, quantity } = req.body;

    if (!name || !size || !description || !price || !quantity) {
      return res
        .status(200)
        .json({ message: "Please provide all required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const product = new Product({
      name,
      size,
      description,
      price,
      quantity,
      image: req.file.path, // save image path to db
    });

    await product.save();

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // generate a 6 digit otp

    // send email notification to the admin that a new product has been created
    const subject = "New Product Created";
    const text = `A new product has been created: here is your OTP: ${otp}\n\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}`;

    await sendEmail("ulokangozi@gmail.com", subject, text);

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, size, description, price, quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        size,
        description,
        price,
        quantity,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    if (!product)
      return res.status(404).json({ message: "No available products yet..." });
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting products", error: error.message });
  }
};

// Get a single product
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting product", error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.status(204).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
