import { useState } from "react";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    course: "",
  });
  return (
    <div>
      <form action="">
        <label htmlFor="">FirstName:</label>
        <input
          type="text"
          placeholder="Enter firstname"
          value={formData.firstName}
          onChange={(event) =>
            setFormData({ ...formData, firstName: event.target.value })
          }
        />
      </form>
    </div>
  );
};

export default StudentForm;
