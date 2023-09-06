import { BiEdit } from "react-icons/bi";
import { TbVaccine } from "react-icons/tb";
import { GiOverdose } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineTimer } from "react-icons/md";
import { Table, Button, Badge } from "react-bootstrap";


const FetchAppointments = ({ appointments, calculateTimeToExpire }) => {

    return (
        <div className="my-2">
            <h5>Appointments status</h5>
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
                            const { vaccineName, doseNo, updatedAt } = appointment;
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
                                        {Math.floor(calculateTimeToExpire(updatedAt)/(1000*60*60))} hours.
                                        </Badge>
                                    ) : (
                                        <Badge bg="danger" className="mx-2">
                                        {Math.floor(calculateTimeToExpire(updatedAt)/(1000*60))} mins.
                                        </Badge>
                                    )}
                                    </td>
                                    <td className="text-center">
                                        <Button variant="transparent" className="pe-auto">
                                            <BiEdit color="green" />
                                        </Button>
                                    </td>
                                    <td className="text-center">
                                        <Button variant="transparent" className="pe-auto" >
                                            <AiFillDelete color="red" />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                "No appointments are booked!"
            )}
        </div>
    );
};

export default FetchAppointments;