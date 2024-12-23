import React, { useState } from 'react';
import { Button } from "@/Customcomp/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentsTable } from "@/Customcomp/Students-table";
import { supabase } from './supabase/supabaseClient';

interface Student {
  name: string;
  cohort: string;
  courses: string;
  dateJoined: string;
  lastLogin: string;
  status: boolean;
}

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Student>({
    name: '',
    cohort: '',
    courses: '',
    dateJoined: '',
    lastLogin: '',
    status: false
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding student

  async function addStudent(formData:any) {
    const { data, error } = await supabase
    
  .from('students')
  .insert([
    { student_name: formData["name"], cohort:formData["cohort"],courses:formData["courses"],date_joined:formData["dateJoined"],last_login:formData["lastLogin"],grade:80,status:formData["status"] },
  ])
  .select()        
  console.log(error)
  }

  const handleAddStudent = () => {

    console.log(formData)
  
    addStudent(formData)

    setStudentData(prevStudentData => [
      ...prevStudentData, 
      formData 

    ]);

    setFormData({
      name: '',
      cohort: '',
      courses: '',
      dateJoined: '',
      lastLogin: '',
      status: false
    });

    setIsModalOpen(false);
    console.log("Data submitted", formData);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-4">
          <Select defaultValue="2024-25">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Cohort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-25">AY 2024-25</SelectItem>
              <SelectItem value="2023-24">AY 2023-24</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="cbse-math">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cbse-math">CBSE MATH</SelectItem>
              <SelectItem value="cbse-science">CBSE Science</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Add new Student</Button>
      </div>

      <StudentsTable data={studentData as any} />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Student</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Student name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cohort</label>
                <Select value={formData.cohort} onValueChange={(value) => setFormData({ ...formData, cohort: value })}>
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
                <Select value={formData.courses} onValueChange={(value) => setFormData({ ...formData, courses: value })}>
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
                  value={formData.dateJoined}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Login</label>
                <input
                  type="datetime-local"
                  name="lastLogin"
                  placeholder="Enter Last Login"
                  value={formData.lastLogin}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" onClick={handleAddStudent}>Add</Button>
                <Button type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
