import axios from 'axios';
import { notify } from '../../utils/notify';
import server from '../../config/server.json';
import { useNavigate } from 'react-router-dom';
import MainScreen from '../../layout/MainScreen';
import { returnAge } from '../../utils/returnAge';
import React, { useState, useEffect } from "react";
import { redirectUser } from '../../utils/redirectUser';
import { collapseNavbar } from '../../utils/collapseNavbar';
import { Container, Form, Row, Col, Button, Spinner } from "react-bootstrap";

const ProfileScreen = () => {

    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const production = server.url.production;
    const [loading, setLoading] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false);
    const [userDetails, setUserDetails] = useState({
        dob: "",
        name: "",
        phone: "",
        email: "",
        gender: "",
        aadhaar: "",
        userInfo: {},
    });

    const formatDateToYYYYMMDD = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const resetFields = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUserDetails({
                ...userDetails,
                userInfo: user,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                aadhaar: user.aadhaar,
                dob: formatDateToYYYYMMDD(user.dob),
            });
            setLoading(false);
            setBtnLoader(false);
        }
    };

    const fetchUserDetails = async (aadhaar) => {
        setLoading(true);
        try {
            const res = await axios.get(`${production}${server.api.users.FETCH_USER_DETAILS}/${aadhaar}`);
            if (res.status === 200 && res.data) {
                const user = res.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                setUserDetails({
                    ...userDetails,
                    aadhaar: user.aadhaar,
                    name: user.name,
                    gender: user.gender,
                    email: user.email,
                    phone: user.phone,
                    dob: formatDateToYYYYMMDD(user.dob),
                });
            }
        } 
        catch (err) {
            console.log(err);
            notify("error", err.response.data.message);
        }
        setLoading(false);
    };

    const editUserProfile = async () => {
        const age = returnAge(userDetails.dob);
        const data = { ...userDetails, age };
        setEdit(false);
        setBtnLoader(true);
        try {
            const res = await axios.put(`${production}${server.api.users.EDIT_USER_DETAILS}`, data);
            if (res.status === 200 && res.data) {
                notify("success", res.data.message);
                fetchUserDetails(aadhaar);
            }
        } 
        catch (err) {
            console.log(err);
            notify("error", err.response.data.message);
        }
        setBtnLoader(false);
    };

    const handleEdit = () => {
        if (edit) {
            if (userDetails.name && userDetails.gender && userDetails.dob && userDetails.email && userDetails.phone && userDetails.aadhaar) {
                if (userDetails.phone.toString().length === 10) {
                    editUserProfile();
                } 
                else {
                    notify("error", "Phone number should be 10 digits.");
                }
            } 
            else {
                notify("error", "Please fill all the fields!");
            }
        } 
        else {
            setUserDetails({ ...userDetails});
            setEdit(true);
        }
    };

    useEffect(() => {
        collapseNavbar();
        const accountType = redirectUser();
        if (accountType) {
            navigate("/profile");
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                fetchUserDetails(user.aadhaar);
            } 
            else {
                navigate("/");
            }
        } 
        else {
            navigate("/");
        }
        // eslint-disable-next-line
    }, []);

    const { aadhaar, name, gender, dob, email, phone, userInfo } = userDetails;

    return (
        <MainScreen title="User Profile Details">
            {
                loading ? (
                    <div className='d-flex align-items-center'><Spinner as="span" /><span className='mx-3'>Fetching User Details...</span></div>
                ) 
                : 
                userInfo && (
                <div className='main'>
                    <Container>
                        <Form>
                            <Row>
                                <Col sm={6} className="mb-3">
                                    <Form.Label htmlFor="accountType" column sm={6}>
                                        Account Type
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="accountType"
                                        value="Doctor"
                                        readOnly
                                    />
                                </Col>
                                <Col sm={6} className="mb-3">
                                    <Form.Label htmlFor="aadhaar" column sm={6}>
                                        Aadhaar Number
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="aadhaar"
                                        value={aadhaar}
                                        readOnly
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6} className="mb-3">
                                    <Form.Label htmlFor="name" column sm={6}>
                                        Full Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                                        readOnly={!edit}
                                    />
                                </Col>
                                <Col sm={6} className="mb-3">
                                    <Form.Label htmlFor="gender" column sm={6}>
                                        Gender
                                    </Form.Label>
                                    {edit ? (
                                        <Form.Select
                                            name="gender"
                                            value={gender}
                                            onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </Form.Select>
                                    ) : (
                                        <Form.Control
                                            type="text"
                                            name="gender"
                                            value={gender}
                                            readOnly
                                        />
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6} className="mb-3">
                                    <Form.Label htmlFor="dob" column sm={6}>
                                        Date of Birth
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={dob}
                                        onChange={(e) => setUserDetails({ ...userDetails, dob: e.target.value })}
                                        readOnly={!edit}
                                    />
                                </Col>
                                <Col sm={6} className="mb-3">
                                    <Form.Label htmlFor="age" column sm={6}>
                                        Age
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="age"
                                        value={dob ? returnAge(dob) : ""}
                                        readOnly
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6} className="mb-3">
                                    <Form.Label htmlFor="email" column sm={6}>
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                        readOnly={!edit}
                                    />
                                </Col>
                                <Col sm={6} className="mb-3">
                                    <Form.Label htmlFor="phone" column sm={6}>
                                        Phone
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                                        value={phone}
                                        readOnly={!edit}
                                    />
                                </Col>
                            </Row>
                        </Form>
                        <Button variant="success" size="sm" onClick={handleEdit} disabled={btnLoader}>
                            {edit ? "Save" : "Edit Profile"}
                            {btnLoader ? <Spinner animation="border" variant="white" size='sm' className='mx-2'></Spinner> : null}
                        </Button>
                        {edit && (
                            <Button
                                variant="danger"
                                className="mx-2"
                                size="sm"
                                onClick={() => { setEdit(false);resetFields(); }}
                            >
                                Cancel
                            </Button>
                        )}
                    </Container>
                </div>
            )}
        </MainScreen>
    );
};

export default ProfileScreen;