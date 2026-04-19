export interface Patient {
    identity_document: string
    identity_document_expire: string
    sanitary_document: string
    sanitary_document_expire: string
    phone_number: number
    mail: string
    password: string
    identity_document_country?: string
    sanitary_document_country?: string
    name?: string
    surname?: string
    birth_date?: string
    birth_country?: string
    nationality?: string
    address?: string
    postal_code?: number
    city?: string
    country?: string
}