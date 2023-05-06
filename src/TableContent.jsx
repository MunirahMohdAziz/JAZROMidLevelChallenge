import React, { useEffect, useState } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";                         
        

function TableContent() {

    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS}
    })
    const [selectedCountries, setSelectedCountries] = useState(null);
    const [rowClick, setRowClick] = useState(true)
    const [countries, setCountries] = useState([])

    useEffect(()=> {
        const url = "https://restcountries.com/v3.1/all";
        fetch(url)
        .then((res) => res.json())
        .then((countries) => {
            setCountries(countries)
        });
    },[]);

    const flagColumnBody=(flags)=>{
        return <img src={flags.flags.svg} alt={flags.flags.alt} width={50} />
    }

  return (
    <div>
        <div className="search-wrapper">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    onInput={(e) => setFilters({
                        global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                    })}

                    placeholder='Search...'
                />
            </span>
        </div>
        
        
        <div className="table-wrapper">
        <DataTable 
            value={countries} 
            sortMode="multiple" 
            filters={filters} 
            selectionMode={rowClick ? null : 'checkbox'}
            selection={selectedCountries}
            onSelectionChange={(e) => setSelectedCountries(e.value)}
            paginator
            rows={10}
            rowsPerPageOptions={[10,15,20]}
            totalRecords={250}
        >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column header="Flags" body={flagColumnBody} />
            <Column field='name.common' header="Name" sortable />
            <Column field='region' header="Region" sortable />
            <Column field='capital' header="Capital" sortable />
            
        </DataTable>
        </div>
        
    </div>
  )
}

export default TableContent