export interface AppointmentData {
    id: number;
    id_patient: string;
    id_doctor: string;
    title: string;
    doctorName: string;
    doctorIcon: string;
    patientName: string;
    patientIcon: string;
    description: string;
    department: string;
    date: Date;
    paid: boolean;
    active: boolean;
    event_id: string;
}