import { useEffect, useState } from "react";
import api from "../../api/axiosInstance"; // adjust path to match your actual location
import { useProfile } from "../../context/useProfile";
import "./Academic.css";

const Academic = () => 
{
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const { refreshProfile } = useProfile();
  const [resumeFileName, setResumeFileName] = useState("No file chosen");
  const [photoFileName, setPhotoFileName] = useState("No file chosen");


  const [form, setForm] = useState({
    fullname: "",
    email: "",
    enrollment: "",
    department: "",
    semester: "",
    mobileNumber: "",
    gender: "",
    division: "",
    cgpaSem1: "",
    cgpaSem2: "",
    backlog: "",
    hometown: "",
    address: "",
  });

  useEffect(() => {
    const fetchAcademic = async () => {
      try {
        const res = await api.get("/student/academic");
        setForm({
          fullname: res.data.fullName || "",
          email: res.data.email || "",
          enrollment: res.data.enrollmentNumber || "",
          department: res.data.department || "",
          semester: res.data.semester || "",
          mobileNumber: res.data.mobileNumber || "",
          gender: res.data.gender || "",
          division: res.data.division || "",
          cgpaSem1: res.data.cgpaSem1 || "",
          cgpaSem2: res.data.cgpaSem2 || "",
          backlog: res.data.backlog || "",
          hometown: res.data.hometown || "",
          address: res.data.address || "",
        });
        // reflect any already-uploaded filenames from server paths
        if (res.data.resumeUrl) {
          setResumeFileName(res.data.resumeUrl.split("/").pop());
        }
        if (res.data.photoUrl) {
          setPhotoFileName(res.data.photoUrl.split("/").pop());
        }
      } catch (err) {
        console.error("Failed to load academic details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAcademic();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    try {
      await api.post("/student/academic", {
        department: form.department,
        semester: form.semester,
        mobileNumber: form.mobileNumber,
        gender: form.gender,
        division: form.division,
        cgpaSem1: form.cgpaSem1,
        cgpaSem2: form.cgpaSem2,
        backlog: form.backlog,
        hometown: form.hometown,
        address: form.address,
      });
      alert("Academic Details Saved Successfully");
      setEdit(false);
    } catch (err) {
      alert("Failed to save. Please try again.",err);
    }
  };

  const handleResumeUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setResumeFileName(file.name); // show chosen name immediately
  const formData = new FormData();
  formData.append("file", file);
  try {
    await api.post("/student/academic/upload-resume", formData);
    alert("Resume uploaded successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to upload resume");
    setResumeFileName("No file chosen"); // revert on failure
  }
};

const handlePhotoUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
   setPhotoFileName(file.name); // show chosen name immediately
  const formData = new FormData();
  formData.append("file", file);
  try {
    await api.post("/student/academic/upload-photo", formData);
    alert("Photo uploaded successfully");
    refreshProfile(); // this makes the Header update instantly
  } catch (err) {
     console.error(err);
      alert("Failed to upload photo");
      setPhotoFileName("No file chosen"); // revert on failure
  }
};

if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  
return (
    <div className="academic-container">
      <div className="academic-card">
        <div className="academic-header">
          <h2>Academic Details</h2>
          <p>Complete your Academic Profile</p>
        </div>

        <div className="academic-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={form.fullname} readOnly />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} readOnly />
          </div>

          <div className="form-group">
            <label>Enrollment Number</label>
            <input type="text" value={form.enrollment} readOnly />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              disabled={!edit}
            >
              <option value="">Select Department</option>
              <option value="MCA">MCA</option>
              <option value="IMCA">IMCA</option>
              <option value="BTECH">BTECH</option>
            </select>
          </div>

          <div className="form-group">
            <label>Semester</label>
            <select
              name="semester"
              value={form.semester}
              onChange={handleChange}
              disabled={!edit}
            >
              <option value="">Select Semester</option>
              <option value="3">3</option>
            </select>
          </div>

           <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter Mobile Number"
              value={form.mobileNumber}
              disabled={!edit}
              onChange={handleChange}
              maxLength={10}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              disabled={!edit}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Division</label>
            <select
              name="division"
              value={form.division}
              onChange={handleChange}
              disabled={!edit}
            >
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>



          <div className="form-group">
            <label>CGPA SEM 1</label>
            <input
              type="text"
              name="cgpaSem1"
              placeholder="Enter CGPA"
              value={form.cgpaSem1}
              disabled={!edit}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>CGPA SEM 2</label>
            <input
              type="text"
              name="cgpaSem2"
              placeholder="Enter CGPA"
              value={form.cgpaSem2}
              disabled={!edit}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Backlogs</label>
            <select name="backlog" value={form.backlog} onChange={handleChange} disabled={!edit}>
              <option value="">Select Backlogs</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
          </div>

          <div className="form-group">
            <label>Home Town</label>
            <select name="hometown" value={form.hometown} onChange={handleChange} disabled={!edit}>
              <option value="">Select Home Town</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Surat">Surat</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Bhavnagar">Bhavnagar</option>
              <option value="Jamnagar">Jamnagar</option>
              <option value="Junagadh">Junagadh</option>
              <option value="Gandhinagar">Gandhinagar</option>
              <option value="Anand">Anand</option>
              <option value="Nadiad">Nadiad</option>
              <option value="Mehsana">Mehsana</option>
              <option value="Palanpur">Palanpur</option>
              <option value="Bharuch">Bharuch</option>
              <option value="Navsari">Navsari</option>
              <option value="Valsad">Valsad</option>
              <option value="Morbi">Morbi</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Address</label>
            <textarea
              rows="4"
              name="address"
              placeholder="Enter Address"
              value={form.address}
              disabled={!edit}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Resume</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} disabled={!edit} />
            <span style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
              {resumeFileName}
            </span>
          </div>

          <div className="form-group">
            <label>Profile Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={!edit} />
            <span style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
              {photoFileName}
            </span>
          </div>

          <div className="button-area">
            <button type="button" className="edit-btn" onClick={() => setEdit(true)}>
              Edit
            </button>
            <button type="button" className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academic;

// import { useState } from "react";
// import "./Academic.css";

// const Academic = () => {

//   const [edit, setEdit] = useState(false);

//   const [form, setForm] = useState({
//     fullname: "Meet Patel",
//     email: "meet@gmail.com",
//     enrollment: "230120107001",

//     department: "",
//     semester: "",
//     cgpa: "",
//     backlog: "",
//     skills: "",
//     address: "",

//     resume: null,
//     photo: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       setForm({
//         ...form,
//         [name]: files[0],
//       });
//     } else {
//       setForm({
//         ...form,
//         [name]: value,
//       });
//     }
//   };

//   const handleSave = () => {
//     alert("Academic Details Saved Successfully");
//     setEdit(false);
//   };

//   return (
//     <div className="academic-container">
//       <div className="academic-card">

//         <div className="academic-header">
//           <h2>Academic Details</h2>
//           <p>Complete your Academic Profile</p>
//         </div>

//         <div className="academic-form">

//           {/* Full Name */}
//           <div className="form-group">
//             <label>Full Name</label>
//             <input
//               type="text"
//               value={form.fullname}
//               readOnly
//             />
//           </div>

//           {/* Email */}
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={form.email}
//               readOnly
//             />
//           </div>

//           {/* Enrollment */}
//           <div className="form-group">
//             <label>Enrollment Number</label>
//             <input
//               type="text"
//               value={form.enrollment}
//               readOnly
//             />
//           </div>

//           {/* Department */}
//           <div className="form-group">
//             <label>Department</label>
//             <input
//               type="text"
//               name="department"
//               placeholder="Enter Department"
//               value={form.department}
//               disabled={edit}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Semester */}
//           <div className="form-group">
//             <label>Semester</label>
//             <input
//               type="text"
//               name="semester"
//               placeholder="Enter Semester"
//               value={form.semester}
//               disabled={edit}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Skills */}
//           <div className="form-group">
//             <label>Skills</label>
//             <input
//               type="text"
//               name="skills"
//               placeholder="Java, React, HTML..."
//               value={form.skills}
//               disabled={edit}
//               onChange={handleChange}
//             />
//           </div>

//           {/* CGPA */}
//           <div className="form-group">
//             <label>CGPA SEM 1</label>
//             <input
//               type="text"
//               name="cgpa"
//               placeholder="Enter CGPA"
//               value={form.cgpa}
//               disabled={edit}
//               onChange={handleChange}
//             />
//           </div>

//           {/* CGPA */}
//           <div className="form-group">
//             <label>CGPA SEM 2</label>
//             <input
//               type="text"
//               name="cgpa"
//               placeholder="Enter CGPA"
//               value={form.cgpa}
//               disabled={edit}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Backlogs */}
//           <div className="form-group">
//             <label>Backlogs</label>

//             <select
//                 name="backlog"
//                 value={form.backlog}
//                 onChange={handleChange}
//             >
//                 <option value="">Select Backlogs</option>
//                 <option value="0">0</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4+</option>
//             </select>

//             </div>

//           <div className="form-group">
//                 <label>Home Town</label>

//                 <select
//                     name="hometown"
//                     value={form.hometown}
//                     onChange={handleChange}
//                 >
//                     <option value="">Select Home Town</option>

//                     <option value="Ahmedabad">Ahmedabad</option>
//                     <option value="Surat">Surat</option>
//                     <option value="Vadodara">Vadodara</option>
//                     <option value="Rajkot">Rajkot</option>
//                     <option value="Bhavnagar">Bhavnagar</option>
//                     <option value="Jamnagar">Jamnagar</option>
//                     <option value="Junagadh">Junagadh</option>
//                     <option value="Gandhinagar">Gandhinagar</option>
//                     <option value="Anand">Anand</option>
//                     <option value="Nadiad">Nadiad</option>
//                     <option value="Mehsana">Mehsana</option>
//                     <option value="Palanpur">Palanpur</option>
//                     <option value="Bharuch">Bharuch</option>
//                     <option value="Navsari">Navsari</option>
//                     <option value="Valsad">Valsad</option>
//                     <option value="Morbi">Morbi</option>
//                     <option value="Other">Other</option>
//                 </select>
//                 </div>

//           {/* Address */}
//           <div className="form-group full-width">
//             <label>Address</label>
//             <textarea
//               rows="4"
//               name="address"
//               placeholder="Enter Address"
//               value={form.address}
//               disabled={edit}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           {/* Resume */}
//           <div className="form-group">
//             <label>Resume</label>
//             <input
//               type="file"
//               name="resume"
//               disabled={edit}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Profile Photo */}
//           <div className="form-group">
//             <label>Profile Photo</label>
//             <input
//               type="file"
//               name="photo"
//               disabled={edit}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Buttons */}

//           <div className="button-area">

//             <button
//               type="button"
//               className="edit-btn"
//               onClick={() => setEdit(true)}
//             >
//               Edit
//             </button>

//             <button
//               type="button"
//               className="save-btn"
//               onClick={handleSave}
//             >
//               Save
//             </button>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Academic;