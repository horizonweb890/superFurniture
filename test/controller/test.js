const Test = require("../model/test");

// CREATE
exports.createTest = async (req, res) => {
    try {
        const { testSchema } = req.body;

        const newTest = new Test({ testSchema });
        const savedTest = await newTest.save();

        return res.status(201).json({
            message: "Test record created successfully",
            data: savedTest,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to create test record", error: err.message });
    }
};

// READ ALL
exports.getAllTests = async (req, res) => {
    try {
        const tests = await Test.find();

        return res.status(200).json({
            message: "Tests retrieved successfully",
            data: tests,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch test records", error: err.message });
    }
};

// READ SINGLE
exports.getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test.findById(id);

        if (!test) {
            return res.status(404).json({ message: "Test record not found" });
        }

        return res.status(200).json({
            message: "Test record retrieved successfully",
            data: test,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch test record", error: err.message });
    }
};

// UPDATE
exports.updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const { testSchema } = req.body;

        const updatedTest = await Test.findByIdAndUpdate(
            id,
            { testSchema },
            { new: true, runValidators: true }
        );

        if (!updatedTest) {
            return res.status(404).json({ message: "Test record not found" });
        }

        return res.status(200).json({
            message: "Test record updated successfully",
            data: updatedTest,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update test record", error: err.message });
    }
};

// DELETE
exports.deleteTest = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTest = await Test.findByIdAndDelete(id);

        if (!deletedTest) {
            return res.status(404).json({ message: "Test record not found" });
        }

        return res.status(200).json({
            message: "Test record deleted successfully",
            data: deletedTest,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete test record", error: err.message });
    }
};
