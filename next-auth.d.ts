declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phoneNumber: string;
      fullname: string;
      patientCode: string | null;
      clinicId: string | null;
      clinicName: string | null;
    };
  }

  interface User {
    id: string;
    phoneNumber: string;
    fullname: string;
    patientCode: string | null;
    clinicId: string | null;
    clinicName: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phoneNumber: string;
    fullname: string;
    patientCode: string | null;
    clinicId: string | null;
    clinicName: string | null;
  }
}
