import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";


const addSalary = async (req, res) => {
    try{
        const { employeeId, basicSalary, allowance, deductions, payDate } = req.body;

        const totalSalary = parseInt(basicSalary) + parseInt(allowance) - parseInt(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowance,
            deductions,
            netSalary: totalSalary,
            payDate,
        })

        await newSalary.save();

        return res.status(200).json({success: true, salary: newSalary});
    } catch (error) {
        return res.status(500).json({success: false, error: "Server side error"});
    }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    // First try to find salary records with employeeId === id
    let salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );

    // If not found, try finding the employee by userId
    if (!salary || salary.length === 0) {
      const employee = await Employee.findOne({ userId: id });

      if (!employee) {
        return res
          .status(404)
          .json({ success: false, error: "Employee not found" });
      }

      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error("Get Salary Error:", error);
    return res.status(500).json({ success: false, error: "Server side error" });
  }
};


export { addSalary, getSalary };