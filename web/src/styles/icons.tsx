import { EyeIcon, PauseCircle, PlayCircle, PlusCircle, SettingsIcon, TrashIcon, UserIcon } from 'lucide-react';
import { MouseEventHandler } from 'react';
import { BiPauseCircle, BiReset } from 'react-icons/bi';
import { BsFiletypeXlsx, BsUpload } from 'react-icons/bs';
import { CiCircleInfo, CiDeliveryTruck, CiEdit, CiExport, CiImport, CiStickyNote } from 'react-icons/ci';
import { FaAngleDown, FaCheck, FaStoreAlt, FaTrailer } from 'react-icons/fa';
import { FaListCheck } from "react-icons/fa6";
import { FcTodoList } from 'react-icons/fc';
import { GrStorage } from 'react-icons/gr';
import { HiOutlinePlayCircle } from 'react-icons/hi2';
import { IoIosRefresh, IoMdOpen } from 'react-icons/io';
import { IoArrowBackCircleOutline, IoOpenOutline, IoReturnUpBackOutline } from 'react-icons/io5';
import {
    MdClose,
    MdDashboard,
    MdManageAccounts,
    MdNavigateBefore,
    MdNavigateNext,
    MdOutlineAssignmentInd,
    MdOutlineCancel,
    MdSupportAgent,
} from 'react-icons/md';

type IconsType = {
    size?: number;
    color?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const defaultSize = 16;
const defaultColor = 'gray';
export const DashboardIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <MdDashboard {...IconProps} />;
};

export const GoBackIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <IoReturnUpBackOutline {...IconProps} />;
};

export const AgentsIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <MdSupportAgent {...IconProps} />;
};
export const ClientsIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <MdManageAccounts {...IconProps} />;
};
export const StoresIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <FaStoreAlt {...IconProps} />;
};

export const DownArrow = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <FaAngleDown {...IconProps} />;
};
export const AddNewIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <PlusCircle {...IconProps} />;
};
export const ExportIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <CiExport {...IconProps} />;
};
export const ImportIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <CiImport {...IconProps} />;
};
export const ResetIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <BiReset {...IconProps} />;
};
export const CheckIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <FaCheck {...IconProps} />;
};
export const CancelIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <MdOutlineCancel {...IconProps} />;
};
export const PauseIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <BiPauseCircle {...IconProps} />;
};
export const ReturnIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <IoArrowBackCircleOutline {...IconProps} />;
};
export const RefreshIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <IoIosRefresh {...IconProps} />;
};
export const ArchievedIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <GrStorage {...IconProps} />;
};
export const ActiveIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <HiOutlinePlayCircle {...IconProps} />;
};
export const ShowOnMapIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <IoMdOpen {...IconProps} />;
};
export const AssignIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <MdOutlineAssignmentInd {...IconProps} />;
};

export const NextIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <MdNavigateNext {...IconProps} />;
};

export const PreviousIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <MdNavigateBefore {...IconProps} />;
};

export const UploadIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <BsUpload {...IconProps} />;
};

export const DeleteIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <TrashIcon {...IconProps} />;
};
export const SuspendIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <PauseCircle {...IconProps} />;
};
export const ActivateIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <PlayCircle {...IconProps} />;
};
export const EditIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <CiEdit {...IconProps} />;
};
export const PreviewIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <EyeIcon {...IconProps} />;
};
export const InfoIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <CiCircleInfo {...IconProps} />;
};
export const NoteIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <CiStickyNote {...IconProps} />;
};
export const XlsxIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <BsFiletypeXlsx {...IconProps} />;
};
export const CloseIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <MdClose {...IconProps} />;
};
export const OpenIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <IoOpenOutline {...IconProps} />;
};
export const StatusIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <FcTodoList {...IconProps} />;
};
export const SettingIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <SettingsIcon {...IconProps} />;
};
export const UsersIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <UserIcon {...IconProps} />;
};
export const TruckIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <CiDeliveryTruck  {...IconProps} />;
};
export const TrailerIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <FaTrailer   {...IconProps} />;
};
export const RequestIcon = ({
    size = defaultSize,
    color = defaultColor,
    className = '',
    ...rest
}: IconsType) => {
    const IconProps = { size, color, className, rest };
    return <FaListCheck    {...IconProps} />;
};
