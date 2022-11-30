import { DataGrid } from "@mui/x-data-grid";
import {rows} from "../../data/data.js"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';



const Hero = () => {

    const columns = [
        { field: "_id", headerName: "ID", width: 70 },
        {
            field: "title",
            headerName: "Title",
            width: 150,
            renderCell: (params) => {
              return (
                <div 
                    className="text-sky-600 underline cursor-pointer "
                >
                  {params.row.title}
                </div>
              )
            }
        },
        {
            field: "details",
            headerName: "Details",
            width: 250,
        },
        {
            field: "modified",
            headerName: "Last modified",
            width: 150,
        },
        {
            field: "created",
            headerName: "Date created",
            width: 150,
        },
        {
            field: "update",
            headerName: "Update",
            width: 150,
            renderCell: (params) => {
                return (
                    <div
                        className="text-green-700 cursor-pointer "
                    >
                        <EditOutlinedIcon />
                    </div>
              );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 150,
            renderCell: (params) => {
                return (
                    <div 
                        className=" text-red-400 cursor-pointer "
                    >
                        <DeleteOutlineIcon />
                    </div>
                );
              },
        },
    ];


    return (
        <div className="w-[100%] h-[97vh] ">
            <div className="w-[100%] h-[100%] text-xl flex flex-col items-center content-center ">

                {/* <div className="w-[100%] h-[80vh] flex flex-col justify-center content-center items-center">
                    Sorry, you have no available notes.
                </div> */}

                <div className="mt-12 w-[100%] h-[80vh] px-12 p-[20px]  ">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        getRowId={(row) => row._id}
                    />
                </div>  

                <div className="fixed bottom-20 right-12  z-80">
                    <Fab color="primary" aria-label="add" >
                        <AddIcon />
                    </Fab>
                </div>

            </div>
        </div>
    )
}

export default Hero