import { BiEdit } from "react-icons/bi";
import { TbVaccine } from "react-icons/tb";
import { GiOverdose } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";
import { GrPowerReset } from 'react-icons/gr';
import { MdOutlineTimer } from "react-icons/md";
import BooleanModal from "../modal/BooleanModal";
import SuccessImg from '../../assets/img/Success.png';
import AppointmentModal from "../modal/ApointmentModal";
import { Table, Button, Badge, Image, Spinner } from "react-bootstrap";


const FetchAppointments = (props) => {

    const {
        user,
        loading,
        vaccines,
        vaccineDose,
        resetFields,
        appointments,
        selectedDose,
        expiringTime,
        operationType,
        handleVaccine,
        appointmentName,
        editAppointment,
        selectedVaccine,
        showDeleteModal,
        openDeleteModal,
        bookAppointment,
        setSelectedDose,
        appointmentFilter,
        closeDeleteModal,
        initialBlankValue,
        deleteAppointment,
        fetchAppointments,
        setSelectedVaccine,
        setAppointmentFilter,
        showAppointmentModal,
        calculateTimeToExpire,
        openEditAppointmentModal,
        closeEditAppointmentModal,
    } = props;

    return (
        <div className="my-2">
            <div className="d-flex flex-row overflow-auto">
                <h5 className="d-inline-block">Appointments status</h5>
                <select className="mx-2 text-capitalize rounded bg-light text-white px-1" name="appointmentFilter" onChange={(e)=>setAppointmentFilter(e.target.value)} value={appointmentFilter} required>
                    <option>all</option>
                    <option>active</option>
                    <option>deactive</option>
                </select>
                <Button size='sm' className='mx-2' onClick={()=>{fetchAppointments();setAppointmentFilter("all")}} variant='warning'><GrPowerReset/></Button>
            </div>
            <hr />
            {
                loading ? <div className="d-flex align-items-center"><Spinner as="span"/><span className='mx-3'>Fetching Appointments...</span></div> :
                appointments && appointments.length > 0 ? (
                    <Table className="table table-hover my-3">
                        <thead>
                            <tr>
                            <th className="table-info" scope="col">
                                Appointment Info (Name, Dose, Expires in, Status)
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
                                                    <Badge bg="info" className="mx-2">Already Vaccinated <Image style={{width:"15px", height:"15px"}} src={SuccessImg} fluid /></Badge>
                                                </>
                                            }
                                        </td>
                                        <td className="text-center">
                                            { status === "deactive" ? 
                                                <Image className="my-2" style={{width:"20px", height:"20px"}} src={SuccessImg} fluid /> :
                                                <Button 
                                                    className="pe-auto"
                                                    variant="transparent" 
                                                    onClick={() => openEditAppointmentModal(_id, vaccineName, doseNo, updatedAt)}
                                                >
                                                    <BiEdit color="green"/>
                                                </Button>
                                            }
                                        </td>
                                        <td className="text-center">
                                            {   status === "deactive" ? 
                                                <Image className="my-2" style={{width:"20px", height:"20px"}} src={SuccessImg} fluid /> :
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
                    `No ${appointmentFilter === "all" ? "" : appointmentFilter } appointments are booked!`
                )
            }
            <AppointmentModal
                user={user}
                loading={loading}
                vaccines={vaccines}
                vaccineDose={vaccineDose}
                resetFields={resetFields}
                selectedDose={selectedDose}
                expiringTime={expiringTime}
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
                loading={loading}
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