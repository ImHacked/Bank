import React, {useMemo, useState} from "react";
import axios from 'axios'
import Table from "./Table";
import useSWR from 'swr';

import './App.css';

function App() {
   
    const [city, setCity] = useState("");
    const [a, setA] = useState('');

    const changeCity = (event) => {
        setCity(event.target.value);

    };
     const {data}=useSWR(  `https://vast-shore-74260.herokuapp.com/banks?city=${city}`,(url)=>axios(url).then(r=>r.data));
    const columns = useMemo(() => [
        {
            Header: 'IFSC',
            accessor: 'ifsc'
        }, {
            Header: 'Bank ID',
            accessor: 'bank_id'
        }, {
            Header: 'Branch',
            accessor: 'branch'
        }, {
            Header: 'Address',
            accessor: 'address'
        }, {
            Header: 'City',
            accessor: 'city'
        }, {
            Header: 'District',
            accessor: 'district'
        }, {
            Header: 'State',
            accessor: 'state'
        }, {
            Header: 'Bank Name',
            accessor: 'bank_name'
        }
    ], [])

   

    function search(rows) {
        return rows.filter(
            (row) => row.ifsc.toString().toLowerCase().indexOf(a.toLowerCase()) > -1 || row.bank_id.toString().toLowerCase().indexOf(a.toLowerCase()) > -1 || row.branch.toString().toLowerCase().indexOf(a.toLowerCase()) > -1 || row.address.toString().toLowerCase().indexOf(a.toLowerCase()) > -1 || row.city.toString().toLowerCase().indexOf(a.toLowerCase()) > -1 || row.district.toString().toLowerCase().indexOf(a.toLowerCase()) > -1 || row.state.toString().toLowerCase().indexOf(a.toLowerCase()) > -1 || row.bank_name.toString().toLowerCase().indexOf(a.toLowerCase()) > -1
        );
    }

   
    

    return (
        <div className="App">

            <div className="heading">
                <h1>Bank Searching System</h1>
            </div>
            <div className="input__box">
                <label for="city">Choose a City:
                </label>

                <select onChange={changeCity} name="city" id="city">
                    <option value="">Select City</option>
                    <option value="MUMBAI">MUMBAI</option>
                    <option value="DELHI">DELHI</option>
                    <option value="KOLKATA">KOLKATA</option>
                    <option value="PUNE">PUNE</option>
                    <option value="HYDERABAD">HYDERABAD</option>
                </select>
                <input
                    className="input"
                    placeholder="Search Bank"
                    type='text'
                    value={a}
                    onChange={(e) => setA((e.target.value))}/>

            </div>

            <div className="table">

                <Table columns={columns} data={search(data||[])}></Table>
                

            </div>

        </div>
    );
}

export default App;
