import React, { useState } from 'react';
import Table from "./components/table";
import { parentsData } from "./data";

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
  interface dataTyp  {id?:string,firstName:string,lastName:string}
  interface filterTyp  {firstName:string,lastName:string}
  const [parents] = useState<dataTyp[]>(parentsData);
  const [filtered, setFiltered] = useState([])
  const [found, setFound] = useState(false)

  const filterData = (data: dataTyp[], filter:filterTyp ): any  => {
    return data.filter( (item:dataTyp ): boolean => {
      for (var key  in filter) {
        if (item[key as keyof filterTyp] === undefined || !item[key as keyof filterTyp].toLowerCase().startsWith(filter[key as keyof filterTyp].toLowerCase()))
          return false;
      }
      return true;
    })
  }

  const handleChange = (val: string) => {
    let hasSpace = (/\s/).test(val)
    let filteredParents
    if (hasSpace) {
      const fullname = val.split(" ");
      const filter = {
        firstName: fullname[0],
        lastName: fullname[1]
      };
      filteredParents = filterData(parents, filter)
    } 
    else {
      const filter = {
        firstName: val,
        lastName: ''
      };
      filteredParents = filterData(parents, filter)
    }

    setFiltered(filteredParents)
    setFound(true)
  };

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "80px" }}>
      <input type="text" placeholder="Search" style={{ marginLeft: "20px" }} onChange={(e)=>{handleChange(e.target.value)}} />
      <Table columns={columns} parents={found ? filtered : parents} />
    </div>
  )
}
