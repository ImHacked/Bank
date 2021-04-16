import React, {useMemo, useState, useEffect} from "react";
import axios from 'axios'
import Table from "./Table";

import './App.css';

function App() {
    const [data, setData] = useState([]);
    const [city, setCity] = useState("");
    const [a, setA] = useState('');

    const changeCity = (event) => {
        setCity(event.target.value);

    };

   
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            `https://vast-shore-74260.herokuapp.com/banks?city=${city}`,
          );
     
          setData(result.data);
        };
     
        fetchData();
      }, [city]);
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
            (row) => row.ifsc.toLowerCase().indexOf(a) > -1 || row.bank_id.toString().toLowerCase().indexOf(a) > -1 || row.branch.toLowerCase().indexOf(a) > -1 || row.address.toLowerCase().indexOf(a) > -1 || row.city.toLowerCase().indexOf(a) > -1 || row.district.toLowerCase().indexOf(a) > -1 || row.state.toLowerCase().indexOf(a) > -1 || row.bank_name.toLowerCase().indexOf(a) > -1
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
                    onChange={(e) => setA(e.target.value)}/>
               
            </div>

            <div className="table">

                <Table columns={columns} data={search(data)}></Table>

            </div>

        </div>
    );
}

export default App;
