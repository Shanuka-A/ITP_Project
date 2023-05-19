import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import background from "../Images/pharmacy.jpg";
import logo from "../Images/logo.jpg";



export default function ReadMedicine() {

    //class component waladi componentdidmount
    //session json with tocken
    const [readMedicine, setreadMedicine] = useState([]);
    const [date, setLabAppoinmentDate] = useState("");

    const [testType, setTestType] = useState("");
    const [testDate, setTestDate] = useState("");

    const navigate = useNavigate();

    useEffect(function () {

        function getreadMedicine() {
            axios.get("http://localhost:8050/med/").then(function (res) {

                console.log(res.data);

                setreadMedicine(res.data);


            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getreadMedicine();




    }, [])

    const handleAddToOrder = (medicine) => {
        // Send a PUT request to update the inventory
        axios.put(`http://localhost:8050/med/${medicine._id}`, {
            qty: medicine.qty - 1
        }).then(function (res) {
            // Update the readMedicine state with the updated medicine
            const updatedMedicine = res.data;
            setreadMedicine(prevState => {
                const index = prevState.findIndex(med => med._id === updatedMedicine._id);
                const newState = [...prevState];
                newState[index] = updatedMedicine;
                return newState;
            });
        }).catch(function (err) {
            alert("Failed to add to order. " + err);
        });
    }



    return (
        <div>

            <div>

                <div className="bg-1" style={{ height: "350px", background: '#0297BF', paddingTop: '40px' }}>
                    <div className="container text-center">
                        <h3 style={{ fontFamily: "inherit", color: "white" }}>MEDIXO E-HEALTH</h3>
                        <br />
                        <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                        <h3></h3><br></br>
                    </div>
                </div>


            </div>
            <div style={{ background: '#0297BF', padding: "20px 50px", display: 'flex', justifyContent: 'end' }}>
                <button type="submit" className="btn" style={{ background: "#fff", border: "none" }} onClick={() => navigate("/addNewMedicine")}>Add Medicine </button>
            </div>
            <section style={{

                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                position: 'center',
                maxWidth: '100%',


            }}>

                <div style={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'

                }}>

                    <table className="table table-striped table-hover" id="myTable" style={{ color: "white", backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <thead>
                            <tr>
                                <th scope="col">Medicine Name</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Add to Order</th>


                                <th scope="col" className="pr-3">Update</th>
                                <th scope="col" className="pr-3">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {readMedicine.map((readMedicine) => (



                                <tr>
                                    <td style={{ color: "white" }}>{readMedicine.mName}</td>
                                    <td style={{ color: "white" }}>{readMedicine.uPrice}</td>
                                    <td style={{ color: "white" }}>{readMedicine.qty}</td>
                                    <td style={{ color: "white" }}><button className="btn btn-sm text-white"
                                        style={{ background: "#26CDD1", width: "100px" }}
                                        onClick={() => handleAddToOrder(readMedicine)}
                                        disabled={readMedicine.qty <= 0}
                                    >
                                        {readMedicine.qty <= 0 ? 'Out of stock' : 'Add to Order'}</button></td>



                                    <td className="tableTd"><a href={'updateMedicine/' + readMedicine._id}><button class="btn btn-sm text-white" style={{ background: "#26CDD1", width: "100px" }}>Update</button></a></td>
                                    <td className="tableTd"><a href={'/deleteMedicine/' + readMedicine._id}><button class="btn btn-sm text-white" style={{ background: "#E53D3D", width: "100px" }}>Delete</button></a></td>

                                </tr>

                            ))}

                        </tbody>


                    </table>



                </div >

            </section >

        </div >

    )


}