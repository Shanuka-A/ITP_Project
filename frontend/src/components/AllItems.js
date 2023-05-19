import axios from "axios";
import React, { useState, useEffect } from "react";
import moment from "moment";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import inventoryBack from "../reportImages/backg.jpg"

export default function AllItems() {

    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("");
    const [itm, setItm] = useState({ noOfitem: 0 });

    const incNum = () => {
        setItm({ ...itm, noOfitem: itm.noOfitem + 1 });
        console.log("New state:", itm);
    };

    const decNum = () => {
        if (itm.noOfitem > 0) {
            setItm({ ...itm, noOfitem: itm.noOfitem - 1 });
        } else {
            alert("Sorry, Zero limit Reached");
        }
        console.log("New state:", itm);
    };
    console.log("New state:", itm);


    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:8050/labitemsinventory/item").then((res) => {
                console.log(res.data);
                setItems(res.data)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getItems();
    }, [])

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }
    /*const filteredItems = items.filter((rep) => {
        return rep.itemname.toLowerCase().includes(filter.toLowerCase());

    })*/

    function checkDate(todayDate, expDate) {
        var result;
        var ytd = moment(todayDate).utc().format('YYYY')
        var mtd = moment(todayDate).utc().format('MM')
        var dtd = moment(todayDate).utc().format('DD')

        var yed = moment(expDate).utc().format('YYYY')
        var med = moment(expDate).utc().format('MM')
        var ded = moment(expDate).utc().format('DD')


        if (ytd >= yed & mtd >= med & dtd >= ded) {
            result = "Expired"
            return result
        }
        else {
            result = "Not Expired"
            return result
        }
    }

    var showdate = new Date();
    var displaytodaysdate = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();
    var dt = showdate.toDateString();

    function checkNoOfItems(noOfitem) {
        var noOfitem;
        var message;
        if (noOfitem == 0) {
            message = "Out of stock"
            return message
        }
        else if (noOfitem <= 5) {
            message = "Running low"
            return message
        }
        else {
            message = "Enough Items"
            return message
        }
    }

    //Generate PDF
    function generatePDF() {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Item Details";
        const headers = [
            ["Item ID", "Item Name", "Expiry Date", "Quantity", "lab Manager", "No Of Item"],
        ];

        const data = items.map((rep) => [
            rep.itemID,
            rep.itemname,
            rep.expiryDate,
            rep.quantity,
            rep.labManager,
            rep.noOfitem,
        ]);

        let content = {
            startY: 50,
            head: headers,
            body: data,
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("ItemReport.pdf");
        toast("Item Report Downloaded");
    };

    return (

        <div
            style={{

                backgroundImage: `url(${inventoryBack})`,
                //backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                //background-size: cover;
                backgroundPosition: 'center',
                maxWidth: '100%',
                opacity: '0.8'
            }}>

            <center><h2 style={{ color: '#4A75D3' }}>Summary of Laboratory supplies</h2></center>
            {/*<div>
                
                <input type="text" className="search" placeholder="Search by Item name" onChange={handleFilterChange} />
        </div>*/}
            <button type="submit" class="btn-update btn btn-primary" style={{ background: 'linear-gradient(#F7971E,#FFD200)', width: '180px' }}
                onClick={() => generatePDF()}><i class="fa-solid fa-download"></i> Download Report</button>
            <ToastContainer></ToastContainer> <br></br>

            <div>
                <table className="table-in">
                    <thead>
                        <tr>
                            <th className="th-in">Item ID</th>
                            <th className="th-in">Item Name</th>
                            <th className="th-in">Today Date - Expiry Date</th>
                            <th className="th-in">Lab Manager Name</th>
                            <th className="th-in">Price</th>
                            <th className="th-in">No Of Item</th>
                            <th className="th-in">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(itm => {
                            return (
                                <tr className="tr-in">
                                    <td className="td-in">{itm.itemID}</td>
                                    <td className="td-in">{itm.itemname}</td>
                                    <td className="td-in">
                                        <span>{displaytodaysdate} - </span>
                                        <span>{itm.expiryDate} </span><br></br>
                                        <>
                                            {checkDate(displaytodaysdate, itm.expiryDate) == "Expired" ? (
                                                <b className="text-danger">{checkDate(displaytodaysdate, itm.expiryDate)}</b>
                                            ) : (
                                                <b>{checkDate(displaytodaysdate, itm.expiryDate)}</b>
                                            )}

                                        </>
                                    </td>
                                    <td className="td-in">{itm.labManager}</td>
                                    <td className="td-in">{itm.quantity}</td>

                                    <td className="td-in">

                                        {/*<button onClick={decNum}>-</button>
                                        {itm.noOfitem}
                                            <button onClick={incNum}>+</button>*/}
                                        <span>{itm.noOfitem}</span><br></br>
                                        <span><>
                                            {checkNoOfItems(itm.noOfitem) == "Out of stock" ? (
                                                <b className="text-danger">{checkNoOfItems(itm.noOfitem)}</b>

                                            ) : checkNoOfItems(itm.noOfitem) == "Running low" ? (
                                                <b className="" style={{ color: "#2F4FAA" }}>{checkNoOfItems(itm.noOfitem)}</b>
                                            ) :
                                                (
                                                    <b>{checkNoOfItems(itm.noOfitem)}</b>
                                                )

                                            }
                                        </></span>

                                    </td>
                                    <td className="td-in"><b>Rs:{itm.noOfitem * itm.quantity}</b></td>

                                    <td className="td-in"><button className="update1"><a href={"/updateItem/" + itm._id}>Update</a></button></td>
                                    <td className="td-in"><button className="delete1"><a href={"/deleteItem/" + itm._id}>Delete</a></button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div><br></br>

        </div>

    )

}