const Transaction = require("../models/Transaction");

//@desc     Get all transactions
//@route    GET /api/v1/transactions
// mongoose method returns a promise.
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//@desc     Add transaction
//@route    POST /api/v1/transactions
exports.addTransaction = async (req, res, next) => {
  try {
    // console.log(req.body);   // req.body would return text and amount
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    //console.log(err);
    // err gives us the name of error and the message we gave while defining our schema
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
};

//@desc     Delete transaction
//@route    DELETE /api/v1/transactions/:id
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
