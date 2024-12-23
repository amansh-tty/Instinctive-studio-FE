import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Customcomp/ui/table";
import { supabase } from "@/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { Button } from "@/Customcomp/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Student {
  student_name: string; // Primary Key
  cohort: string;
  courses: string[];
  date_joined: string;
  last_login: string;
  status: "active" | "inactive";
}

export function StudentsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentsList, setStudentsList] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student>()
  const [updatePayload, setUpdatePayload] = useState<Partial<Student>>({})

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name,value)
    // setSelectedStudent((prev)=>{..., })
    setUpdatePayload({ ...updatePayload, [name]: value });
  };

  const updateCallback = () => {
    if (selectedStudent)
     { console.log(updatePayload)
      handleUpdate(selectedStudent.student_name, updatePayload)}
  }

  // Fetch students from Supabase
  async function getStudents() {
    const { data, error } = await supabase.from("students").select("*");
    if (error) console.error("Error fetching students:", error);
    setStudentsList(data ?? []);
  }

  // Handle Delete Student by 'student_name'
  async function handleDelete(student_name: string) {
    const { error } = await supabase
      .from("students")
      .delete()
      .eq("student_name", student_name); // Use 'student_name' as primary key

    if (error) {
      console.error("Error deleting student:", error.message);
    } else {
      // Remove deleted student from local state
      setStudentsList(
        studentsList.filter((student) => student.student_name !== student_name)
      );
    }
  }

  // Handle Update Student Status
  async function handleUpdate(student_name: string, updatedData: Partial<Student>) {
    console.log(updatedData)
    const { error } = await supabase
      .from("students")
      .update(updatedData)
      .eq("student_name", student_name); // Use 'student_name' as primary key

    if (error) {
      console.error("Error updating student:", error.message);
    } else {
      getStudents(); // Refresh list after update
    }
  }

  // Fetch data on initial render
  useEffect(() => {
    getStudents();
  }, []);

  // get selected stu
  useEffect(() => {
    console.log({ selectedStudent })
  }, [selectedStudent])

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Cohort</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead> {/* New Actions Column */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentsList.map((student) => (
            <TableRow key={student.student_name}>
              <TableCell className="font-medium">
                {student.student_name}
              </TableCell>
              <TableCell>{student.cohort}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {Array.isArray(student.courses)
                    ? student.courses.map((course) => (
                      <span
                        key={course}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs"
                      >
                        {course}
                      </span>
                    ))
                    : student.courses}
                </div>
              </TableCell>
              <TableCell>{student.date_joined}</TableCell>
              <TableCell>{student.last_login}</TableCell>
              <TableCell>
                <span
                  className={`inline-block h-2 w-2 rounded-full ${student.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {/* Update Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsModalOpen(true)
                      setSelectedStudent(student)
                    }
                    }
                  >
                    Update
                  </Button>

                  {/* Delete Button */}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(student.student_name)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        isModalOpen && selectedStudent &&
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Student</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  disabled
                  placeholder="Enter Student name"
                  value={selectedStudent.student_name}
                  // onChange={handleInputChange}
                  className=" text-gray-200 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cohort</label>
                <Select value={updatePayload.cohort ?? selectedStudent.cohort} onValueChange={(value) => setUpdatePayload({ ...updatePayload, cohort: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Cohort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-25">AY 2024-25</SelectItem>
                    <SelectItem value="2023-24">AY 2023-24</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Courses</label>
                <Select value={updatePayload.courses ?? selectedStudent.courses} onValueChange={(value) => setUpdatePayload({ ...updatePayload, courses: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbse-math">CBSE MATH</SelectItem>
                    <SelectItem value="cbse-science">CBSE Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date Joined</label>
                <input
                  type="datetime-local"
                  name="dateJoined"
                  placeholder="Enter Date Joined"
                  value={updatePayload.date_joined ?? selectedStudent.date_joined}
                  onChange={(e) => setUpdatePayload({ ...updatePayload, date_joined: e.target.value })}
                  className="text-gray-200 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Login</label>
                <input
                  type="datetime-local"
                  name="lastLogin"
                  placeholder="Enter Last Login"
                  value={updatePayload.last_login ?? selectedStudent.last_login}
                  onChange={(e) => setUpdatePayload({ ...updatePayload, last_login: e.target.value })}
                  className="text-gray-200 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <input
                  type="checkbox"
                  name="status"
                  checked={updatePayload.status ?? selectedStudent.status === 'active' ? true : false}
                  onChange={(e) => setUpdatePayload({ ...updatePayload, status: e.target.checked ? 'active' : 'inactive' })}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" onClick={updateCallback}>Add</Button>
                <Button type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>

      }
    </>
  );
}
