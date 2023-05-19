import axios from 'axios';
import React, { useState, useEffect } from 'react';
//import './AllVideos.css'
import jsPDF from "jspdf";
import "jspdf-autotable";

//import {Link} from 'react-router-dom'

export default function AllVideos() {
  const [videos, setVideos] = useState([]);
  const [SearchItems, setSearch] = useState("");
  const doc = new jsPDF();

  useEffect(() => {
    function getVideo() {
      axios
        .get('http://localhost:8071/customer/')
        .then((res) => {
          
          console.log(res.data);
          setVideos(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getVideo();
  }, []);

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:8071/customer/delete/${id}`);
      setVideos(videos.filter((item) => item.id !== id));
     // alert('Data deleted successfully');
      window.location.reload(); //data deleted after that page will refresh automatically
    } catch (error) {
      alert('Error deleting data', error);
      console.log(error);
    }
  };

  const filteredVideos = videos.filter((item) => {
    return item.name.toLowerCase().includes(SearchItems.toLowerCase());
  });

  const generateReport = () => {
  
    const columns = [
      
      "Customer Name",
      "Age",
      "Customer Inquiry",
      "Message",
    ];
    const rows = videos.map(
      ({
      
        name,
        age,
        inquiry,
        message,
      }) => [
      
        name,
        age,
        inquiry,
        message,
      ]
    );
    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("Applicants.pdf");
  
}

  return (
    <div class="tw-p-[30px] tw-bg-gradient-to-r tw-from-[rgb(142,63,232)]">
      <div class="flex justify-center">
      <input type="text" placeholder='Enter Name for Searching' className='tw-w-[400px] tw-p-2 mr-3 tw-rounded' onChange={(e)=>{setSearch(e.target.value)}}></input>
      </div>
      <br/>
      <br/>
      <table class="table table-striped table-dark bg-gradient-to-r from-[#198eb8]  ">
        
          <tr>
            <th>NAME</th>
            <th>AGE</th>
            <th>GENDER</th>
            <th>E-MAIL</th>
            <th>INQUIRY</th>
            <th>MESSAGE</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        
        <tbody>
          {filteredVideos.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>{item.mail}</td>
              <td>{item.inquiry}</td>
              <td>{item.message}</td>
              <td>
                <a href={'/update/'+item._id}><button class="btn tw-bg-teal-500 tw-btn-rounded">Update</button></a>
              </td>
              <td>
                <button
                  class="btn tw-bg-rose-700 tw-btn-rounded  tw-hover:bg-red-500"
                  onClick={() => deleteVideo(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
 <div className='flex justify-center'>
      <button class="tw-rounded tw-bg-black tw-px-6 tw-py-2 tw-hover:bg-gray-600 tw-text-white " onClick={(e)=>{generateReport()}}>Genarate Report</button>
    </div>
    </div>
  );
}