import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";

export default function Table(props:any) {
    return (
    
      <div className="table">
          <DataTable
            title="Parents"
            columns={props.columns}
            data={props.parents}
            sortIcon={<SortIcon />}
            pagination
           />
        </div>
     
    );
  }