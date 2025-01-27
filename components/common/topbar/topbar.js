"use client";
import { Toaster, toast } from "react-hot-toast";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Flag from "react-world-flags";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserRound, ArrowUpLeft, Plus, ChevronDown, X, Settings, ArrowRightToLine, Pencil, Eye, EyeOff } from 'lucide-react';
import { useAccount } from "@/context/accountProvider/accountProvider";
import { getCountryOptions } from "@/utils/getCountryOptions/getCountryOptions";
import { getCurrencyOptions } from "@/utils/getCurrencyOptions/getCurrencyOptions";
import QRCode from "react-qr-code";
import styles from "./topbar.module.css";

import crypto from '@/public/images/currency/crypto.svg';

const countryOptions = getCountryOptions();
const currencyOptions = getCurrencyOptions();

export default function Topbar() {
    const { accountBalance } = useAccount();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState("Demo Account");
    const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
    const [isPaymentSidebarOpen, setPaymentSidebarOpen] = useState(false);
    const [isBottomSidebarOpen, setBottomSidebarOpen] = useState(false);
    const [isProfileFieldsSidebarOpen, setProfileFieldsSidebarOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [isPasswordSidebarOpen, setPasswordSidebarOpen] = useState(false);
    const [isNotificationSidebarOpen, setNotificationSidebarOpen] = useState(false);
    const [is2FASidebarOpen, set2FASidebarOpen] = useState(false);
    const [isDepositFieldsSidebarOpen, setDepositFieldsSidebarOpen] = useState(false);
    const [isWithdrawFieldsSidebarOpen, setWithdrawFieldsSidebarOpen] = useState(false);
    const [isExchangeFieldsSidebarOpen, setExchangeFieldsSidebarOpen] = useState(false);
    const [selectedGateway, setSelectedGateway] = useState("");
    const [amount, setAmount] = useState("");
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordVisibility, setPasswordVisibility] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [profileInfo, setProfileInfo] = useState({
        name: "John Doe",
        email: "email@example.com",
        firstName: "First Name...",
        lastName: "Last Name...",
        country: countryOptions[0],
        currency: currencyOptions[0],
        profileImage: crypto,
    });
    const [notifications, setNotifications] = useState([
        { id: 1, message: "You have a new message from Support." },
        { id: 2, message: "Your profile has been updated successfully." },
        { id: 3, message: "You received a new connection request." },
    ]);

    const [googleAuthSecret] = useState("DZHNX6AJVMT6677X");

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const toggleProfileSidebar = () => setProfileSidebarOpen((prev) => !prev);
    const toggleBottomSidebar = () => setBottomSidebarOpen((prev) => !prev);
    const togglePaymentSidebar = () => setPaymentSidebarOpen((prev) => !prev);

    const closeAllSidebars = () => {
        setSidebarOpen(false);
        setProfileSidebarOpen(false);
        setBottomSidebarOpen(false);
        setProfileFieldsSidebarOpen(false);
        setPasswordSidebarOpen(false);
        setNotificationSidebarOpen(false);
        set2FASidebarOpen(false);
        setPaymentSidebarOpen(false);
        setDepositFieldsSidebarOpen(false);
        setWithdrawFieldsSidebarOpen(false);
        setExchangeFieldsSidebarOpen(false);
    };

    const selectAccount = (accountType) => {
        setSelectedAccount(accountType);
        toggleSidebar();
    };

    const handleProfileInformationClick = () => {
        setProfileFieldsSidebarOpen(true);
    };

    const handlePasswordInformationClick = () => {
        setPasswordSidebarOpen(true);
    };

    const handleNotificationInformationClick = () => {
        setNotificationSidebarOpen(true);
    };

    const handle2FAInformationClick = () => {
        set2FASidebarOpen(true);
    };

    const handleDepositInformationClick = () => {
        setDepositFieldsSidebarOpen(true);
    };

    const handleWithdrawInformationClick = () => {
        setWithdrawFieldsSidebarOpen(true);
    };

    const handleExchangeInformationClick = () => {
        setExchangeFieldsSidebarOpen(true);
    };

    const handleCountryChange = (selectedOption) => {
        setProfileInfo((prev) => ({
          ...prev,
          country: selectedOption,
          phone: selectedOption.code,
        }));
    };

    const handleCurrencyChange = (selectedOption) => {
        setProfileInfo((prev) => ({
          ...prev,
          currency: selectedOption,
          phone: selectedOption.code,
        }));
    };
    
    const handlePhoneChange = (value) => {
        setProfileInfo((prev) => ({
          ...prev,
          phone: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        toast.success('Profile updated successfully!', {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfileImage = () => {
        if (previewImage) {
          setProfileInfo((prev) => ({
            ...prev,
            profileImage: previewImage, // Update profile image
          }));
          setPreviewImage(null); // Clear the preview
          toast.success("Profile updated successfully!" , {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
        } else {
          toast.error("Please select an image first." , {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
        }
    };

    const handlePasswordChange = (event) => {
        event.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = passwords;
    
        if (!oldPassword || !newPassword || !confirmPassword) {
          toast.error("All fields are required!" , {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
          return;
        }
    
        if (newPassword !== confirmPassword) {
          toast.error("New password and confirm password do not match!" , {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
          return;
        }
    
        // Handle password change logic (e.g., API request)
        toast.success("Password updated successfully!" , {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setPasswordSidebarOpen(false); // Close password sidebar
    };

    const handleDepositSubmit = (e) => {
        e.preventDefault();
        if (amount < 10 || amount > 5000) {
            toast.error("Amount must be between $10 and $5,000." , {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
            return;
        }
        toast.success("Deposit successfull.", {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
    };

    const handleWithdrawSubmit = (e) => {
        e.preventDefault();
        if (amount < 10 || amount > 5000) {
            toast.error("Amount must be between $10 and $5,000." , {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
            return;
        }
        toast.success("Withdraw successfull.", {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
    };

    const handleExchangeSubmit = (e) => {
        e.preventDefault();
    
        // Validation: Check if a currency is selected
        if (!profileInfo.currency) {
        toast.error("Currency selection is required." , {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
          return;
        }
        toast.success(`Currency exchanged to: ${profileInfo.currency.label}` , {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prev) => ({
          ...prev,
          [field]: !prev[field],
        }));
    };

    return (
        <>
            <Toaster reverseOrder={false} theme="dark" />
            <div className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 flex justify-center items-center bg-[#0d1f30] rounded-md">
                        <Plus className="w-6" />
                    </div>
                    <div className="flex items-center bg-[#0d1f30] py-1.5 px-3 rounded-md">
                        <div className="">
                            <Image src={crypto} 
                                className="object-cover" 
                                width={30} 
                                alt="currency"
                            />
                        </div>
                        <div className="pl-1">
                            <div className="text-sm leading-[18px] text-white">Asia Composite Index</div>
                            <div className="text-[12px] leading-[14px]">FT - <span className="text-emerald-400">85%</span></div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative top-1 mr-6 cursor-pointer" onClick={toggleSidebar}>
                        <div className="text-white font-semibold text-[18px] leading-[20px]">Đ{accountBalance.toFixed(2)}</div>
                        <div className="text-[12px] text-emerald-400">{selectedAccount}</div>
                        <div className="absolute bottom-[4px] right-[-20px]">
                            <ChevronDown className="w-4" />
                        </div>
                    </div>
                    <div onClick={togglePaymentSidebar}>
                        <button className="baseBtn !py-2 !px-4">Payments</button>
                    </div>
                    <div className="relative w-11 h-11 flex justify-center items-center bg-[#0d1f30] rounded-full cursor-pointer" onClick={toggleProfileSidebar}>
                        <UserRound className="w-5" />
                        <div className="absolute bottom-0 right-[-5px] w-5 h-5 flex justify-center items-center bg-[#0d1f30] border-2 border-[#000000] rounded-full">
                            <ArrowUpLeft className="text-[#2e71e5] w-4" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg transform p-4 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Accounts</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    <button
                        className={`w-full text-left py-3 px-7 rounded-md mb-2 ${
                        selectedAccount === "Demo Account"
                            ? "bg-[#0d1f30]"
                            : "bg-transparent"
                        }`}
                        onClick={() => selectAccount("Demo Account")}
                    >
                        <div className="text-white font-semibold text-[18px] leading-[20px]">Đ{accountBalance.toFixed(2)}</div>
                        <div className="text-[12px] text-emerald-400">Demo Account</div>
                    </button>
                    <button
                        className={`w-full text-left py-3 px-7 rounded-md ${
                        selectedAccount === "Live Account"
                            ? "bg-[#0d1f30]"
                            : "bg-transparent"
                        }`}
                        onClick={() => selectAccount("Live Account")}
                    >
                        <div className="text-white font-semibold text-[18px] leading-[20px]">Đ{accountBalance.toFixed(2)}</div>
                        <div className="text-[12px] text-emerald-400">Live Account</div>
                    </button>
                </div>
            </div>
            <div className={`fixed top-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg p-4 transform ${isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Profile</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="flex flex-col justify-between h-full p-4 pb-16">
                    <div className="flex items-center mb-4">
                        <div className="relative w-11 h-11 flex justify-center items-center bg-[#0d1f30] rounded-full cursor-pointer" onClick={toggleProfileSidebar}>
                            <UserRound className="w-5" />
                            <div className="absolute bottom-0 right-[-5px] w-5 h-5 flex justify-center items-center bg-[#0d1f30] border-2 border-[#000000] rounded-full">
                                <ArrowUpLeft className="text-[#2e71e5] w-4" />
                            </div>
                        </div>
                        <div className="pl-3 text-white">
                            <div className="text-sm">{profileInfo.name}</div>
                            <div className="text-[12px]">{profileInfo.email}</div>
                        </div>
                    </div>
                    <button
                        className="w-full flex justify-center py-3 px-3 bg-[#0d1f30] text-white rounded-md mt-auto"
                        onClick={toggleBottomSidebar}
                    >
                        <Settings className="w-5 mr-2" /> Profile Settings
                    </button>
                </div>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg p-4 transform ${isBottomSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Settings</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-3 p-4">
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handleProfileInformationClick}>
                        Profile Information
                    </button>
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handle2FAInformationClick}>
                        Two-Factor Authentication
                    </button>
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handlePasswordInformationClick}>
                        Password
                    </button>
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handleNotificationInformationClick}>
                        Notification
                    </button>
                </div>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg p-4 transform ${isPaymentSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Payments</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-3 p-4">
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handleDepositInformationClick}>
                        Deposit
                    </button>
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handleWithdrawInformationClick}>
                        Withdraw
                    </button>
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handleExchangeInformationClick}>
                        Exchange
                    </button>
                </div>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg p-4 transform ${isProfileFieldsSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-white text-lg font-semibold">Profile Information</h2>
                        <button onClick={closeAllSidebars}>
                            <X className="text-white w-5 h-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 p-4">
                        <div className="relative w-[120px] h-[120px] rounded-[50%] mx-auto">
                            <Image
                                src={previewImage || profileInfo.profileImage}
                                alt="Profile"
                                width={120}
                                height={120}
                                className="rounded-full w-full h-full border-2 border-slate-800 mx-auto object-cover"
                            />
                            <label
                                htmlFor="profileImage"
                                className="absolute bottom-[-15px] left-[50%] transform translate-x-[-50%] bg-[#0d1f30] text-white w-10 h-10 flex justify-center items-center rounded-full cursor-pointer"
                            >
                                <Pencil className="w-4" />
                            </label>
                            <input
                                type="file"
                                id="profileImage"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="text-white">
                            <label className="text-sm mb-2 block">First Name</label>
                            <input
                            type="text"
                            className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                            placeholder={profileInfo.firstName}
                            required
                            />
                        </div>
                        <div className="text-white">
                            <label className="text-sm mb-2 block">Last Name</label>
                            <input
                            type="text"
                            className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                            placeholder={profileInfo.lastName}
                            required
                            />
                        </div>
                        <div className="text-white">
                            <label className="text-sm mb-2 block">Country</label>
                            <Select
                                options={countryOptions}
                                value={profileInfo.country}
                                onChange={handleCountryChange}
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                isSearchable
                                getOptionLabel={(e) => (
                                    <div className="flex items-center gap-2">
                                      <Flag code={e.value} style={{ width: 20, height: 15 }} />{" "}
                                      {e.label}
                                    </div>
                                )}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        background: "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)",
                                        borderColor: "none",
                                        height: "45px",
                                        borderRadius: "0.375rem",
                                        color: "#ffffff",
                                        fontSize: "14px",
                                        borderColor: "#1e293b",
                                        "&:hover": {
                                            borderColor: "#1e293b",
                                        },
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        borderRadius: "0.375rem",
                                        paddingTop: "0",
                                        background: "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)",
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: "white",
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        background: state.isSelected ? "#0d1f30" : "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)", // Highlight selected option
                                        color: state.isSelected ? "white" : "white", // Text color for options
                                        padding: "10px",
                                        cursor: "pointer",
                                        borderRadius: "0.375rem",
                                    }),
                                    dropdownIndicator: (provided) => ({
                                        ...provided,
                                        color: "#cbd5e1",
                                    }),
                                    indicatorSeparator: (provided) => ({
                                        ...provided,
                                        background: "#1e293b",
                                    }),
                                    placeholder: (base) => ({
                                        ...base,
                                        color: "#cbd5e1",
                                        fontSize: "14px",
                                    }),
                                }}
                            />
                        </div>
                        <div className="text-white">
                            <label className="text-sm mb-2 block">Phone</label>
                            <PhoneInput
                                country={profileInfo.country.value}
                                value={profileInfo.phone}
                                disableDropdown
                                onChange={handlePhoneChange}
                                inputStyle={{
                                    width: "100%",
                                    height: "44px",
                                    background: "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)",
                                    color: "#fff",
                                    fontSize: "14px",
                                    borderColor: "#1e293b",
                                    borderRadius: "0.375rem",
                                    paddingLeft: "10px"
                                }}
                                buttonStyle={{
                                    display: "none",
                                }}
                                dropdownStyle={{
                                    background: "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)",
                                    color: "#fff",
                                }}
                            />
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="baseBtn flex justify-center w-full">Update <ArrowRightToLine /></button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg p-4 transform ${isPasswordSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <form onSubmit={handlePasswordChange}>
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-white text-lg font-semibold">Change Password</h2>
                        <button onClick={closeAllSidebars}>
                            <X className="text-white w-5 h-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 p-4">
                        {["oldPassword", "newPassword", "confirmPassword"].map((field) => (
                            <div className="relative text-white" key={field}>
                                <label className="text-sm mb-2 block">{field.replace("Password", " Password")}</label>
                                <input
                                    type={passwordVisibility[field] ? "text" : "password"}
                                    id={field}
                                    name={field}
                                    value={passwords[field]}
                                    placeholder={field.replace("Password", " Password")}
                                    onChange={handleInputChange}
                                    className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-5 top-[40px] text-gray-400"
                                    onClick={() => togglePasswordVisibility(field)}
                                >
                                    {passwordVisibility[field] ? (
                                        <EyeOff className="w-5 h-5" />
                                        ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        ))}
                        <div className="mt-2">
                            <button type="submit" className="baseBtn flex justify-center w-full">Change <ArrowRightToLine /></button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={`fixed top-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg p-4 transform ${isNotificationSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Notifications</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="p-4 text-white">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="mb-2 bg-[#0d1f30] p-3 rounded-md"
                        >
                            {notification.message}
                        </div>
                        ))
                    ) : (
                        <div className="text-center text-sm text-gray-400">
                            No notifications available.
                        </div>
                    )}
                </div>
            </div>
            <div className={`fixed top-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg p-4 transform ${is2FASidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Two-Factor Authentication</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-3 p-4">
                    <div className="p-4 bg-[#0d1f30] rounded-lg text-center">
                        <h3 className="text-white text-lg font-semibold mb-4">Scan with Google Authenticator</h3>
                        <QRCode className="w-[200px] h-[200px] mx-auto" value={googleAuthSecret} />
                        <div className="mt-4 text-white">Scan this code in your Google Authenticator app.</div>
                    </div>
                    <div className="p-4 bg-[#0d1f30] rounded-lg text-white">
                        <h3 className="text-lg font-semibold mb-4">Google Authenticator Setup</h3>
                        <ul className="list-disc ml-4">
                        <li>Download and install the Google Authenticator app from your App Store or Google Play.</li>
                        <li>Open the app and scan the QR code on the left to add your account.</li>
                        <li>Once added, you will see a 6-digit code that refreshes every 30 seconds.</li>
                        <li>Enter this 6-digit code in the field below to complete the verification.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg p-4 transform ${isDepositFieldsSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Deposit</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleDepositSubmit}>
                    <div className="p-4 text-white">
                        <p className="text-sm">
                            <span className="font-semibold">Exchange Rate:</span> 1 USD = 85.00 XYZ
                        </p>
                        <p className="text-sm mt-2">
                            <span className="font-semibold">Limits:</span> Min $10, Max $5,000
                        </p>
                        <p className="text-sm mt-2">
                            <span className="font-semibold">Charge:</span> $2.00
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 p-4">
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Payment Gateway</label>
                            <Select
                                options={[
                                    { value: "paypal", label: "PayPal" },
                                    { value: "stripe", label: "Stripe" },
                                    { value: "bank", label: "Bank Transfer" },
                                ]}
                                onChange={(e) => setSelectedGateway(e.value)}
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                isSearchable
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        background: "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)",
                                        borderColor: "none",
                                        height: "45px",
                                        borderRadius: "0.375rem",
                                        color: "#ffffff",
                                        fontSize: "14px",
                                        borderColor: "#1e293b",
                                        "&:hover": {
                                            borderColor: "#1e293b",
                                        },
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        borderRadius: "0.375rem",
                                        paddingTop: "0",
                                        background: "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)",
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: "white",
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        background: state.isSelected ? "#0d1f30" : "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)", // Highlight selected option
                                        color: state.isSelected ? "white" : "white", // Text color for options
                                        padding: "10px",
                                        cursor: "pointer",
                                        borderRadius: "0.375rem",
                                    }),
                                    dropdownIndicator: (provided) => ({
                                        ...provided,
                                        color: "#cbd5e1",
                                    }),
                                    indicatorSeparator: (provided) => ({
                                        ...provided,
                                        background: "#1e293b",
                                    }),
                                    placeholder: (base) => ({
                                        ...base,
                                        color: "#cbd5e1",
                                        fontSize: "14px",
                                    }),
                                }}
                            />
                        </div>
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                placeholder="Enter amount"
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                required
                            />
                        </div>
                        <div className="mt-2 text-sm text-white">
                            <p>
                                <span className="font-semibold">Total:</span> $
                                {(parseFloat(amount) || 0) + 2.0}
                            </p>
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="baseBtn flex justify-center w-full">Deposit <ArrowRightToLine /></button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg p-4 transform ${isWithdrawFieldsSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Withdraw</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleWithdrawSubmit}>
                    <div className="p-4 text-white">
                        <p className="text-sm">
                            <span className="font-semibold">Exchange Rate:</span> 1 USD = 85.00 XYZ
                        </p>
                        <p className="text-sm mt-2">
                            <span className="font-semibold">Limits:</span> Min $10, Max $5,000
                        </p>
                        <p className="text-sm mt-2">
                            <span className="font-semibold">Charge:</span> $2.00
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 p-4">
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Payment Gateway</label>
                            <Select
                                options={[
                                    { value: "paypal", label: "PayPal" },
                                    { value: "stripe", label: "Stripe" },
                                    { value: "bank", label: "Bank Transfer" },
                                ]}
                                onChange={(e) => setSelectedGateway(e.value)}
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                isSearchable
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        background: "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)",
                                        borderColor: "none",
                                        height: "45px",
                                        borderRadius: "0.375rem",
                                        color: "#ffffff",
                                        fontSize: "14px",
                                        borderColor: "#1e293b",
                                        "&:hover": {
                                            borderColor: "#1e293b",
                                        },
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        borderRadius: "0.375rem",
                                        paddingTop: "0",
                                        background: "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)",
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: "white",
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        background: state.isSelected ? "#0d1f30" : "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)", // Highlight selected option
                                        color: state.isSelected ? "white" : "white", // Text color for options
                                        padding: "10px",
                                        cursor: "pointer",
                                        borderRadius: "0.375rem",
                                    }),
                                    dropdownIndicator: (provided) => ({
                                        ...provided,
                                        color: "#cbd5e1",
                                    }),
                                    indicatorSeparator: (provided) => ({
                                        ...provided,
                                        background: "#1e293b",
                                    }),
                                    placeholder: (base) => ({
                                        ...base,
                                        color: "#cbd5e1",
                                        fontSize: "14px",
                                    }),
                                }}
                            />
                        </div>
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                placeholder="Enter amount"
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                required
                            />
                        </div>
                        <div className="mt-2 text-sm text-white">
                            <p>
                                <span className="font-semibold">Total:</span> $
                                {(parseFloat(amount) || 0) + 2.0}
                            </p>
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="baseBtn flex justify-center w-full">Withdraw <ArrowRightToLine /></button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg p-4 transform ${isExchangeFieldsSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Exchange</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleExchangeSubmit}>
                    <div className="grid grid-cols-1 gap-3 p-4">
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">From Wallet</label>
                            <input
                                type="text"
                                value="USD"
                                placeholder="Enter wallet"
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                readOnly
                            />
                        </div>
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Exchange To</label>
                            <Select
                                options={currencyOptions}
                                value={profileInfo.currency}
                                onChange={handleCurrencyChange}
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                isSearchable
                                getOptionLabel={(e) => (
                                    <div className="flex items-center gap-2">
                                      <Flag code={e.value} style={{ width: 20, height: 15 }} />{" "}
                                      {e.label}
                                    </div>
                                )}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        background: "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)",
                                        borderColor: "none",
                                        height: "45px",
                                        borderRadius: "0.375rem",
                                        color: "#ffffff",
                                        fontSize: "14px",
                                        borderColor: "#1e293b",
                                        "&:hover": {
                                            borderColor: "#1e293b",
                                        },
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        borderRadius: "0.375rem",
                                        paddingTop: "0",
                                        background: "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)",
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: "white",
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        background: state.isSelected ? "#0d1f30" : "linear-gradient(137.45deg, #081e32 7.42%, #011120 104.16%)", // Highlight selected option
                                        color: state.isSelected ? "white" : "white", // Text color for options
                                        padding: "10px",
                                        cursor: "pointer",
                                        borderRadius: "0.375rem",
                                    }),
                                    dropdownIndicator: (provided) => ({
                                        ...provided,
                                        color: "#cbd5e1",
                                    }),
                                    indicatorSeparator: (provided) => ({
                                        ...provided,
                                        background: "#1e293b",
                                    }),
                                    placeholder: (base) => ({
                                        ...base,
                                        color: "#cbd5e1",
                                        fontSize: "14px",
                                    }),
                                }}
                            />
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="baseBtn flex justify-center w-full">Exchange <ArrowRightToLine /></button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}