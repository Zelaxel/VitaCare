export interface AppointmentData {
    id?: number
    id_patient: string
    id_doctor: string
    title: string
    department: string
    attendance_date: Date
    reason: string
    conclusion?: string
}