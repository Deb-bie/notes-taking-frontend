import {useState, useEffect} from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Modal from  "../modal/"


const Hero = () => {

    const url = `https://notes-api-dzsi.onrender.com/`;
    var timer;

    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(null)
    const [viewModal, setViewModal] = useState(null)
    const [error, setError] = useState("")

    const titleChange = (e) => {setTitle(e.target.value)}
    const detailChange = (e) => {setDetails(e.target.value)}
    const handleAddModal = () => {setAddModal(!addModal)}
    const handleUpdateModal= () => {setUpdateModal(!updateModal)}
    const handleViewModal= () => {setViewModal(!viewModal)}
    const openUpdate = async (id) => {setUpdateModal(id)}

    useEffect(() => {
        timer = null
    }, [])

    const updateTitle = async (e, id) => {
        e.preventDefault()
        clearTimeout(timer)
        setTitle(e.target.value)
        timer = setTimeout(() => {
            setTitle(e.target.value)
            axios.patch(url.concat(`${id}`), { title: e.target.value}).then((res) =>         
            setError(""),  
        ).catch((error) => {
            if(error.response.data.status === 500) setError("This title has been used. Please use a different one")
        })
        }, 600)
    }

    const updateDetails = async (e, id) => {
        e.preventDefault()
        clearTimeout(timer)
        setDetails(e.target.value)
        timer = setTimeout(() => {
            setDetails(e.target.value)
            axios.patch(url.concat(`${id}`), { details: e.target.value})         
        }, 600)
    }


    const addNote = (e) => {
        e.preventDefault();
        axios.post( url, { title: title, details: details}).then((res) =>         
            setTitle(""),
            setDetails(""),
            setError("")
        ).catch((error) => {
            if(error.response.data.status === 500) setError("This title has been used. Please use a different one")
        });

    }

    useEffect(() => {
        const fetchNotes = async () => {
          const result = await axios.get(url);
          setNotes(result.data);
        };
        fetchNotes();
    }, [notes, url]);


    const updateNote = async (e, id) => {
        e.preventDefault();
        await axios.put(url.concat(`${id}`), { title: title , details: details}).then((res) =>         
            setTitle(""),
            setDetails(""),
            setError(""),  
        ).catch((error) => {
            if(error.response.data.status === 500) setError("This title has been used. Please use a different one")
        })
    }

    const getOneNote = async (id) => {  
        setViewModal(id)
        await axios.get(url.concat(`${id}`))
    }

    const deleteNote = async (id) => {
        await axios.delete(url.concat(`${id}`))
    }

    const columns = [
        { field: "_id", headerName: "ID", width: 70},
        { field: "title", headerName: "Title", width: 150,
            renderCell: (params) => {
              return (
                <div onClick={()=>getOneNote(params.row._id)} className="text-sky-600 underline cursor-pointer ">
                  {params.row.title}
                </div>
              )
            }
        },
        { field: "details", headerName: "Details", width: 250,},
        { field: "modified", headerName: "Last modified", width: 150,
            renderCell: (params) => {
                return (
                  <div>
                    { new  Date(params.row.updatedAt).toDateString() }
                  </div>
                )
            }
        },
        {field: "created", headerName: "Date created", width: 150,
            renderCell: (params) => {
                return (
                  <div>
                    { new  Date(params.row.createdAt).toDateString() }
                  </div>
                )
            }
        },
        { field: "update", headerName: "Update", width: 150,
            renderCell: (params) => {
                return (
                    <div onClick={ ()=> openUpdate(params.row._id,)} className="text-green-700 cursor-pointer ">
                        <EditOutlinedIcon />
                    </div>
              );
            },
        },
        { field: "delete", headerName: "Delete", width: 150,
            renderCell: (params) => {
                return (
                    <div onClick={()=> deleteNote(params.row._id)} className=" text-red-400 cursor-pointer ">
                        <DeleteOutlineIcon />
                    </div>
                );
            },
        },
    ];


    return (
        <div className="w-[100%] h-[97vh] ">
            <div className="w-[100%] h-[100%] text-xl flex flex-col items-center content-center ">

                {
                    notes.length > 0 ? 
                        <div className="mt-12 w-[100%] h-[80vh] px-12 p-[20px]  ">
                            <DataGrid
                                rows={notes}
                                columns={columns}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                                getRowId={(row) => row._id}
                            />
                        </div>  
                    : 
                        <div className="w-[100%] h-[80vh] flex flex-col justify-center content-center items-center">
                            Sorry, you have no available notes.
                        </div>
                }

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
                        error={error}
                        title={title}
                        details={details}
                        titleChange={titleChange}
                        detailChange={detailChange}
                    />
                : null}

                {
                    notes.map((note, id) => (
                        <>
                            {viewModal === note._id ? 
                                <Modal 
                                    key={id}
                                    handleClose={handleViewModal}
                                    type="view"
                                    row={note}
                                />
                            : null}

                            {updateModal === note._id ? 
                                <Modal 
                                    key={id}
                                    handleClose={handleUpdateModal}
                                    type="update"
                                    row={note}
                                    error={error}
                                    title={title}
                                    details={details}
                                    titleChange={titleChange}
                                    detailChange={detailChange}
                                    updateNote={updateNote}
                                    updateTitle={updateTitle}
                                    updateDetails={updateDetails}
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