export default interface Provider {
    nit_provider: string;
    email_provider: string;
    name_provider: string;
    last_name_provider: string;
    name_company: string;
    city_provider: string;
    password_provider: string;
    profile_photo_provider?: string | null;
    cover_photo_provier?: string | null;
    description_provider: string;
    neighborhood: string;
    street: string;
    number_street: string
    number_provider: string
}