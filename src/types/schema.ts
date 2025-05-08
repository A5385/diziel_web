import {
    Address,
    Agency,
    AgencyAgent,
    AgencyAgentDelegation,
    Complaint,
    Delegation,
    Driver,
    DriverDocuments,
    DriverLicense,
    DriverTruck,
    DrugTest,
    Employee,
    LoginInfo,
    NationalIdentity,
    Notification,
    Passport,
    Profile,
    Request,
    Trailer,
    TrailerImage,
    TrailerLicense,
    TrailerOwnership,
    Truck,
    TruckImage,
    TruckLicense,
    TruckOwnership,
    User,
    Visa,
} from './prisma';

export type UserSchema = Partial<User> & {
    complaints?: ComplaintSchema[];
    requests?: RequestSchema[];
    loginInfo?: LoginInfoSchema;
    profile?: ProfileSchema;
    createdDrivers?: DriverSchema[];
    updatedDrivers?: DriverSchema[];
    deletedDrivers?: DriverSchema[];
    createdDriversDocuments?: DriverDocumentsSchema[];
    updatedDriversDocuments?: DriverDocumentsSchema[];
    deletedDriversDocuments?: DriverDocumentsSchema[];
    createdDrugTest?: DrugTestSchema[];
    updatedDrugTest?: DrugTestSchema[];
    deletedDrugTest?: DrugTestSchema[];
    createdDriverLicense?: DriverLicenseSchema[];
    updatedDriverLicense?: DriverLicenseSchema[];
    deletedDriverLicense?: DriverLicenseSchema[];
    createdPassport?: PassportSchema[];
    updatedPassport?: PassportSchema[];
    deletedPassport?: PassportSchema[];
    createdVisa?: VisaSchema[];
    updatedVisa?: VisaSchema[];
    deletedVisa?: VisaSchema[];
    createdAgencyAgent?: AgencyAgentSchema[];
    updatedAgencyAgent?: AgencyAgentSchema[];
    deletedAgencyAgent?: AgencyAgentSchema[];
    createdAgencyAgentDelegation?: AgencyAgentDelegationSchema[];
    updatedAgencyAgentDelegation?: AgencyAgentDelegationSchema[];
    deletedAgencyAgentDelegation?: AgencyAgentDelegationSchema[];
    createdAgency?: AgencySchema[];
    updatedAgency?: AgencySchema[];
    deletedAgency?: AgencySchema[];
    createdEmployee?: EmployeeSchema[];
    updatedEmployee?: EmployeeSchema[];
    deletedEmployee?: EmployeeSchema[];
    createdTruck?: TruckSchema[];
    updatedTruck?: TruckSchema[];
    deletedTruck?: TruckSchema[];
    createdTruckImage?: TruckImageSchema[];
    updatedTruckImage?: TruckImageSchema[];
    deletedTruckImage?: TruckImageSchema[];
    createdTruckLicense?: TruckLicenseSchema[];
    updatedTruckLicense?: TruckLicenseSchema[];
    deletedTruckLicense?: TruckLicenseSchema[];
    createdTruckOwnership?: TruckOwnershipSchema[];
    updatedTruckOwnership?: TruckOwnershipSchema[];
    deletedTruckOwnership?: TruckOwnershipSchema[];
    createdDriverTruck?: DriverTruckSchema[];
    updatedDriverTruck?: DriverTruckSchema[];
    deletedDriverTruck?: DriverTruckSchema[];
    createdDelegation?: DelegationSchema[];
    updatedDelegation?: DelegationSchema[];
    deletedDelegation?: DelegationSchema[];
    createdTrailer?: TrailerSchema[];
    updatedTrailer?: TrailerSchema[];
    deletedTrailer?: TrailerSchema[];
    createdTrailerImage?: TrailerImageSchema[];
    updatedTrailerImage?: TrailerImageSchema[];
    deletedTrailerImage?: TrailerImageSchema[];
    createdTrailerLicense?: TrailerLicenseSchema[];
    updatedTrailerLicense?: TrailerLicenseSchema[];
    deletedTrailerLicense?: TrailerLicenseSchema[];
    createdTrailerOwnership?: TrailerOwnershipSchema[];
    updatedTrailerOwnership?: TrailerOwnershipSchema[];
    deletedTrailerOwnership?: TrailerOwnershipSchema[];
    createdRequest?: RequestSchema[];
    updatedRequest?: RequestSchema[];
    deletedRequest?: RequestSchema[];
    createdComplaint?: ComplaintSchema[];
    updatedComplaint?: ComplaintSchema[];
    deletedComplaint?: ComplaintSchema[];
    notificationsSent?: NotificationSchema[];
    notificationsReceived?: NotificationSchema[];
};

export type LoginInfoSchema = Partial<LoginInfo> & {
    user?: UserSchema;
};

export type ProfileSchema = Partial<Profile> & {
    address?: AddressSchema;
    national?: NationalIdentitySchema;
    user?: UserSchema;
    carOwner?: TruckOwnershipSchema[];
    trailerOwner?: TrailerOwnershipSchema[];
    driver?: DriverSchema;
    agencyAgent?: AgencyAgentSchema;
    agency?: AgencySchema;
    employee?: EmployeeSchema;
};

export type AddressSchema = Partial<Address> & {
    profile?: ProfileSchema;
};

export type NationalIdentitySchema = Partial<NationalIdentity> & {
    profile?: ProfileSchema;
};

export type DriverSchema = Partial<Driver> & {
    documents?: DriverDocumentsSchema;
    profile?: ProfileSchema;
    driverTruck?: DriverTruckSchema[];
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type DriverDocumentsSchema = Partial<DriverDocuments> & {
    drugTest?: DrugTestSchema;
    passport?: PassportSchema;
    license?: DriverLicenseSchema;
    driver?: DriverSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type DrugTestSchema = Partial<DrugTest> & {
    driverDocuments?: DriverDocumentsSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type DriverLicenseSchema = Partial<DriverLicense> & {
    driverDocument?: DriverDocumentsSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type PassportSchema = Partial<Passport> & {
    visas?: VisaSchema[];
    driverDocument?: DriverDocumentsSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type VisaSchema = Partial<Visa> & {
    passport?: PassportSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type AgencyAgentSchema = Partial<AgencyAgent> & {
    profile?: ProfileSchema;
    delegations?: AgencyAgentDelegationSchema[];
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type AgencyAgentDelegationSchema = Partial<AgencyAgentDelegation> & {
    agentAgency?: AgencyAgentSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type AgencySchema = Partial<Agency> & {
    profile?: ProfileSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type EmployeeSchema = Partial<Employee> & {
    profile?: ProfileSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type TruckSchema = Partial<Truck> & {
    owner?: TruckOwnershipSchema;
    images?: TruckImageSchema;
    license?: TruckLicenseSchema;
    complaints?: ComplaintSchema[];
    drivers?: DriverTruckSchema[];
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type TruckImageSchema = Partial<TruckImage> & {
    truck?: TruckSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type TruckLicenseSchema = Partial<TruckLicense> & {
    truck?: TruckSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type TruckOwnershipSchema = Partial<TruckOwnership> & {
    profile?: ProfileSchema;
    truck?: TruckSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type DriverTruckSchema = Partial<DriverTruck> & {
    driver?: DriverSchema;
    truck?: TruckSchema;
    delegation?: DelegationSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type DelegationSchema = Partial<Delegation> & {
    DriverTruck?: DriverTruckSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type TrailerSchema = Partial<Trailer> & {
    owner?: TrailerOwnershipSchema;
    images?: TrailerImageSchema;
    license?: TrailerLicenseSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type TrailerImageSchema = Partial<TrailerImage> & {
    trailer?: TrailerSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type TrailerLicenseSchema = Partial<TrailerLicense> & {
    trailer?: TrailerSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type TrailerOwnershipSchema = Partial<TrailerOwnership> & {
    profile?: ProfileSchema;
    trailer?: TrailerSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type RequestSchema = Partial<Request> & {
    requestedBy?: UserSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type ComplaintSchema = Partial<Complaint> & {
    raisedBy?: UserSchema;
    relatedTruck?: TruckSchema;
    createdBy?: UserSchema;
    updatedBy?: UserSchema;
    archivedBy?: UserSchema;
};

export type NotificationSchema = Partial<Notification> & {
    from?: UserSchema;
    to?: UserSchema;
};
