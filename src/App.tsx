import Table from "./components/table";
import React, { useState } from 'react';

const columns = [
  {
    name: "First Name",
    selector: "firstName",
    sortable: true
  },
  {
    name: "Last Name",
    selector: "lastName",
    sortable: true
  }
];

export default function App() {
  const [parents, setParents] = useState([
    {
      id: "ID_01",
      firstName: "Karel",
      lastName: "Novák"
    },
    {
      id: "ID_02",
      firstName: "Jakub",
      lastName: "Svoboda"
    },
    {
      id: "ID_03",
      firstName: "Anna",
      lastName: "Veselá"
    },
    {
      id: "ID_04",
      firstName: "Karel",
      lastName: "Nový"
    }
  ]);

  const [filtered, setFiltered] = useState([])
  const [found, setFound] = useState(false)
  const filterData = (data: any, filter: any): any => {
    return data.filter(function (item: any) {
      for (var key in filter) {
        if (item[key] === undefined || !item[key].toLowerCase().startsWith(filter[key].toLowerCase()))
          return false;
      }
      return true;
    })
  }

  const handleChange = (e: any) => {
    setFiltered([])
    const val = e.target.value
    let hasSpace = (/\s/).test(val)
    let filteredParents
    if (hasSpace) {
      const fullname = val.split(" ");
      const filter = {
        firstName: fullname[0],
        lastName: fullname[1]
      };
      filteredParents = filterData(parents, filter)
    } else {
      const filter = {
        firstName: val
      };
      filteredParents = filterData(parents, filter)
    }

    setFiltered(filteredParents)
    setFound(true)
  };


  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "80px" }}>
      <input type="text" placeholder="Search" style={{ marginLeft: "20px" }} onChange={handleChange} />
      <Table columns={columns} parents={found ? filtered : parents} />
    </div>
  )
}

