import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createHome } from "../../service/homeService";

import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { storage } from "./firebase";

const validateSchema = Yup.object().shape({
    nameHome: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    floorArea: Yup.number().required("Required"),
    bedrooms: Yup.number().required("Required"),
    bathrooms: Yup.number().required("Required"),
    status: Yup.string().required("Required"),
});

function CreateHome({ setOpenModal }) {
    const user = useSelector(({ user }) => user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const fileInputRef = useRef(null);
    const [fetched, setFetched] = useState(false);
    const [isSubmit, setIsSubmit] = useState(true);

    const [uploadImages, setUploadImages] = useState([]);

    const handleCreate = async (values) => {
        await dispatch(createHome(values)).then(() => {
            setOpenModal(false);
            swal({
                title: "Create success!",
                icon: "success",
                buttons: "close",
            });
        });
        window.location.reload();
    };

    const handleUpload = async () => {
        setIsSubmit(true);
        const storageRef = ref(storage, `/files/${imageUpload.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageUpload);

        uploadTask.on(
            "state_changed",
            null,
            (error) => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        setUploadImages((prevImages) => [...prevImages, url]);
                        setIsSubmit(false);
                        // setFiles([]);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        );
    };

    useEffect(() => {
        if (imageUpload) {
            handleUpload();
        }
    }, [imageUpload]);

    let userId;
    if (user) {
        userId = user.idUser;
    }

    const formik = useFormik({
        initialValues: {
            nameHome: "",
            address: "",
            description: "",
            price: "",
            floorArea: "",
            bedrooms: "",
            bathrooms: "",
            status: "",
            user: userId,
            category: 2,
            Image: uploadImages,
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            handleCreate(values);
        },
    });

    return (
        <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Create new home
                    </Typography>
                    <Box noValidate sx={{ mt: 1 }}>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <div
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <TextField
                                        margin="normal"
                                        width="40%"
                                        label="Name"
                                        name="nameHome"
                                        value={formik.values.nameHome}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.nameHome && Boolean(formik.errors.nameHome)
                                        }
                                        helperText={formik.touched.nameHome && formik.errors.nameHome}
                                    />
                                    <TextField
                                        margin="normal"
                                        width="40%"
                                        label="Address"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.address && Boolean(formik.errors.address)
                                        }
                                        helperText={formik.touched.address && formik.errors.address}
                                    />
                                </div>
                                <div
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Price"
                                        name="price"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        error={formik.touched.price && Boolean(formik.errors.price)}
                                        helperText={formik.touched.price && formik.errors.price}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Floor Area"
                                        name="floorArea"
                                        value={formik.values.floorArea}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.floorArea &&
                                            Boolean(formik.errors.floorArea)
                                        }
                                        helperText={
                                            formik.touched.floorArea && formik.errors.floorArea
                                        }
                                    />
                                </div>
                                <div
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Bedrooms"
                                        name="bedrooms"
                                        value={formik.values.bedrooms}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.bedrooms && Boolean(formik.errors.bedrooms)
                                        }
                                        helperText={formik.touched.bedrooms && formik.errors.bedrooms}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Bathrooms"
                                        name="bathrooms"
                                        value={formik.values.bathrooms}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.bathrooms &&
                                            Boolean(formik.errors.bathrooms)
                                        }
                                        helperText={
                                            formik.touched.bathrooms && formik.errors.bathrooms
                                        }
                                    />
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.description &&
                                            Boolean(formik.errors.description)
                                        }
                                        helperText={formik.touched.description && formik.errors.description}
                                    />
                                </div>
                                <div className="App">
                                    <input
                                        type="file"
                                        multiple
                                        ref={fileInputRef}
                                        onChange={(event) => {
                                            setImageUpload(event.target.files[0]);
                                        }}
                                    />
                                    {uploadImages &&
                                        uploadImages.map((url) => (
                                            <div key={url}>
                                                <img src={url} alt="Uploaded" style={{ width: "120px",marginTop:10 }} />
                                            </div>
                                        ))}
                                </div>
                                <TextField
                                    type="hidden"
                                    name="user"
                                    value={formik.values.user}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleUpload}
                                >
                                    Create
                                </Button>
                            </div>
                        </form>
                        <Grid container>
                            <Grid item></Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CreateHome;
