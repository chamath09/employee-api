import Department from "../models/Department.js";

const addDepartment = async (req, res) => {
    try {
        const { dep_name, dep_description } = req.body;
        const newDepartment = new Department({ dep_name, dep_description });
        await newDepartment.save();
        return res.status(200).json({success: true, Department: newDepartment});
    } catch (error) {
        return res.status(500).json({success: false, error: "Server side error"});
    }
}

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({success: true, departments});
    } catch (error) {
        return res.status(500).json({success: false, error: "Server side error"});
    }
}

const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).json({success: false, error: "Department not found"});
        }
        return res.status(200).json({success: true, department});
    } catch (error) {
        return res.status(500).json({success: false, error: "Server side error"});
    }
}

const updateDepartments = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, dep_description } = req.body;
        const department = await Department.findByIdAndUpdate(id, { dep_name, dep_description }, { new: true });
        if (!department) {
            return res.status(404).json({success: false, error: "Department not found"});
        }
        return res.status(200).json({success: true, department});
    } catch (error) {
        return res.status(500).json({success: false, error: "Server side error"});
    }
}

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    return res.status(500).json({ success: false, error: "Server side error" });
  }
};


export {addDepartment, getDepartments, updateDepartments, getDepartment, deleteDepartment};