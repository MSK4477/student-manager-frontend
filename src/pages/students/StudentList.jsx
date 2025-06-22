import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import inv4 from "../svg/inv4.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteStudent, getStudents } from "../../service/studentService/studentService";
import Loader from "../loader";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate();
  const fetchStudents = async () => {
    try {
      const response = await getStudents()
      setLoader(true)
      setStudents(response?.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }finally{
      setLoader(false);
    }
  };
 
  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      toast.success("Student deleted successfully");
      fetchStudents();  
    } catch (err) {
      toast.error("Error deleting student");
      console.error(err);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetchStudents();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Skills",
      selector: (row) => row.skills?.join(", ") || "—",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div onClick={() => navigate("/add-student", { state: { id: row._id } })}
            className="flex gap-4 text-lg">
          <Link to={`/add-student/${row?._id}`}>
            <FaEdit className="text-blue-600 cursor-pointer" title="Edit" />
          </Link>
          <FaTrash
            className="text-red-600 cursor-pointer"
            title="Delete"
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

const filteredData = useMemo(() => {
  const text = filterText.toLowerCase();
  return students?.length ? students : [].filter((student) => {
    return (
      student?.fullName?.toLowerCase().includes(text) ||
      student?.department?.toLowerCase().includes(text) ||
      student?.skills?.toLowerCase().includes(text)
    );
  });
}, [students, filterText]);

  return (
    <div className="w-[calc(100%-16%)] absolute left-48 top-0 p-[5vmax]">

       {loader && <div className="flex justify-center items-center h-screen">
  <Loader />
</div> }
      {students.length && !loader ? (
        <>
        <div className="text-2xl font-bold mb-4 text-blue-600 tracking-wide">
                🎓 Student's List
              </div> 
          <div className="flex justify-between items-center mb-4">
            
            <input
              type="text"
              placeholder="Search by name, department, or skills"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            responsive
            progressPending={loading}
            noDataComponent="No students found"
            subHeaderComponent={
            <input
              type="text"
              placeholder="Search by name, department, or skills"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            }
          />
        </>
      ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-white p-10 shadow-xl rounded-xl">
          <h1 className="text-xl font-bold mb-4">
            Your Student List is Empty. Please{" "}
            <Link to="/add-student" className="text-blue-600 underline">
              Add
            </Link>{" "}
            Students to View
          </h1>
          <img src={inv4} className="w-3/5" alt="no student data" />
        </div>
      )}
    </div>
  );
};

export default StudentList;
