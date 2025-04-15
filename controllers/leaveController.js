import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import User from "../models/User.js";


// import Employee from "../models/Employee.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    // Find the employee by userId
    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    return res.status(200).json({ success: true, leave: newLeave });
  } catch (error) {
    console.error("Error while adding leave:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getLeaves = async (req, res) => {
  try {
    const {id} = req.params;
    let leaves = await Leave.find({employeeId: id})

    if(!leaves){
          const employee = await Employee.findOne({ userId: id }).populate(
            "userId",
            "name"
          );

          leaves = await Leave.find({
            employeeId: employee._id,
          }).populate("employeeId", "name");
    }
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error while fetching leaves:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getLeave = async (req, res) => {
  try {

    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error while fetching leaves:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


const getLeaveDetail = async (req, res) => {
    try {
      const {id} = req.params;
      const leave = await Leave.findById({_id:id}).populate({
        path: "employeeId",
        populate: [
          {
            path: "department",
            select: "dep_name",
          },
          {
            path: "userId",
            select: "name, profileImage",
          },
        ],
      });
      return res.status(200).json({ success: true, leave });
    } catch (error) {
      console.error("Error while fetching leaves:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
}

const updateLeave = async (req, res) => {
    try {
      const {id} = req.params;
      const leave = await Leave.findByIdAndUpdate({_id:id}, {status: req.body.status})
      if(!leave){
        return res.status(500).json({ success: false, error: error.message });
      }
      return res.status(200).json({success:true})
    } catch (error) {
      console.error("Error while fetching leaves:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
}


export { addLeave, getLeaves, getLeave, getLeaveDetail, updateLeave };