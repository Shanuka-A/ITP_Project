import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import back3 from "../reportImages/back3.jpg";
import logo from "../reportImages/logo.jpeg"

export default function AllReports() {

    const [reports, setReports] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();


    //useEffect is helpful for get data from database
    useEffect(() => {
        function getReports() {
            axios.get("http://localhost:8050/report/").then((res) => {
                console.log(res.data);
                setReports(res.data)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getReports();
    }, [])

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }
    const filteredReports = reports.filter((rep) => {
        return rep.ID.toLowerCase().includes(filter.toLowerCase());

    })

    return (
        <div
            style={{

                backgroundImage: `url(${back3})`,
                //backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                //background-size: cover;
                backgroundPosition: 'center',
                maxWidth: '100%',
                opacity: '0.8'


            }}>

            <div>
                <tr><br></br>


                    <td><input type="text" className="search" placeholder="Search by ID" onChange={handleFilterChange} /></td>
                    {/*<div><td><button
                            className="button1"
                            type="button"
                            onClick={() => navigate("/genarateReport" )}
                        >
                            Genarate Reports
    </button></td></div>*/}
                </tr>

                <table>
                    <thead>
                    </thead>
                    <tbody>
                        {filteredReports.map((rep, index) => {
                            return (
                                <>
                                    <div className="out1">

                                        <div className="card" id="num">

                                            <div className="card-body">
                                                <table>
                                                    <div>
                                                        <tr>
                                                            <td className="col-md-6"><img className="logo" src={logo}></img></td>
                                                            <td className="col-md-6">
                                                                <h5><b className="title">MEDIXO E- HEALTH CARE CENTER (PVT) LTD</b></h5>
                                                                <h6><b className="subtitle">No. 149, Galle Road, Colombo 3, Sri Lanka</b></h6>
                                                                <h6><b className="subtitle">Tel.0347 99 99 99</b></h6>
                                                                <div><ul><b className="subtitle1"><h6>CONFIDENTIAL LABORATORY REPORT</h6></b></ul></div></td>

                                                        </tr>
                                                    </div>

                                                    <div>
                                                        <tr >

                                                            <td className="col-md-6"><b className="text">Patient ID:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2">{rep.ID}</b></td>
                                                            <td className="col-md-6">
                                                                <b className="text1">Report ID:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b> rep/</b><b className="text2">{index + 1}</b></td><br></br>

                                                        </tr>
                                                        <tr>

                                                            <td><b className="col-md-6 text">Patient Name :</b> &nbsp;<b className="text2">{rep.name}</b></td>
                                                            <td>
                                                                <b className="col-md-6 text1">Sample Type:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text2">{rep.sampleType}</b></td><br></br>

                                                        </tr>
                                                        <tr>

                                                            <td><b className="col-md-6 text">Sex:</b> &nbsp;&nbsp;&nbsp;&nbsp;<b className="text2">{rep.gender}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text">Age: </b><b>{rep.age}</b></td>
                                                            <td>
                                                                <b className="col-md-6 text1">processed Date:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2">{rep.processedDate}</b></td><br></br>

                                                        </tr>
                                                        <tr>

                                                            <td><b className="col-md-6 text">Doctor:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="text2">{rep.doctor}</b></td>
                                                            <td>
                                                                <b className="col-md-6 text1">Technologist Name:</b> &nbsp;&nbsp;&nbsp;<b className="text2">{rep.TechnologistName}</b></td><br></br>

                                                        </tr><br></br></div>
                                                </table>

                                                <b>Report Details :</b> <br></br>
                                                <center><img height={"300px"} width={"500px"} src={`http://localhost:8050/images/${rep.filepath}`} /></center><br></br><br></br>
                                                {/*Re8port Details : <img src={`iamges/${dns.filepath}`} /><br></br>*/}
                                                <b>Comment :</b> {rep.status}<br></br><br></br>



                                                <td><button className="update"><a href={"/update/" + rep._id}>Update</a></button></td>
                                                <td ><button className="delete"><a href={"/delete/" + rep._id}>Delete</a></button></td>



                                                <hr className="hr1" color={"purple"} />
                                                <tr>
                                                    <td className="text3 ">Dr.Kamishka Hewapathirana<br />MBBS(Col),D.Path,MD(Histopath)<br />Consultant Histopathologist</td>
                                                    <td className="text5">Dr.Supipi Bandara<br />MBBS(Col),D.Path,MD(Chempath)<br />Consultant Chemical Pathologist</td>
                                                    <td className="text5">Dr.Rashini Warunika<br />MBBS(Col),D.Path,MD(Haematology)<br />Consultant Haemotologist</td>
                                                </tr>

                                            </div>

                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}