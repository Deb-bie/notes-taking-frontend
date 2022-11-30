import {useState} from "react";
import { DataGrid } from "@mui/x-data-grid";
import {rows} from "../../data/data.js"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Modal from  "../modal/"


const Hero = () => {
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(null)
    const [viewModal, setViewModal] = useState(null)

    const titleChange = (e) => {setTitle(e.target.value)}
    const detailChange = (e) => {setDetails(e.target.value)}
    const handleAddModal = () => {setAddModal(!addModal)}
    const handleUpdateModal= () => {setUpdateModal(!updateModal)}
    const handleViewModal= () => {setViewModal(!viewModal)}

    const addNote = (e) => {
        e.preventDefault();
        console.log(title)
        console.log(details)
        setTitle("");
        setDetails("")
    }

    const updateNote = (e) => {
        e.preventDefault();
        console.log(title)
        console.log(details)
        setTitle("");
        setDetails("")
    }



    const columns = [
        { field: "_id", headerName: "ID", width: 70 },
        {
            field: "title",
            headerName: "Title",
            width: 150,
            renderCell: (params) => {
              return (
                <div onClick={ ()=> setViewModal(params.row._id,) } className="text-sky-600 underline cursor-pointer ">
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
                    <div onClick={ ()=> setUpdateModal(params.row._id,) } className="text-green-700 cursor-pointer ">
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
                    <div className=" text-red-400 cursor-pointer ">
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
                    <Fab onClick={() => handleAddModal()} color="primary" aria-label="add" >
                        <AddIcon />
                    </Fab>
                </div>

                {addModal ? 
                    <Modal 
                        type="add"
                        handleClose={handleAddModal}
                        addNote={addNote}
                        title={title}
                        details={details}
                        titleChange={titleChange}
                        detailChange={detailChange}
                    />
                : null}


                {
                    rows.map((row, id) => (
                        <>
                            {viewModal === row._id ? 
                                <Modal 
                                    key={id}
                                    handleClose={handleViewModal}
                                    type="view"
                                    row={row}
                                />
                            : null}

                            {updateModal === row._id ? 
                                <Modal 
                                    key={id}
                                    handleClose={handleUpdateModal}
                                    type="update"
                                    row={row}
                                    title={title}
                                    details={details}
                                    titleChange={titleChange}
                                    detailChange={detailChange}
                                    updateNote={updateNote}
                                />
                            : null}
                        </>
                    ))
                }

            </div>
        </div>
    )
}

export default Hero