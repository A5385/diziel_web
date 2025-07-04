
/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */

Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.9.0
 * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
 */
Prisma.prismaVersion = {
  client: "6.9.0",
  engine: "81e4af48011447c3cc503a190e86995b66d2a28e"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  phone: 'phone',
  otp: 'otp',
  role: 'role',
  hashedPassword: 'hashedPassword',
  passwordSet: 'passwordSet',
  blocked: 'blocked',
  verified: 'verified',
  retryCount: 'retryCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LoginInfoScalarFieldEnum = {
  id: 'id',
  lastLogin: 'lastLogin',
  lastLoginAttempt: 'lastLoginAttempt',
  lastLoginIp: 'lastLoginIp',
  lastLoginDevice: 'lastLoginDevice',
  userId: 'userId'
};

exports.Prisma.ProfileScalarFieldEnum = {
  id: 'id',
  email: 'email',
  fullName: 'fullName',
  nickname: 'nickname',
  image: 'image',
  otherInfo: 'otherInfo',
  profileComplete: 'profileComplete',
  userId: 'userId'
};

exports.Prisma.AddressScalarFieldEnum = {
  id: 'id',
  line1: 'line1',
  line2: 'line2',
  city: 'city',
  country: 'country',
  state: 'state',
  profileId: 'profileId'
};

exports.Prisma.NationalIdentityScalarFieldEnum = {
  id: 'id',
  nationalIdNumber: 'nationalIdNumber',
  face: 'face',
  back: 'back',
  profileId: 'profileId'
};

exports.Prisma.DriverScalarFieldEnum = {
  id: 'id',
  suspendDuration: 'suspendDuration',
  driverType: 'driverType',
  grade: 'grade',
  profileId: 'profileId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.DriverDocumentsScalarFieldEnum = {
  id: 'id',
  criminalRecord: 'criminalRecord',
  driverId: 'driverId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.DrugTestScalarFieldEnum = {
  id: 'id',
  testDate: 'testDate',
  result: 'result',
  testImage: 'testImage',
  driverDocumentId: 'driverDocumentId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.DriverLicenseScalarFieldEnum = {
  id: 'id',
  number: 'number',
  type: 'type',
  traffic_unit: 'traffic_unit',
  face: 'face',
  back: 'back',
  startDate: 'startDate',
  endDate: 'endDate',
  driverDocumentId: 'driverDocumentId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.PassportScalarFieldEnum = {
  id: 'id',
  number: 'number',
  face: 'face',
  back: 'back',
  driverDocumentId: 'driverDocumentId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.VisaScalarFieldEnum = {
  id: 'id',
  image: 'image',
  startDate: 'startDate',
  endDate: 'endDate',
  country: 'country',
  comments: 'comments',
  passportId: 'passportId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.AgencyAgentScalarFieldEnum = {
  id: 'id',
  profileId: 'profileId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.AgencyAgentDelegationScalarFieldEnum = {
  id: 'id',
  agentAgencyId: 'agentAgencyId',
  active: 'active',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.AgencyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  registrationRecord: 'registrationRecord',
  phone1: 'phone1',
  phone2: 'phone2',
  phone3: 'phone3',
  email: 'email',
  profileId: 'profileId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.EmployeeScalarFieldEnum = {
  id: 'id',
  cv: 'cv',
  profileId: 'profileId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.TruckScalarFieldEnum = {
  id: 'id',
  plateNumber: 'plateNumber',
  type: 'type',
  brand: 'brand',
  axleCount: 'axleCount',
  modelYear: 'modelYear',
  cargoType: 'cargoType',
  maxLoad: 'maxLoad',
  safetyEquipment: 'safetyEquipment',
  chassisNumber: 'chassisNumber',
  engineNumber: 'engineNumber',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.TruckImageScalarFieldEnum = {
  id: 'id',
  front: 'front',
  back: 'back',
  left: 'left',
  right: 'right',
  truckId: 'truckId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.TruckLicenseScalarFieldEnum = {
  id: 'id',
  number: 'number',
  face: 'face',
  back: 'back',
  truckId: 'truckId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.TruckOwnershipScalarFieldEnum = {
  id: 'id',
  ownershipProof: 'ownershipProof',
  utilityBill: 'utilityBill',
  profileId: 'profileId',
  truckId: 'truckId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.DriverTruckScalarFieldEnum = {
  id: 'id',
  driverId: 'driverId',
  truckId: 'truckId',
  delegationId: 'delegationId',
  active: 'active',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.DelegationScalarFieldEnum = {
  id: 'id',
  active: 'active',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.TrailerScalarFieldEnum = {
  id: 'id',
  plateNumber: 'plateNumber',
  type: 'type',
  brand: 'brand',
  axleCount: 'axleCount',
  modelYear: 'modelYear',
  cargoType: 'cargoType',
  maxLoad: 'maxLoad',
  safetyEquipment: 'safetyEquipment',
  chassisNumber: 'chassisNumber',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.TrailerImageScalarFieldEnum = {
  id: 'id',
  front: 'front',
  back: 'back',
  left: 'left',
  right: 'right',
  trailerId: 'trailerId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.TrailerLicenseScalarFieldEnum = {
  id: 'id',
  number: 'number',
  face: 'face',
  back: 'back',
  trailerId: 'trailerId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.TrailerOwnershipScalarFieldEnum = {
  id: 'id',
  ownershipProof: 'ownershipProof',
  utilityBill: 'utilityBill',
  profileId: 'profileId',
  trailerId: 'trailerId',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.RequestScalarFieldEnum = {
  id: 'id',
  requestedById: 'requestedById',
  carType: 'carType',
  cargoType: 'cargoType',
  unitType: 'unitType',
  unitCount: 'unitCount',
  pickupLocation: 'pickupLocation',
  dropoffLocation: 'dropoffLocation',
  distanceKM: 'distanceKM',
  priceEstimate: 'priceEstimate',
  transportType: 'transportType',
  paymentOption: 'paymentOption',
  advancePayment: 'advancePayment',
  status: 'status',
  notes: 'notes',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.ComplaintScalarFieldEnum = {
  id: 'id',
  raisedById: 'raisedById',
  truckId: 'truckId',
  description: 'description',
  status: 'status',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  updatedAt: 'updatedAt',
  updaterId: 'updaterId',
  archivedAt: 'archivedAt',
  archivedById: 'archivedById'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  content: 'content',
  type: 'type',
  read: 'read',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  fromId: 'fromId',
  toId: 'toId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserRole = exports.$Enums.UserRole = {
  admin: 'admin',
  operator: 'operator',
  employee: 'employee',
  client: 'client',
  agency: 'agency',
  agencyAgent: 'agencyAgent',
  owner: 'owner',
  driver: 'driver'
};

exports.DriverType = exports.$Enums.DriverType = {
  national: 'national',
  international: 'international',
  all: 'all'
};

exports.DriverGrade = exports.$Enums.DriverGrade = {
  first: 'first',
  second: 'second',
  third: 'third'
};

exports.DrugTestResult = exports.$Enums.DrugTestResult = {
  negative: 'negative',
  positive: 'positive'
};

exports.DriverLicenseType = exports.$Enums.DriverLicenseType = {
  first: 'first',
  second: 'second',
  third: 'third',
  private: 'private'
};

exports.UnitType = exports.$Enums.UnitType = {
  shipment: 'shipment',
  ton: 'ton',
  cubic_meter: 'cubic_meter',
  jump: 'jump',
  pallet: 'pallet',
  container_20: 'container_20',
  container_40: 'container_40'
};

exports.TransportType = exports.$Enums.TransportType = {
  inclusive: 'inclusive',
  exclusive: 'exclusive'
};

exports.PaymentOption = exports.$Enums.PaymentOption = {
  cash: 'cash',
  bank_transfer: 'bank_transfer',
  ewallet: 'ewallet'
};

exports.RequestStatus = exports.$Enums.RequestStatus = {
  pending: 'pending',
  assigned: 'assigned',
  completed: 'completed',
  canceled: 'canceled'
};

exports.ComplaintStatus = exports.$Enums.ComplaintStatus = {
  open: 'open',
  resolved: 'resolved',
  canceled: 'canceled'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  newRequest: 'newRequest',
  closedRequest: 'closedRequest',
  newComplain: 'newComplain',
  resolvedComplain: 'resolvedComplain'
};

exports.Prisma.ModelName = {
  User: 'User',
  LoginInfo: 'LoginInfo',
  Profile: 'Profile',
  Address: 'Address',
  NationalIdentity: 'NationalIdentity',
  Driver: 'Driver',
  DriverDocuments: 'DriverDocuments',
  DrugTest: 'DrugTest',
  DriverLicense: 'DriverLicense',
  Passport: 'Passport',
  Visa: 'Visa',
  AgencyAgent: 'AgencyAgent',
  AgencyAgentDelegation: 'AgencyAgentDelegation',
  Agency: 'Agency',
  Employee: 'Employee',
  Truck: 'Truck',
  TruckImage: 'TruckImage',
  TruckLicense: 'TruckLicense',
  TruckOwnership: 'TruckOwnership',
  DriverTruck: 'DriverTruck',
  Delegation: 'Delegation',
  Trailer: 'Trailer',
  TrailerImage: 'TrailerImage',
  TrailerLicense: 'TrailerLicense',
  TrailerOwnership: 'TrailerOwnership',
  Request: 'Request',
  Complaint: 'Complaint',
  Notification: 'Notification'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
