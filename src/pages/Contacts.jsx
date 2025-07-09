import React, { useEffect, useState } from 'react';
import AppName from '../components/AppName';
import { getAllContacts } from '../api/contactApi';
import AddContactForm from '../components/AddContactForm';

const initialContacts = [
  {
    id: 1,
    name: 'Joseph Patel',
    email: 'joseph@gmail.com',
    phone: '+91 98765 43210',
  },
  {
    id: 2,
    name: 'Jay Shah',
    email: 'jay.shah@example.com',
    phone: '+91 91234 56789',
  },
  {
    id: 3,
    name: 'Ravi Mehta',
    email: 'ravi.m@example.com',
    phone: '+91 99887 66554',
  },
  {
    id: 4,
    name: 'Neha Kapoor',
    email: 'neha.k@example.com',
    phone: '+91 98765 43211',
  },
];



const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [addNewContact,setAddNewContact]=useState(false);

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const data=await getAllContacts();
        setContacts(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch contacts',error);
      }
    }

    fetchData();
  },[]);

  const handleDelete = (id) => {
    const filtered = contacts.filter((contact) => contact._id !== id);
    setContacts(filtered);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 flex flex-col items-center">
      <AppName />
      {addNewContact && (
  <AddContactForm
    onClose={() => setAddNewContact(false)}
    onSave={(newContact) => {
      setContacts((prev) => [...prev, newContact]);
    }}
  />
)}
      <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">Your Contacts</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl font-medium transition duration-200 cursor-pointer"
              onClick={()=>setAddNewContact(true)}>
              + Add New Contact
            </button>
          </div>
        </div>

        {filteredContacts.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No contacts found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredContacts.map((contact) => (
              <div
                key={contact._id}
                className="border rounded-2xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600">{contact.name}</h3>
                  <p className="text-sm text-gray-600">📧 {contact.email}</p>
                  <p className="text-sm text-gray-600">📞 {contact.phone}</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-xl">View</button>
                  <button className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-xl">Edit</button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
