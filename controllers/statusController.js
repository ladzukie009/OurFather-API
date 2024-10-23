import Status from "../models/status.js";

const createStatus = async (req, res) => {
  try {
    const { name, description, value } = req.body;

    if ((!name || !description, !value)) {
      throw new Error("This fields are required");
    }

    const existingStatus = await Status.findOne({ name });
    if (existingStatus) {
      throw new Error(`${name} already exists in our data.`);
    }

    const newStatus = new Status({
      name,
      description,
      value,
    });

    await newStatus.save();
    res.status(200).send({ message: "Status successfully added!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllStatus = async (req, res) => {
  try {
    const statuses = await Status.find();
    const filteredData = statuses.filter((status) => status.isActive);

    res.status(200).send({ statuses: filteredData });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { createStatus, getAllStatus };
