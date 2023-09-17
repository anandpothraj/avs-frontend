import { BiEdit } from "react-icons/bi";
import { TbVaccine } from "react-icons/tb";
import { GiOverdose } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineTimer } from "react-icons/md";
import BooleanModal from "../modal/BooleanModal";
import SuccessImg from '../../assets/img/Success.png';
import AppointmentModal from "../modal/ApointmentModal";
import { Table, Button, Badge, Image } from "react-bootstrap";


const FetchAppointments = (props) => {

    const {
        user,
        filter,
        loading,
        vaccines,
        setFilter,
        vaccineDose,
        resetFields,
        appointments,
        selectedDose,
        operationType,
        handleVaccine,
        appointmentName,
        editAppointment,
        selectedVaccine,
        showDeleteModal,
        openDeleteModal,
        bookAppointment,
        setSelectedDose,
        closeDeleteModal,
        initialBlankValue,
        deleteAppointment,
        setSelectedVaccine,
        showAppointmentModal,
        calculateTimeToExpire,
        openEditAppointmentModal,
        closeEditAppointmentModal,
    } = props;

    return (
        <div className="my-2">
            <div className="d-flex flex-row">
                <h5 className="d-inline-block">Appointments status</h5>
                <select className="mx-2 text-capitalize rounded bg-light text-white" name="filter" onChange={(e)=>setFilter(e.target.value)} value={filter} required>
                    <option>all</option>
                    <option>active</option>
                    <option>deactive</option>
                </select>
            </div>
            
            <hr />
            {appointments.length > 0 ? (
                <Table className="table table-hover my-3">
                <thead>
                    <tr>
                    <th className="table-info" scope="col">
                        Appointment Info (Name, Dose, Expires in)
                    </th>
                    <th className="table-success" scope="col">
                        <h6 className="text-center">Edit</h6>
                    </th>
                    <th className="table-danger" scope="col">
                        <h6 className="text-center">Delete</h6>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {appointments && appointments.map((appointment, index) => {
                        const { _id, vaccineName, doseNo, updatedAt, status } = appointment;
                        return (
                            <tr key={index} className="table-active">
                                <td>
                                    {vaccineName && (
                                        <>
                                        <TbVaccine color="green" className="mx-2" />
                                        {vaccineName} /
                                        </>
                                    )}
                                    {doseNo && (
                                        <>
                                        <GiOverdose color="yellow" className="mx-2" />
                                        {doseNo}
                                        {doseNo === 1 ? "st" : null}
                                        {doseNo === 2 ? "nd" : null}
                                        {doseNo === 3 ? "rd" : null}
                                        {doseNo === 4 ? "th" : null} dose /
                                        </>
                                    )}
                                    <MdOutlineTimer color="red" className="mx-2" /> Expires in
                                    {calculateTimeToExpire(updatedAt) > 1 ? (
                                        <Badge bg="warning" className="mx-2">
                                            {Math.floor(
                                                calculateTimeToExpire(updatedAt) / (1000 * 60 * 60)
                                            )}{" "}
                                            hours.
                                        </Badge>
                                    ) : (
                                        <Badge bg="danger" className="mx-2">
                                            {Math.floor(
                                                calculateTimeToExpire(updatedAt) / (1000 * 60)
                                            )}{" "}
                                            mins.
                                        </Badge>
                                    )}
                                    {
                                        status === "active" ?
                                        <Badge bg="success" className="mx-2">Active</Badge> : 
                                        <>
                                            <Badge bg="danger" className="mx-2">Deactive</Badge>
                                            <Badge bg="success" className="mx-2">Already Vaccinated</Badge>
                                        </>
                                    }
                                </td>
                                <td className="text-center">
                                    { status === "deactive" ? 
                                        <Image style={{width:"20px", height:"20px"}} src={SuccessImg} fluid /> :
                                        <Button 
                                            className="pe-auto"
                                            variant="transparent" 
                                            onClick={() => openEditAppointmentModal(_id, vaccineName, doseNo)}
                                        >
                                            <BiEdit color="green"/>
                                        </Button>
                                    }
                                </td>
                                <td className="text-center">
                                    {   status === "deactive" ? 
                                        <Image style={{width:"20px", height:"20px"}} src={SuccessImg} fluid /> :
                                        <Button
                                        className="pe-auto"
                                        variant="transparent"
                                        onClick={() => openDeleteModal(vaccineName, _id)}
                                    >
                                        <AiFillDelete color="red" />
                                    </Button>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                </Table>
            ) : (
                `No ${filter === "all" ? "" : filter } appointments are booked!`
            )}
            <AppointmentModal
                user={user}
                loading={loading}
                vaccines={vaccines}
                vaccineDose={vaccineDose}
                resetFields={resetFields}
                selectedDose={selectedDose}
                show={showAppointmentModal}
                handleVaccine={handleVaccine}
                operationType={operationType}
                selectedVaccine={selectedVaccine}
                bookAppointment={bookAppointment}
                editAppointment={editAppointment}
                setSelectedDose={setSelectedDose}
                onHide={closeEditAppointmentModal}
                initialBlankValue={initialBlankValue}
                title={`${operationType} Appointment`}
                setSelectedVaccine={setSelectedVaccine}
            />
            <BooleanModal
                show={showDeleteModal}
                next={deleteAppointment}
                onHide={closeDeleteModal}
                title={"Do you want to delete"}
                item={`${appointmentName}'s appointment`}
            />
        </div>
    );
};

export default FetchAppointments;