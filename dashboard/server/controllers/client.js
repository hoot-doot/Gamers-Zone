import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import KhaltiPayload from "../models/KhaltiPayload.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getKhaltiTransactions = async (req, res) => {
//   try {
//     // Extract query parameters
//     const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

//     // Parse and format sort parameter
//     const generateSort = () => {
//       if (!sort) return {};
//       const sortParsed = JSON.parse(sort);
//       return { [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1 };
//     };
//     const sortFormatted = generateSort();

//     // Query Khalti transactions
//     const khaltiTransactions = await KhaltiPayload.find({
//       $or: [
//         { amount: { $regex: new RegExp(search, "i") } },
//         { idx: { $regex: new RegExp(search, "i") } },
//         // Add more fields as needed for searching
//       ],
//     })
//       .sort(sortFormatted)
//       .skip((page - 1) * pageSize)
//       .limit(parseInt(pageSize));

//     // Count total number of Khalti transactions
//     const total = await KhaltiPayload.countDocuments({
//       $or: [
//         { amount: { $regex: new RegExp(search, "i") } },
//         { idx: { $regex: new RegExp(search, "i") } },
//         // Add more fields as needed for searching
//       ],
//     });

//     // Send response
//     res.status(200).json({
//       khaltiTransactions,
//       total,
//     });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };


export const getKhaltiTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // Parsing the sort parameter
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };
    const sortFormatted = sort ? generateSort() : {};

    // Building the query
    const query = {
      $or: [
        { token: { $regex: new RegExp(search, "i") } },
      ],
    };

    // Check if the search parameter is a valid date string
    const isValidDate = !isNaN(Date.parse(search));
    if (isValidDate) {
      query.$or.push({ createdAt: new Date(search) });
    }

    // Calculate skip value, ensuring it's non-negative
    const skip = Math.max((page - 1) * pageSize, 0);

    // Fetching transactions
    const transactions = await KhaltiPayload.find(query)
      .sort(sortFormatted)
      .skip(skip)
      .limit(parseInt(pageSize)); // Convert pageSize to integer

    // Counting total documents for pagination
    const total = await KhaltiPayload.countDocuments(query);

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};