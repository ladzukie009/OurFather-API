import Plan from "../models/plans.js";

const createPlan = async (req, res) => {
  try {
    const { name, description, type, price } = req.body;

    if (!name || !description || !type || !price) {
      throw new Error("This fields are required");
    }
    const existingEmail = await Plan.findOne({ name });

    if (existingEmail) {
      throw new Error("Plan already exist");
    }

    const newPlan = new Plan({
      name,
      description,
      type,
      price,
    });

    await newPlan.save();
    res.status(200).send({ message: "Plan successfully created!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllPlan = async (req, res) => {
  try {
    const plans = await Plan.find();
    const filteredData = plans.filter((plan) => plan.isActive);

    res.status(200).send({ plans: filteredData });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { createPlan, getAllPlan };
