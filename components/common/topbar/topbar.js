"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Flag from "react-world-flags";
import { useState, useEffect, Suspense } from "react";
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Link from "next/link";
import Image from "next/image";
import { UserRound, ArrowUpLeft, Plus, ChevronDown, X, Settings, ArrowRightToLine, Pencil, Eye, EyeOff, Search, Clock12, Info, LoaderCircle, CircleDollarSign } from 'lucide-react';
import { useAccount } from "@/context/accountProvider/accountProvider";
import { getCountryOptions } from "@/utils/getCountryOptions/getCountryOptions";
import { getCurrencyOptions } from "@/utils/getCurrencyOptions/getCurrencyOptions";
import { useTransactions } from "@/context/transactionProvider/transactionProvider";
import { useWallets } from "@/context/walletProvider/walletProvider";
import QRCode from "react-qr-code";
import { getUserDataAPI, userDataUpdateAPI, updatePasswordAPI, getTwoFactorInfo, updateSecurityAPI, getKycAPI, kycUpdateAPI, getDepositAPI, automaticDepositAPI, manualDepositAPI, getWithdrawAPI, withdrawRequestAPI, getWithdrawInstructionsAPI, submitWithdrawAPI, withdrawChargeAPI, switchAccountAPI, getExchangeAPI, submitExchangeAPI, exchangeChargeAPI, getInfoAPI, ProfileDeleteAPI } from "@/services/apiClient/apiClient";
import styles from "./topbar.module.css";

import crypto from '@/public/images/currency/crypto.svg';

const countryOptions = getCountryOptions();
const currencyOptions = getCurrencyOptions();

function TopbarContent() {
    const router = useRouter();
    const { fetchTransactions } = useTransactions();
    const { loading, setLoading, setSelectedAccountType, setSelectedBalance, demoBalance, setDemoBalance, liveBalance, setLiveBalance, currencySymbol, setCurrencySymbol, currencyCode, setCurrencyCode, demoAccountType, setDemoAccountType, liveAccountType, setLiveAccountType, fetchWallets } = useWallets();
    const { selectedAccountType, selectedBalance } = useAccount();
    const searchParams = useSearchParams();
    const withdrawToken = searchParams.get("withdrawToken");
    const { symbol, setSymbol, interval, setInterval } = useAccount();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState("LIVE");
    const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
    const [isPaymentSidebarOpen, setPaymentSidebarOpen] = useState(false);
    const [isBottomSidebarOpen, setBottomSidebarOpen] = useState(false);
    const [isProfileFieldsSidebarOpen, setProfileFieldsSidebarOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [isPasswordSidebarOpen, setPasswordSidebarOpen] = useState(false);
    const [isNotificationSidebarOpen, setNotificationSidebarOpen] = useState(false);
    const [is2FASidebarOpen, set2FASidebarOpen] = useState(false);
    const [isKycSidebarOpen, setKycSidebarOpen] = useState(false);
    const [isDepositFieldsSidebarOpen, setDepositFieldsSidebarOpen] = useState(false);
    const [isWithdrawFieldsSidebarOpen, setWithdrawFieldsSidebarOpen] = useState(false);
    const [isWithdrawAdditionalFieldsSidebarOpen, setWithdrawAdditionalFieldsSidebarOpen] = useState(false);
    const [transaction, setTransaction] = useState(false);
    const [isExchangeFieldsSidebarOpen, setExchangeFieldsSidebarOpen] = useState(false);
    const [paymentGateways, setPaymentGateways] = useState([]);
    const [selectedGateway, setSelectedGateway] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCurrencyDetails, setSelectedCurrencyDetails] = useState(null);
    const [instructions, setInstructions] = useState("");
    const [gateways, setGateways] = useState([]);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [exchangeData, setExchangeData] = useState(null);
    const [minLimit, setMinLimit] = useState(0);
    const [maxLimit, setMaxLimit] = useState(0);
    const [percentCharge, setPercentCharge] = useState(0);
    const [fixedCharge, setFixedCharge] = useState(0);
    const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
    const [selectedGatewayType, setSelectedGatewayType] = useState(null);
    const [fullName, setFullName] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [screenshot, setScreenshot] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileCode, setMobileCode] = useState("");
    const [status, setStatus] = useState(null);
    const [mobile, setMobile] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [fields, setFields] = useState([]);
    const [idType, setIdType] = useState("");
    const [frontFile, setFrontFile] = useState(null);
    const [backFile, setBackFile] = useState(null);
    const [inputFields, setInputFields] = useState([]);
    const [username, setUsername] = useState("");
    const [qrSVG, setQrSVG] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
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

    const [code, setCode] = useState("217046");
    const [exchangeId, setExchangeId] = useState("");
    const [charge, setCharge] = useState(null);
    const [loadingCharge, setLoadingCharge] = useState(false);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const toggleProfileSidebar = () => setProfileSidebarOpen((prev) => !prev);
    const toggleBottomSidebar = () => setBottomSidebarOpen((prev) => !prev);
    const togglePaymentSidebar = () => setPaymentSidebarOpen((prev) => !prev);
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [tradeCurrencies, setTradeCurrencies] = useState([]);
    const [isIntervalListOpen, setIsIntervalListOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
    const [filePreviews, setFilePreviews] = useState({});

    const openModal = () => {
        setModalOpen(true);
        setTimeout(() => setShowContent(true), 10);
    };

    const closeModal = () => {
        setShowContent(false);
        setTimeout(() => setModalOpen(false), 300);
    };

    const filteredTrades = tradeCurrencies.filter((trade) =>
        trade.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const closeAllSidebars = () => {
        setSidebarOpen(false);
        setProfileSidebarOpen(false);
        setBottomSidebarOpen(false);
        setProfileFieldsSidebarOpen(false);
        setPasswordSidebarOpen(false);
        setNotificationSidebarOpen(false);
        set2FASidebarOpen(false);
        setKycSidebarOpen(false);
        setPaymentSidebarOpen(false);
        setDepositFieldsSidebarOpen(false);
        setWithdrawFieldsSidebarOpen(false);
        setWithdrawAdditionalFieldsSidebarOpen(false);
        setExchangeFieldsSidebarOpen(false);
    };

    const selectAccount = async (accountType) => {
        const switcherValue = accountType === "Demo Account" ? "DEMO" : "LIVE";
        try {
            const response = await switchAccountAPI(switcherValue);
    
            if (response.data?.type === 'success') {
                setSelectedAccount(accountType);
                const selectedType = accountType === "Demo Account" ? "DEMO" : "LIVE";
                const selectedBal = accountType === "Demo Account" ? demoBalance : liveBalance;
    
                setSelectedBalance(selectedBal);
                setSelectedAccountType(selectedType);
    
                localStorage.setItem("selectedAccount", accountType);
                localStorage.setItem("selectedBalance", selectedBal);
                localStorage.setItem("selectedAccountType", selectedType);
    
                toast.success(response.data.message.success[0]);
            } else {
                toast.error(response.data.message.error[0]);
            }
        } catch (error) {
            toast.error("Server did not respond");
        }
    
        toggleSidebar();
    };
    
    useEffect(() => {
        const storedAccount = localStorage.getItem("selectedAccount");
        const storedBalance = localStorage.getItem("selectedBalance");
        const storedAccountType = localStorage.getItem("selectedAccountType");
        const storedCurrency = localStorage.getItem("currencySymbol");
    
        if (storedAccount && storedBalance && storedAccountType) {
            setSelectedAccount(storedAccount);
            setSelectedBalance(parseFloat(storedBalance));
            setSelectedAccountType(storedAccountType);
        }
    
        if (storedCurrency) {
            setCurrencySymbol(storedCurrency);
        }
    }, []);    
    
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

    const handleKycInformationClick = () => {
        setKycSidebarOpen(true);
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

    const openFileInput = () => {
        document.getElementById("profileImageInput").click();
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);
            const imageUrl = URL.createObjectURL(file);
            setUserImage(imageUrl);
        }
    };

    const handleUpdateProfileImage = () => {
        if (previewImage) {
          setProfileInfo((prev) => ({
            ...prev,
            profileImage: previewImage,
          }));
          setPreviewImage(null);
          toast.success("Profile updated successfully!" , {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
        } else {
          toast.error("Please select an image first." , {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const response = await updatePasswordAPI(currentPassword, newPassword, passwordConfirmation);
            response.data.message.success.forEach((msg) => {
                toast.success(msg);
            });
            setCurrentPassword("");
            setNewPassword("");
            setPasswordConfirmation("");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.message.error) {
                error.response.data.message.error.forEach((msg) => {
                    toast.error(msg);
                });
            } else {
                toast.error("Failed to update password.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchTradeCurrencies = async () => {
            try {
                const response = await fetch("https://data-api.binance.vision/api/v3/exchangeInfo");
                const data = await response.json();
                
                const formattedCurrencies = data.symbols.map((symbol) => ({
                    name: symbol.symbol,
                    profitability: `${Math.floor(Math.random() * 10) + 80}%`,
                    icon: crypto,
                }));

                setTradeCurrencies(formattedCurrencies);
                if (formattedCurrencies.length > 0) {
                    setSelectedTrade(formattedCurrencies[0]);
                }
            } catch (error) {
                toast.error("Error fetching trade currencies:", error);
            }
        };

        fetchTradeCurrencies();
    }, []);

    const intervalOptions = [
        { label: "1s" },
        { label: "1m" },
        { label: "3m" },
        { label: "5m" },
        { label: "15m" },
        { label: "30m" },
        { label: "1h" },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserDataAPI();
                const userInfo = response.data.data.user_info;

                setFirstName(userInfo.firstname || "");
                setLastName(userInfo.lastname || "");
                setMobileCode(userInfo.mobile_code || "");
                setMobile(userInfo.mobile || "");
                setCountry(userInfo.country || "");
                setCity(userInfo.city || "");
                setState(userInfo.state || "");
                setPostalCode(userInfo.postal_code || "");
                setAddress(userInfo.address || "");
                setUsername(userInfo.username || "");
                setEmail(userInfo.email || "");

                setUserData(response?.data);


                const baseUrl = response.data.data.image_paths.base_url;
                const imageUrl = userInfo.image
                    ? `${baseUrl}/${response.data.data.image_paths.path_location}/${userInfo.image}`
                    : `${baseUrl}/${response.data.data.image_paths.default_image}`;

                setUserImage(imageUrl);
            } catch (err) {
                setError("Server didn't respond for getting profile data");
            }
        };

        fetchUserData();
    }, []);

    const submitProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        const formData = new FormData();
        formData.append("firstname", firstName);
        formData.append("lastname", lastName);
        formData.append("mobile_code", mobileCode);
        formData.append("mobile", mobile);
        formData.append("country", country);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("postal_code", postalCode);
        formData.append("address", address);
        if (profileImage) {
            formData.append("image", profileImage);
        }
    
        try {
            const response = await userDataUpdateAPI(formData);
    
            if (response.status === 200 && response.data?.message?.success) {
                toast.success(response.data.message.success[0] || "Profile Updated Successfully");
    
                setUserData((prevData) => {
                    if (!prevData || !prevData.data || !prevData.data.user_info) {
                        return prevData;
                    }
    
                    return {
                        ...prevData,
                        data: {
                            ...prevData.data,
                            user_info: {
                                ...prevData.data.user_info,
                                firstname: firstName,
                                lastname: lastName,
                                mobile_code: mobileCode,
                                mobile: mobile,
                                country: country,
                                address: address,
                                state: state,
                                city: city,
                                postal_code: postalCode,
                                image: profileImage || prevData.data.user_info.image,
                            },
                        },
                    };
                });
            } else {
                toast.error("Unexpected response from the server.");
            }
        } catch (err) {
            const errors = err.response?.data?.message?.error;
    
            if (Array.isArray(errors)) {
                errors.reverse().forEach((errorMessage, index) => {
                    setTimeout(() => {
                        toast.error(errorMessage);
                    }, index * 50);
                });
            } else {
                toast.error(errors || "Server not responding. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    const onProfileDelete = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await ProfileDeleteAPI();

            console.log(response);

            const successMessage = response?.data?.message?.success || "Profile delete successful";

            successMessage.forEach((msg) => {
                toast.success(msg);
            })

            closeModal;

            router.push("/login");
        } catch (err) {
            if (err.response?.data?.message?.error) {
                const errors = err.response?.data?.message?.error;
                errors.forEach((msg) => {
                    toast.error(msg);
                });
            } else {
                toast.error("Server didn't gfhgfhghgh");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchQR = async () => {
            try {
                const res = await getTwoFactorInfo();
                setQrSVG(res.data.data.qr_code);
            } catch (error) {
                toast.error("Server did not respond");
            }
        };
        fetchQR();
    }, []);

    const submitTwoFactor = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const response = await updateSecurityAPI();
            response.data.message.success.forEach((msg) => {
                toast.success(msg);
            });
            setCode("");
            setIsTwoFactorEnabled(response.data.data.user_info.two_factor_verified === 1);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.message.error) {
                error.response.data.message.error.forEach((msg) => {
                    toast.error(msg);
                });
            } else {
                toast.error("Server did not respond");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getKycAPI()
            .then((response) => {
                const data = response.data.data;
                setFields(data.input_fields);

                const rawInstructions = data.instructions || "";
                const statusMap = {};

                rawInstructions.split(",").forEach((item) => {
                    const parts = item.split(":");
                    if (parts.length === 2) {
                        const key = parts[0].trim();
                        const value = parts[1].trim();
                        statusMap[key] = value;
                    }
                });

                const currentStatus = String(data.status).trim();
                const statusText = statusMap[currentStatus];

                setStatus(currentStatus); // ← store raw status code
                setInstructions(statusText || "Unknown status");
            })
            .catch((error) => {
                toast.error(error.response?.data?.message?.error);
            });
    }, []);


    const getStatusColor = (statusText) => {
        switch (statusText?.toLowerCase()) {
            case "approved":
                return "text-green-500";
            case "pending":
                return "text-yellow-500";
            case "rejected":
                return "text-red-500";
            default:
                return "text-sky-400";
        }
    };

    const handleChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            if (name === "front") setFrontFile(files[0]);
            if (name === "back") setBackFile(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            // 1. Submit KYC data
            await kycUpdateAPI(idType, frontFile, backFile);
            
            // 2. Fetch latest status from API
            const response = await getKycAPI();
            const data = response.data.data;
            const rawInstructions = data.instructions || "";
            
            // 3. Parse the status mapping
            const statusMap = {};
            rawInstructions.split(",").forEach((item) => {
                const parts = item.split(":");
                if (parts.length === 2) {
                    statusMap[parts[0].trim()] = parts[1].trim();
                }
            });

            // 4. Update state with latest status
            const currentStatus = String(data.status).trim();
            setStatus(currentStatus);
            setInstructions(statusMap[currentStatus] || "Status updated");
            
            toast.success("KYC submitted successfully");
        } catch (error) {
            if (error.response?.data?.message?.error) {
                error.response.data.message.error.forEach(toast.error);
            } else {
                toast.error("Server did not respond");
            }
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     const fetchGateways = async () => {
    //         try {
    //             const response = await getDepositAPI();
    //             const paymentGateways = response?.data?.data?.payment_gateways || [];

    //             setPaymentGateways(paymentGateways);

    //             if (paymentGateways.length > 0) {
    //                 setSelectedGatewayType(paymentGateways[0].type);
    //             }
    //         } catch (error) {
    //             const apiError = error?.response?.data?.message?.error?.[0] || "Failed to fetch payment gateways.";
    //             toast.error(apiError);
    //         }
    //     };
    //     fetchGateways();
    // }, []);

    const handlePaymentsClick = async () => {
        try {
            // Fetch deposit gateways
            const depositResponse = await getDepositAPI();
            const paymentGateways = depositResponse?.data?.data?.payment_gateways || [];
            setPaymentGateways(paymentGateways);
            if (paymentGateways.length > 0) {
                setSelectedGatewayType(paymentGateways[0].type);
            }

            // Fetch withdraw gateways
            const withdrawResponse = await getWithdrawAPI();
            const withdrawGateways = withdrawResponse?.data?.data?.gateway_currencies;
            if (withdrawGateways) {
                setGateways(withdrawGateways);
            }

            // Fetch exchange data
            const exchangeResponse = await getExchangeAPI();
            const exchange = exchangeResponse?.data?.data;
            setExchangeData(exchange);

            // Open sidebar after all data is fetched
            togglePaymentSidebar();
        } catch (error) {
            const apiError = error?.response?.data?.message?.error?.[0] || "Failed to fetch payment gateways.";
            toast.error(apiError);
        }
    };

    useEffect(() => {
        if (selectedCurrency) {
            const currencyDetails = paymentGateways
                .flatMap((gateway) => gateway.currencies)
                .find((currency) => currency.alias === selectedCurrency);
            setSelectedCurrencyDetails(currencyDetails || null);
        } else {
            setSelectedCurrencyDetails(null);
        }
    }, [selectedCurrency, paymentGateways]);

    const handleCurrency = (e) => {
        const selectedAlias = e.target.value;
        setSelectedCurrency(selectedAlias);
    
        if (!selectedAlias) {
            setExchangeRate(0);
            setMinLimit(0);
            setMaxLimit(0);
            setPercentCharge(0);
            setFixedCharge(0);
            setSelectedCurrencyCode("");
            return;
        }
    
        let selectedCurrencyData = null;
        let selectedGatewayType = "";
    
        for (const gateway of paymentGateways) {
            const foundCurrency = gateway.currencies.find(
                (currency) => currency.alias === selectedAlias
            );
            if (foundCurrency) {
                selectedCurrencyData = foundCurrency;
                selectedGatewayType = gateway.type;
                break;
            }
        }
    
        if (selectedCurrencyData) {
            setExchangeRate(parseFloat(selectedCurrencyData.rate));
            setMinLimit(parseFloat(selectedCurrencyData.min_limit));
            setMaxLimit(parseFloat(selectedCurrencyData.max_limit));
            setPercentCharge(parseFloat(selectedCurrencyData.percent_charge));
            setFixedCharge(parseFloat(selectedCurrencyData.fixed_charge));
            setSelectedCurrencyCode(currencyCode);
            setSelectedGatewayType(selectedGatewayType);
        }
    };
    

    const handleDepositSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (selectedGatewayType === "AUTOMATIC") {
                const response = await automaticDepositAPI(selectedCurrency, amount, selectedCurrencyCode);
                console.log(response);

                if (response.data.message?.error) {
                    toast.error(response.data.message.error[0]);
                } else {
                    toast.success(response.data.message.success);
                    const redirectUrl = response.data.data?.redirect_url;
                    if (redirectUrl) {
                        const childWindow = window.open(redirectUrl, "_blank", "width=600,height=700");
                        const handleMessage = (event) => {
                            if (event.data === "payment_success") {
                                toast.success("Payment successful!");
                                childWindow?.close();
                                window.removeEventListener("message", handleMessage);
                            }
                        };

                        window.addEventListener("message", handleMessage);
                    }
                }
            } else if (selectedGatewayType === "MANUAL") {
                const manualResponse = await manualDepositAPI(selectedCurrency, amount, selectedCurrencyCode, fullName, transactionId, screenshot);
                if (manualResponse.data.type === "success") {
                    toast.success(manualResponse.data.message.success);
                } else {
                    toast.error(manualResponse.data.message.error[0]);
                }
            } else {
                toast.error("Unknown deposit type.");
            }
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message?.error?.[0] ||
                "Server did not respond";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    // useEffect(() => {
    //     const fetchWithdrawData = async () => {
    //         try {
    //             const response = await getWithdrawAPI();
    //             if (response.data?.data?.gateway_currencies) {
    //                 setGateways(response.data.data.gateway_currencies);
    //             }
    //         } catch (error) {
    //             const apiError = error?.response?.data?.message?.error?.[0] || "Failed to fetch payment gateways.";
    //             toast.error(apiError);
    //         }
    //     };
    //     fetchWithdrawData();
    // }, []);

    const handleGatewayChange = (e) => {
        const gatewayId = e.target.value;
        const selected = gateways.find((g) => g.id.toString() === gatewayId);

        if (selected) {
            setSelectedGateway(selected);
            setMinLimit(parseFloat(selected.min_limit));
            setMaxLimit(parseFloat(selected.max_limit));
            setCharge(parseFloat(selected.fixed_charge));
            setExchangeRate(parseFloat(selected.rate));
            setSelectedCurrencyCode(selected.currency_code);
        }
    };

    const handleWithdrawRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await withdrawRequestAPI(selectedGateway.alias, amount);
    
            if (response.data.type === "success") {
                const withdrawToken = response.data.data.token;
                toast.success(response.data.message.success[0]);
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set("withdrawToken", withdrawToken);
                window.history.pushState({}, "", newUrl);
                setWithdrawAdditionalFieldsSidebarOpen(true);
            } else {
                toast.error(response.data.message.error[0]);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const { message, errors } = error.response.data;

                // Show main message if present
                if (message) {
                    toast.error(message);
                }

                // Loop through and show specific validation errors
                if (errors && typeof errors === 'object') {
                    Object.values(errors).flat().forEach((msg) => toast.error(msg));
                }
            } else {
                toast.error("Server did not respond");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isWithdrawAdditionalFieldsSidebarOpen && withdrawToken) {
            fetchWithdrawInstructions();
        }
    }, [isWithdrawAdditionalFieldsSidebarOpen, withdrawToken]);

    const fetchWithdrawInstructions = async () => {
        try {
            const response = await getWithdrawInstructionsAPI(withdrawToken);
            if (response.data.type === "success") {
                setInstructions(response.data.data.instructions);
                setInputFields(response.data.data.input_fields);
            } else {
                toast.error("Error fetching instructions:", response.data.message);
            }
        } catch (error) {
            toast.error("Server did not respond");
        }
    };

    const handleWithdrawSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const form = e.target;
        const formData = new FormData();
    
        inputFields.forEach((field) => {
            const input = form.elements[field.name];
            if (field.type === 'file') {
                const file = input?.files?.[0];
                if (file) {
                    formData.append(field.name, file);
                }
            } else {
                formData.append(field.name, input?.value || '');
            }
        });
    
        try {
            const response = await submitWithdrawAPI(formData, withdrawToken);

            console.log(response)
    
            if (response.data.type === "success") {
                toast.success(response.data.message.success[0]);
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete("withdrawToken");
                window.history.pushState({}, "", newUrl);

                closeAllSidebars(true);
                fetchWallets();
                fetchTransactions();
                onClose();
            } else {
                toast.error(response.data.message.error[0]);
            }
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message?.error?.[0] ||
                "Server did not respond";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleWithdrawCharge = async () => {
            try {
                const response = await withdrawChargeAPI(gatewayCurrencyAlias, amount);
                setCharge(response.data);
            } catch (error) {
                setCharge(null);
            }
        };

        handleWithdrawCharge();
    }, []);

    // const fetchExchangeData = async () => {
    //     try {
    //         const response = await getExchangeAPI();
    //         setExchangeData(response.data.data);
    //     } catch (error) {
    //         const apiError = error?.response?.data?.message?.error?.[0] || "Failed to fetch payment gateways.";
    //         toast.error(apiError);
    //     }
    // };
    
    // useEffect(() => {
    //     fetchExchangeData();
    // }, []);

    const handleExchangeSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        if (!exchangeId) {
            toast.error("Please select a currency to exchange.");
            return;
        }
        setLoading(true);
        try {
            const response = await submitExchangeAPI(exchangeId);
            if (response?.data?.message?.success) {
                response.data.message.success.forEach((msg) => {
                    toast.success(msg);
                });
            } else {
                toast.error("Unexpected response from server.");
            }
            fetchWallets();
            fetchTransactions();
            setExchangeId("");
            closeAllSidebars(true);
        } catch (error) {
            if (error.response?.data?.message?.error) {
                error.response.data.message.error.forEach((msg) => {
                    toast.error(msg);
                });
            } else {
                toast.error("Server did not respond");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!selectedCurrency || !exchangeId) return;

        const fetchCharge = async () => {
            setLoadingCharge(true);
            try {
                const response = await exchangeChargeAPI(exchangeData?.user_wallet.currency.id, exchangeId);
                setCharge(response.data);
            } catch (error) {
                setCharge(null);
            } finally {
                setLoadingCharge(false);
            }
        };

        fetchCharge();
    }, [selectedCurrency, exchangeId, exchangeData]);

    // useEffect(() => {
    //     const fetchWalletInfo = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await getInfoAPI();
    
    //             if (response.data.type === "success" && response.data.data.user_wallets) {
    //                 const wallets = response.data.data.user_wallets;
    
    //                 const demoWallet = wallets.find(wallet => wallet.type.toUpperCase() === "DEMO");
    //                 const liveWallet = wallets.find(wallet => wallet.type.toUpperCase() === "LIVE");
    
    //                 const demoBal = parseFloat(demoWallet?.balance || 0).toFixed(2);
    //                 const liveBal = parseFloat(liveWallet?.balance || 0).toFixed(2);
    
    //                 setDemoBalance(demoBal);
    //                 setLiveBalance(liveBal);
    
    //                 setDemoAccountType(demoWallet?.type);
    //                 setLiveAccountType(liveWallet?.type);
    
    //                 if (liveWallet || demoWallet) {
    //                     const currency = (liveWallet || demoWallet).currency?.symbol;
    //                     setCurrencySymbol(currency);
    //                     localStorage.setItem("currencySymbol", currency);
    //                 }
    
    //                 const storedAccount = localStorage.getItem("selectedAccount");
    //                 const selectedFromStorage = storedAccount === "Demo Account" ? demoWallet : liveWallet;
    
    //                 if (selectedFromStorage) {
    //                     const selectedType = selectedFromStorage.type.toUpperCase();
    //                     const selectedBal = parseFloat(selectedFromStorage.balance).toFixed(2);
    
    //                     setSelectedBalance(selectedBal);
    //                     setSelectedAccountType(selectedType);
    
    //                     localStorage.setItem("selectedAccount", selectedType === "DEMO" ? "Demo Account" : "Live Account");
    //                     localStorage.setItem("selectedBalance", selectedBal);
    //                     localStorage.setItem("selectedAccountType", selectedType);
    //                 }
    //             } else {
    //                 toast.error(response.data.message.error[0]);
    //             }
    //         } catch (error) {
    //             toast.error("Server did not respond");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    
    //     fetchWalletInfo();
    // }, []);


    // const fetchWalletInfo = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await getInfoAPI();

    //         if (response.data.type === "success" && response.data.data.user_wallets) {
    //             const wallets = response.data.data.user_wallets;

    //             const demoWallet = wallets.find(wallet => wallet.type.toUpperCase() === "DEMO");
    //             const liveWallet = wallets.find(wallet => wallet.type.toUpperCase() === "LIVE");

    //             const demoBal = parseFloat(demoWallet?.balance || 0).toFixed(2);
    //             const liveBal = parseFloat(liveWallet?.balance || 0).toFixed(2);

    //             setDemoBalance(demoBal);
    //             setLiveBalance(liveBal);

    //             setDemoAccountType(demoWallet?.type);
    //             setLiveAccountType(liveWallet?.type);

    //             if (liveWallet || demoWallet) {
    //                 const currency = (liveWallet || demoWallet).currency?.symbol;
    //                 setCurrencySymbol(currency);
    //                 localStorage.setItem("currencySymbol", currency);
    //             }

    //             const storedAccount = localStorage.getItem("selectedAccount");
    //             const selectedFromStorage = storedAccount === "Demo Account" ? demoWallet : liveWallet;

    //             if (selectedFromStorage) {
    //                 const selectedType = selectedFromStorage.type.toUpperCase();
    //                 const selectedBal = parseFloat(selectedFromStorage.balance).toFixed(2);

    //                 setSelectedBalance(selectedBal);
    //                 setSelectedAccountType(selectedType);

    //                 localStorage.setItem("selectedAccount", selectedType === "DEMO" ? "Demo Account" : "Live Account");
    //                 localStorage.setItem("selectedBalance", selectedBal);
    //                 localStorage.setItem("selectedAccountType", selectedType);
    //             }
    //         } else {
    //             toast.error(response.data.message.error[0]);
    //         }
    //     } catch (error) {
    //         toast.error("Server did not respond");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        fetchWallets();
    }, []);

    return (
        <>
            <Toaster reverseOrder={false} theme="dark" />
            <div className="topbar relative sm:flex space-y-2 lg:space-y-0 items-center justify-between section--bg lg:bg-transparent py-3 px-4 z-[3]">
                {/* <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="relative w-11 h-11 flex justify-center items-center bg-[#0d1f30] rounded-md cursor-pointer" onClick={() => setIsTradeListOpen(!isTradeListOpen)}>
                                <div className={`transition-transform duration-300 ${isTradeListOpen ? "rotate-45" : "rotate-0"}`}>
                                    <Plus className="w-6 text-white" />
                                </div>
                            </div>
                            {selectedTrade && (
                                <div className="flex items-center bg-[#0d1f30] py-1.5 px-3 rounded-md">
                                    <div className="">
                                        <Image src={selectedTrade.icon} 
                                            className="object-cover" 
                                            width={30}
                                            height={30}
                                            alt="currency"
                                        />
                                    </div>
                                    <div className="pl-1">
                                        <div className="text-sm leading-[18px] text-white">{selectedTrade.name}</div>
                                        <div className="text-[12px] leading-[14px]">FT - <span className="text-emerald-400">{selectedTrade.profitability}</span></div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {isTradeListOpen && (
                            <div className="absolute left-0 top-14 w-72 bg-[#0d1f30] shadow-lg rounded-md p-3 z-50">
                                <div className="flex justify-between items-center py-2">
                                    <h2 className="text-white text-lg">Select Trade</h2>
                                    <button onClick={() => setIsTradeListOpen(false)}>
                                        <X className="text-white w-5 h-5" />
                                    </button>
                                </div>
                                <div className="relative mt-3">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#1a2c3d] border-slate-700 text-white py-2 px-3 rounded-md outline-none"
                                    />
                                    <Search className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
                                </div>
                                <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
                                    {filteredTrades.length > 0 ? (
                                    filteredTrades.map((trade, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-[#1a2c3d] p-2 rounded-md cursor-pointer hover:bg-[#223344]"
                                            onClick={() => {
                                                setSelectedTrade(trade);
                                                setIsTradeListOpen(false);
                                                setIsTradeListOpen(false);
                                                setSearchQuery("");
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Image src={trade.icon} className="object-cover" width={24} height={24} alt="currency" />
                                                <div className="text-white text-sm">{trade.name}</div>
                                            </div>
                                            <div className="text-emerald-400 text-sm">{trade.profitability}</div>
                                        </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-800 text-sm text-center py-2">No results found</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="relative w-11 h-11 flex justify-center items-center bg-[#0d1f30] rounded-md cursor-pointer" onClick={() => setIsIntervalListOpen(!isIntervalListOpen)}>
                                <div className={`transition-transform duration-300 ${isIntervalListOpen ? "rotate-45" : "rotate-0"}`}>
                                    <Clock12 className="w-6 text-white" />
                                </div>
                            </div>
                            {selectedInterval && (
                                <div className="flex items-center bg-[#0d1f30] py-[13px] px-5 rounded-md">
                                    <div className="text-sm leading-[18px] text-white">{selectedInterval.label}</div>
                                </div>
                            )}
                        </div>
                        {isIntervalListOpen && (
                            <div className="absolute left-0 top-14 w-48 bg-[#0d1f30] shadow-lg rounded-md p-3 z-50">
                                <div className="flex justify-between items-center py-2">
                                    <h2 className="text-white text-md">Select Interval</h2>
                                    <button onClick={() => setIsIntervalListOpen(false)}>
                                        <X className="text-white w-5 h-5" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-2 max-h-32 overflow-y-auto">
                                    {intervalOptions.length > 0 ? (
                                    intervalOptions.map((trade, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-[#1a2c3d] py-2 px-5 rounded-md cursor-pointer hover:bg-[#223344]"
                                            onClick={() => {
                                                setSelectedInterval(trade);
                                                setIsTradeListOpen(false);
                                            }}
                                        >
                                            <div className="flex items-center gap-2" value={trade.value}>
                                                <div className="text-white text-sm">{trade.label}</div>
                                            </div>
                                        </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-800 text-sm text-center py-2">No results found</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div> */}
                <div className="hidden sm:flex justify-center gap-2">
                    {loading ? (
                        <div className="animate-pulse">
                            <div className="h-6 w-20 bg-gray-700 rounded-md"></div>
                            <div className="h-4 w-24 bg-gray-800 mt-1 rounded-md"></div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="relative w-9 h-9 flex justify-center items-center bg-[#0d1f30] rounded-md" onClick={() => setIsIntervalListOpen(!isIntervalListOpen)}>
                                <div className="transition-transform duration-300">
                                    <CircleDollarSign className="w-5 text-white" />
                                </div>
                            </div>
                            {/* <select
                                className="bg-[#0d1f30] shadow-lg rounded-md border-0 text-sm text-white"
                                value={symbol}
                                onChange={(e) => setSymbol(e.target.value)}
                                >
                                {filteredTrades.length > 0 ? (
                                    filteredTrades.map((trade, index) => (
                                    <option key={index} value={trade.symbol}>
                                        {trade.name}
                                    </option>
                                    ))
                                ) : (
                                    <option disabled>No results found</option>
                                )}
                            </select> */}
                            <Listbox value={symbol} onChange={setSymbol}>
                                <div className="relative">
                                    <Listbox.Button className="relative w-full cursor-default bg-[#0d1f30] text-white text-sm rounded-md shadow-lg pl-3 pr-10 py-2 text-left">
                                        <span className="block truncate">
                                            {filteredTrades.find((t) => t.name === symbol)?.name || 'Select a symbol'}
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#0d1f30] py-1 text-sm text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {filteredTrades.map((trade) => (
                                            <Listbox.Option
                                                key={trade.name}
                                                value={trade.name}
                                                className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                                                    active ? 'bg-[#1a2e45]' : ''
                                                }`
                                                }
                                            >
                                                {({ selected }) => (
                                                    <span
                                                        className={`block truncate ${
                                                        selected ? 'font-semibold' : 'font-normal'
                                                        }`}
                                                    >
                                                        {trade.name}
                                                    </span>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>
                    )}
                    {loading ? (
                        <div className="animate-pulse">
                            <div className="h-6 w-20 bg-gray-700 rounded-md"></div>
                            <div className="h-4 w-24 bg-gray-800 mt-1 rounded-md"></div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="relative w-9 h-9 flex justify-center items-center bg-[#0d1f30] rounded-md" onClick={() => setIsIntervalListOpen(!isIntervalListOpen)}>
                                <div className="transition-transform duration-300">
                                    <Clock12 className="w-5 text-white" />
                                </div>
                            </div>
                            {/* <select
                                className="bg-[#0d1f30] shadow-lg rounded-md border-0 text-sm text-white"
                                value={interval}
                                onChange={(e) => setInterval(e.target.value)}
                                >
                                {intervalOptions.length > 0 ? (
                                    intervalOptions.map((trade, index) => (
                                    <option key={index} value={trade.value}>
                                        {trade.label}
                                    </option>
                                    ))
                                ) : (
                                    <option disabled>No results found</option>
                                )}
                            </select> */}
                            <Listbox value={interval} onChange={setInterval}>
                                <div className="relative">
                                    <Listbox.Button className="relative w-full cursor-default bg-[#0d1f30] text-white text-sm rounded-md shadow-lg pl-3 pr-10 py-2 text-left">
                                        <span className="block truncate">
                                            {intervalOptions.find((opt) => opt.label === interval)?.label || 'Select an interval'}
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#0d1f30] py-1 text-sm text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {intervalOptions.map((option) => (
                                            <Listbox.Option
                                                key={option.label}
                                                value={option.label}
                                                className={({ active }) =>
                                                    `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                                                        active ? 'bg-[#1a2e45]' : ''
                                                    }`
                                                }
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${
                                                                selected ? 'font-semibold' : 'font-normal'
                                                            }`}
                                                        >
                                                            {option.label}
                                                        </span>
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>
                    )}
                </div>
                <div className="flex justify-center items-center gap-3">
                    <div className="relative top-1 mr-6 cursor-pointer" onClick={toggleSidebar}>
                        {loading ? (
                            <div className="animate-pulse">
                                <div className="h-6 w-20 bg-gray-700 rounded-md"></div>
                                <div className="h-4 w-24 bg-gray-800 mt-1 rounded-md"></div>
                            </div>
                        ) : (
                            <>
                                <div className="text-white font-semibold text-[14px] lg:text-[18px] leading-[20px]">{currencySymbol} {selectedBalance}</div>
                                <div className="text-[12px] text-emerald-400">{selectedAccountType} Account</div>
                                <div className="absolute bottom-[4px] right-[-20px]">
                                    <ChevronDown className="w-4" />
                                </div>
                            </>
                        )}
                    </div>
                    <div onClick={handlePaymentsClick}>
                        <button className="baseBtn !py-2 !px-4">Payments</button>
                    </div>
                    <div className="relative w-11 h-11 flex justify-center items-center bg-[#0d1f30] rounded-full cursor-pointer" onClick={toggleProfileSidebar}>
                        <UserRound className="w-5" />
                        <div className="absolute bottom-0 right-[-5px] w-5 h-5 flex justify-center items-center bg-[#0d1f30] border-2 border-[#000000] rounded-full">
                            <ArrowUpLeft className="text--base w-4" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg transform p-4 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
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
                        <div className="text-white font-semibold text-[18px] leading-[20px]">{currencySymbol} {demoBalance}</div>
                        <div className="text-[12px] text-emerald-400">{demoAccountType} Account</div>
                    </button>
                    <button
                        className={`w-full text-left py-3 px-7 rounded-md ${
                        selectedAccount === "Live Account"
                            ? "bg-[#0d1f30]"
                            : "bg-transparent"
                        }`}
                        onClick={() => selectAccount("Live Account")}
                    >
                        <div className="text-white font-semibold text-[18px] leading-[20px]">{currencySymbol} {liveBalance}</div>
                        <div className="text-[12px] text-emerald-400">{liveAccountType} Account</div>
                    </button>
                </div>
            </div>
            <div className={`fixed top-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Profile</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="flex flex-col justify-between h-[calc(100%-60px)] p-4">
                    <div className="flex items-center mb-4">
                        <div className="relative w-11 h-11 flex justify-center items-center bg-[#0d1f30] rounded-full cursor-pointer" onClick={toggleProfileSidebar}>
                            <UserRound className="w-5" />
                            <div className="absolute bottom-0 right-[-5px] w-5 h-5 flex justify-center items-center bg-[#0d1f30] border-2 border-[#000000] rounded-full">
                                <ArrowUpLeft className="text--base w-4" />
                            </div>
                        </div>
                        <div className="pl-3 text-white">
                            <div className="text-sm">{username}</div>
                            <div className="text-[12px]">{email}</div>
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
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isBottomSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
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
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handleKycInformationClick}>
                        KYC Verification
                    </button>
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handlePasswordInformationClick}>
                        Password
                    </button>
                    {/* <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handleNotificationInformationClick}>
                        Notification
                    </button> */}
                </div>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isPaymentSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
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
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isProfileFieldsSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Profile Information</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                {error &&
                    <div className="bg-[#0d1f30] py-6 px-6 rounded-[10px] mb-5 flex items-center">
                        <Info className="w-6 h-auto me-2 text-red-500"/>
                        <span className="text-sm">{error}</span>
                    </div>
                }
                {userData ? (
                    <form onSubmit={submitProfileUpdate}>
                        <div className="grid grid-cols-1 gap-3 p-4">
                            <div className="relative w-[120px] h-[120px] rounded-[50%] mx-auto">
                                <Image
                                    src={userImage}
                                    alt="Profile"
                                    width={120}
                                    height={120}
                                    className="rounded-full w-full h-full border-2 border-slate-800 mx-auto object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={openFileInput}
                                    className="absolute bottom-[-15px] left-[50%] transform translate-x-[-50%] bg-[#0d1f30] text-white w-10 h-10 flex justify-center items-center rounded-full cursor-pointer"
                                >
                                    <Pencil className="w-4" />
                                </button>
                                <input
                                    type="file"
                                    id="profileImageInput"
                                    accept=".png,.jpg,.jpeg,.webp,.svg"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="text-white">
                                <label className="text-sm mb-2 block">First Name</label>
                                <input
                                type="text"
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) =>
                                    setFirstName(e.target.value)
                                }
                                required
                                />
                            </div>
                            <div className="text-white">
                                <label className="text-sm mb-2 block">Last Name</label>
                                <input
                                type="text"
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) =>
                                    setLastName(e.target.value)
                                }
                                required
                                />
                            </div>
                            <div className="text-white">
                                <label className="text-sm mb-2 block">Country</label>
                                <input
                                type="text"
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                placeholder="Country"
                                value={country}
                                onChange={(e) =>
                                    setCountry(e.target.value)
                                }
                                required
                                />
                            </div>
                            <div className="text-white">
                                <label className="text-sm mb-2 block">Mobile Code</label>
                                <input
                                type="number"
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                placeholder="Mobile Code"
                                value={mobileCode}
                                onChange={(e) =>
                                    setMobileCode(e.target.value)
                                }
                                required
                                />
                            </div>
                            <div className="text-white">
                                <label className="text-sm mb-2 block">Mobile</label>
                                <input
                                type="number"
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                placeholder="Mobile"
                                value={mobile}
                                onChange={(e) =>
                                    setMobile(e.target.value)
                                }
                                required
                                />
                            </div>
                            <div className="text-white">
                                <label className="text-sm mb-2 block">Address</label>
                                <input
                                type="text"
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                placeholder="Address"
                                value={address}
                                onChange={(e) =>
                                    setAddress(e.target.value)
                                }
                                required
                                />
                            </div>
                            <div className="text-white">
                                <label className="text-sm mb-2 block">State/Region</label>
                                <input
                                type="text"
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                placeholder="State/Region"
                                value={state}
                                onChange={(e) =>
                                    setState(e.target.value)
                                }
                                required
                                />
                            </div>
                            <div className="text-white">
                                <label className="text-sm mb-2 block">City</label>
                                <input
                                type="text"
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                placeholder="City"
                                value={city}
                                onChange={(e) =>
                                    setCity(e.target.value)
                                }
                                required
                                />
                            </div>
                            <div className="text-white">
                                <label className="text-sm mb-2 block">ZIP/Postal Code</label>
                                <input
                                type="number"
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                placeholder="ZIP/Postal Code"
                                value={postalCode}
                                onChange={(e) =>
                                    setPostalCode(e.target.value)
                                }
                                required
                                />
                            </div>
                            <div className="mt-2 space-y-3">
                                <button type="submit" className={`baseBtn flex justify-center w-full ${loading ? "cursor-not-allowed" : ""}`} disabled={loading}>
                                    {loading ? (
                                        <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                                    ) : (
                                        <>
                                            Update 
                                            <ArrowRightToLine />
                                        </>
                                    )}
                                </button>
                                <button type="button" onClick={openModal} className="baseBtn !bg-red-500 flex justify-center w-full">
                                    Delete Profile 
                                    <ArrowRightToLine />
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="animate-pulse p-4">
                        <div className="flex justify-between items-center p-4">
                            <div className="h-6 w-40 bg-gray-700 rounded"></div>
                            <div className="w-5 h-5 bg-gray-700 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-3 p-4">
                            <div className="relative w-[120px] h-[120px] rounded-full mx-auto bg-gray-700"></div>
                            <div className="h-4 w-20 bg-gray-700 rounded mx-auto mt-2"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-700 rounded"></div>
                                <div className="h-10 w-full bg-gray-700 rounded"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-700 rounded"></div>
                                <div className="h-10 w-full bg-gray-700 rounded"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-700 rounded"></div>
                                <div className="h-10 w-full bg-gray-700 rounded"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-700 rounded"></div>
                                <div className="h-10 w-full bg-gray-700 rounded"></div>
                            </div>
                            <div className="mt-2 h-10 bg-gray-700 rounded w-full"></div>
                        </div>
                    </div>
                )}
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isPasswordSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Change Password</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handlePasswordUpdate}>
                    <div className="grid grid-cols-1 gap-3 p-4">
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Current Password</label>
                            <input
                                type={showPassword.currentPassword ? "text" : "password"}
                                value={currentPassword}
                                placeholder="Enter Current Password"
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-[40px] text-gray-400"
                                onClick={() => togglePasswordVisibility("currentPassword")}
                            >
                                {showPassword.currentPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                    ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">New Password</label>
                            <input
                                type={showPassword.newPassword ? "text" : "password"}
                                value={newPassword}
                                placeholder="Enter Current Password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-[40px] text-gray-400"
                                onClick={() => togglePasswordVisibility("newPassword")}
                            >
                                {showPassword.newPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                    ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Confirm Password</label>
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                value={passwordConfirmation}
                                placeholder="Enter Current Password"
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-[40px] text-gray-400"
                                onClick={() => togglePasswordVisibility("confirmPassword")}
                            >
                                {showPassword.confirmPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                    ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        <div className="mt-2">
                            <button type="submit" className={`baseBtn flex justify-center w-full ${loading ? "cursor-not-allowed" : ""}`} disabled={loading}>
                                {loading ? (
                                    <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                                ) : (
                                    <>
                                        Change 
                                        <ArrowRightToLine />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={`fixed top-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isNotificationSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
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
            <div className={`fixed top-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${is2FASidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Two-Factor Authentication</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-3 p-4">
                    <div className="p-4 bg-white rounded-lg">
                        <h3 className="text-black text-lg font-semibold mb-4">Scan with Google Authenticator</h3>
                        <form onSubmit={submitTwoFactor}>
                            <div className="relative text-black">
                                {qrSVG && (
                                    <div
                                        className="w-[200px] h-[200px] mx-auto"
                                        dangerouslySetInnerHTML={{ __html: qrSVG }}
                                    />
                                )}
                                <div className="mt-4 text-black text-center">Scan this code in your Google Authenticator app.</div>
                            </div>
                            <div className="mt-2">
                                <button type="submit" className={`baseBtn flex justify-center w-full ${loading ? "cursor-not-allowed" : ""} ${isTwoFactorEnabled ? "!bg-red-500 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`} disabled={loading}>
                                    {loading ? (
                                        <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                                    ) : (
                                        <>
                                            {isTwoFactorEnabled ? "Disable" : "Enable"} 
                                            <ArrowRightToLine />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
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
            <div className={`fixed top-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isKycSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">KYC Information</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-4">
                        {instructions && status !== "0" && (
                            <div className="p-4 bg-[#0d1f30] rounded-lg mb-4">
                                <strong>Status:</strong>
                                <span className={`${getStatusColor(instructions)} font-semibold pl-1`}>
                                    {instructions}
                                </span>
                            </div>
                        )}

                        {status === "0" ? (
                            <>
                                {fields.map((field, index) => (
                                    <div className="relative text-white mb-3" key={index}>
                                        <label className="text-sm mb-2 block">
                                            {field.label} {field.required && '*'}
                                        </label>
                                        {field.type === 'select' ? (
                                            <select
                                                value={idType}
                                                onChange={(e) => setIdType(e.target.value)}
                                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 bg-[#0d1f30]"
                                                required={field.required}
                                            >
                                                <option value="">Select</option>
                                                {field.validation.options.map((option, i) => (
                                                    <option key={i} value={option.trim()}>{option.trim()}</option>
                                                ))}
                                            </select>
                                        ) : field.type === 'file' ? (
                                            <input
                                                type="file"
                                                name={field.name}
                                                accept={field.validation.mimes.join(',')}
                                                onChange={handleChange}
                                                className="w-full h-11 leading-[36px] text-sm font-medium rounded-md shadow-sm border border-slate-800 text-slate-300 gradient--bg"
                                                required={field.required}
                                            />
                                        ) : null}
                                    </div>
                                ))}
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className={`baseBtn flex justify-center w-full ${loading ? "cursor-not-allowed" : ""}`}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                                        ) : (
                                            <>
                                                Submit
                                                <ArrowRightToLine />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-slate-400 text-sm italic">
                                Your KYC status is <strong>{instructions}</strong>.
                            </div>
                        )}
                        {/* {status === "1" && (
                            <div className="mb-4 space-y-3">
                                <p className="text-white text-sm font-medium">Uploaded Documents:</p>
                            </div>
                        )} */}
                    </div>
                </form>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isDepositFieldsSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Deposit</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleDepositSubmit}>
                    <div className="p-4 text-white">
                        <p className="text-sm">
                            <span className="font-semibold">Exchange Rate:</span> 1 {currencyCode} = {exchangeRate} {selectedCurrencyCode}
                        </p>
                        <p className="text-sm mt-2">
                            <span className="font-semibold">Limits:</span> Min {minLimit} {selectedCurrencyCode}, Max {maxLimit} {selectedCurrencyCode}
                        </p>
                        <p className="text-sm mt-2">
                            <span className="font-semibold">Charge:</span> {fixedCharge} + {percentCharge}%
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 p-4">
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Payment Gateway</label>
                            {/* <select
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 bg-[#0d1f30]"
                                onChange={handleCurrency}
                                required
                            >
                                <option value="">Select Currency</option>
                                {paymentGateways.flatMap((gateway) =>
                                    gateway.currencies.map((currency) => (
                                        <option key={currency.alias} value={currency.alias}>
                                            {currency.name} ({gateway.type})
                                        </option>
                                    ))
                                )}
                            </select> */}
                            <Listbox value="" onChange={(value) => handleCurrency({ target: { value } })}>
                                <div className="relative">
                                    <Listbox.Button className="relative w-full h-11 text-sm font-medium rounded-md shadow-sm border border-slate-800 text-slate-300 bg-[#0d1f30] text-left pl-3 pr-10">
                                    <span className="block truncate">
                                        Select Payment Gateway
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                    </Listbox.Button>

                                    <Listbox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-[#0d1f30] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <Listbox.Option
                                        value=""
                                        className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-[#1a2e45] text-white' : 'text-gray-300'
                                        }`
                                        }
                                    >
                                        {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            Select Payment Gateway
                                            </span>
                                            {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            )}
                                        </>
                                        )}
                                    </Listbox.Option>

                                    {paymentGateways.flatMap((gateway) =>
                                        gateway.currencies.map((currency) => (
                                        <Listbox.Option
                                            key={currency.alias}
                                            value={currency.alias}
                                            className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-[#1a2e45] text-white' : 'text-gray-300'
                                            }`
                                            }
                                        >
                                            {({ selected }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {currency.name} ({gateway.type})
                                                </span>
                                                {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                                )}
                                            </>
                                            )}
                                        </Listbox.Option>
                                        ))
                                    )}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Amount</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={amount}
                                    placeholder="Enter amount"
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                    required
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-400">
                                    {currencyCode}
                                </span>
                            </div>
                        </div>
                        {selectedGatewayType === "MANUAL" && (
                            <>
                                <div className="relative text-white">
                                    <label className="text-sm mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                        placeholder="Enter Full Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="relative text-white">
                                    <label className="text-sm mb-2 block">Transaction ID</label>
                                    <input
                                        type="text"
                                        className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                        placeholder="Enter Transaction ID"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="relative text-white">
                                    <label className="text-sm mb-2 block">Screenshot</label>
                                    <input
                                        type="file"
                                        className="w-full h-11 leading-[36px] text-sm font-medium rounded-md shadow-sm border border-slate-800 text-slate-300 gradient--bg"
                                        accept="image/*"
                                        onChange={(e) => setScreenshot(e.target.files[0])}
                                    />
                                </div>
                            </>
                        )}
                        <div className="mt-2">
                            <button type="submit" className={`baseBtn flex justify-center w-full ${loading ? "cursor-not-allowed" : ""}`} disabled={loading}>
                                {loading ? (
                                    <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                                ) : (
                                    <>
                                        Deposit 
                                        <ArrowRightToLine />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isWithdrawFieldsSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Withdraw</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleWithdrawRequest}>
                    <div className="p-4 text-white">
                        <p className="text-sm">
                            <span className="font-semibold">Exchange Rate:</span> 1 {currencyCode} = {exchangeRate} {selectedCurrencyCode}
                        </p>
                        <p className="text-sm mt-2">
                            <span className="font-semibold">Limits:</span> Min {minLimit} {selectedCurrencyCode}, Max {maxLimit} {selectedCurrencyCode}
                        </p>
                        <p className="text-sm mt-2">
                            <span className="font-semibold">Charge:</span> {fixedCharge} + {percentCharge}%
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 p-4">
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Payment Gateway</label>
                            {/* <select
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 bg-[#0d1f30]"
                                value={selectedGateway?.id || ""}
                                onChange={handleGatewayChange}
                                required
                            >
                                <option value="">Select Payment Gateway</option>
                                {gateways.map((gateway) => (
                                    <option key={gateway.id} value={gateway.id}>
                                        {gateway.name}
                                    </option>
                                ))}
                            </select> */}
                            <Listbox value={selectedGateway} onChange={setSelectedGateway}>
                                <div className="relative">
                                    <Listbox.Button className="relative w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 bg-[#0d1f30] text-left pl-3 pr-10">
                                    <span className="block truncate">
                                        {selectedGateway?.name || "Select Payment Gateway"}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                    </Listbox.Button>

                                    <Listbox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-[#0d1f30] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <Listbox.Option
                                        value={null}
                                        className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-[#1a2e45] text-white' : 'text-gray-300'
                                        }`}
                                    >
                                        {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            Select Payment Gateway
                                            </span>
                                            {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            )}
                                        </>
                                        )}
                                    </Listbox.Option>

                                    {gateways.map((gateway) => (
                                        <Listbox.Option
                                        key={gateway.id}
                                        value={gateway}
                                        className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-[#1a2e45] text-white' : 'text-gray-300'
                                        }`}
                                        >
                                        {({ selected }) => (
                                            <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {gateway.name}
                                            </span>
                                            {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            )}
                                            </>
                                        )}
                                        </Listbox.Option>
                                    ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Amount</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={amount}
                                    placeholder="Enter amount"
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                    required
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-400">
                                    {currencyCode}
                                </span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <button type="submit" className={`baseBtn flex justify-center w-full ${loading ? "cursor-not-allowed" : ""}`} disabled={loading}>
                                {loading ? (
                                    <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                                ) : (
                                    <>
                                        Withdraw 
                                        <ArrowRightToLine />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isWithdrawAdditionalFieldsSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Withdraw</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleWithdrawSubmit}>
                    <div className="grid grid-cols-1 gap-3 p-4">
                        {inputFields.map((field, index) => (
                            <div key={index} className="mb-2">
                                <label className="block text-sm mb-2">{field.label}</label>
                                {field.type === "file" ? (
                                    <input
                                        type="file"
                                        name={field.name}
                                        accept={field.validation?.mimes?.map(mime => `image/${mime}`).join(",")}
                                        required={field.required}
                                        className="w-full h-11 leading-[36px] text-sm font-medium rounded-md shadow-sm border border-slate-800 text-slate-300 gradient--bg"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        name={field.name}
                                        placeholder="Enter ID here..."
                                        minLength={field.validation.min}
                                        maxLength={field.validation.max}
                                        required={field.required}
                                        className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                    />
                                )}
                            </div>
                        ))}
                        <div className="mt-2">
                            <button type="submit" className={`baseBtn flex justify-center w-full ${loading ? "cursor-not-allowed" : ""}`} disabled={loading}>
                                {loading ? (
                                    <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                                ) : (
                                    <>
                                        Submit 
                                        <ArrowRightToLine />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={`fixed bottom-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isExchangeFieldsSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Exchange</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleExchangeSubmit}>
                    <div className="p-4 text-white">
                        <p className="text-sm">
                            <span className="font-semibold">Exchange Rate:</span> {exchangeData ? `1 USD = ${exchangeData.currencies.find(c => c.code === selectedCurrency)?.rate || 0} ${selectedCurrency}` : "Loading..."}
                        </p>
                        <p className="text-sm mt-2">
                            <span className="font-semibold">Charge:</span> {loadingCharge ? "Calculating..." : exchangeData?.charges ? `${exchangeData.charges.fixed_charge} ${exchangeData.user_wallet.currency.code} + ${exchangeData.charges.percent_charge}%`: "N/A"}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 p-4">
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Your Wallet</label>
                            <input
                                type="text"
                                value={exchangeData ? exchangeData.user_wallet.currency.code : "Loading..."}
                                placeholder="Enter wallet"
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                                readOnly
                            />
                        </div>
                        <div className="relative text-white">
                            <label className="text-sm mb-2 block">Exchange To</label>
                            {/* <select
                                className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 bg-[#0d1f30]"
                                value={selectedCurrency}
                                onChange={(e) => {
                                    setSelectedCurrency(e.target.value);
                            
                                    const selectedCurrencyData = exchangeData?.currencies.find(c => c.code === e.target.value);
                                    if (selectedCurrencyData) {
                                        setExchangeId(selectedCurrencyData.id);
                                    }
                                }}
                                required
                            >
                                <option value="">Select Wallet</option>
                                {exchangeData
                                ? exchangeData.currencies.map((currency) => (
                                    <option key={currency.id} value={currency.code}>
                                        {currency.code}
                                    </option>
                                ))
                                : <option>Loading...</option>}
                            </select> */}
                            <Listbox 
                                value={selectedCurrency} 
                                onChange={(value) => {
                                    setSelectedCurrency(value);
                                    const selectedCurrencyData = exchangeData?.currencies.find(c => c.code === value);
                                    if (selectedCurrencyData) {
                                    setExchangeId(selectedCurrencyData.id);
                                    }
                                }}
                                >
                                <div className="relative">
                                    <Listbox.Button className="relative w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 bg-[#0d1f30] text-left pl-3 pr-10">
                                    <span className="block truncate">
                                        {selectedCurrency || "Select Wallet"}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                    </Listbox.Button>

                                    <Listbox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-[#0d1f30] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <Listbox.Option
                                        value=""
                                        className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-[#1a2e45] text-white' : 'text-gray-300'
                                        }`}
                                    >
                                        {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            Select Wallet
                                            </span>
                                            {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            )}
                                        </>
                                        )}
                                    </Listbox.Option>

                                    {exchangeData ? (
                                        exchangeData.currencies.map((currency) => (
                                        <Listbox.Option
                                            key={currency.id}
                                            value={currency.code}
                                            className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-[#1a2e45] text-white' : 'text-gray-300'
                                            }`}
                                        >
                                            {({ selected }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {currency.code}
                                                </span>
                                                {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                                )}
                                            </>
                                            )}
                                        </Listbox.Option>
                                        ))
                                    ) : (
                                        <Listbox.Option
                                        value=""
                                        disabled
                                        className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-300"
                                        >
                                        <span className="block truncate">Loading...</span>
                                        </Listbox.Option>
                                    )}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>
                        <div className="mt-2">
                            <button type="submit" className={`baseBtn flex justify-center w-full ${loading ? "cursor-not-allowed" : ""}`} disabled={loading}>
                                {loading ? (
                                    <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                                ) : (
                                    <>
                                        Exchange Wallet 
                                        <ArrowRightToLine />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {isModalOpen && (
                <div className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-all duration-300 ${showContent ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
                    <div className={`bg-[#0d1f30] rounded-xl relative transform transition-all duration-300 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <button onClick={closeModal} className="absolute top-[-10px] right-[-10px] w-10 h-10 bg-[#0d1f30] rounded-full flex items-center justify-center transition-all hover:text-red-500">
                            <X className="w-4 h-auto"/>
                        </button>
                        <div className="sm:w-[400px] w-[300px] p-5">
                            <span className="text-sm">Are you sure you want to delete profile?</span>
                            <div className="mt-5 space-y-2">
                                <button onClick={onProfileDelete} disabled={loading} className={`w-full py-2 rounded-lg text-sm text-white bg--base transition-all hover:bg-red-500 ${loading ? "cursor-not-allowed" : ""}`}>
                                    {loading ? <LoaderCircle className="inline-block w-5 h-auto animate-spin text-white"/> : "Yes, i want to delete profile"}
                                </button>
                                <button onClick={closeModal} className="w-full py-2 rounded-lg text-sm border border--base text-white transition-all hover:border-red-500 hover:bg-red-500">Cancel</button>
                            </div>
                        </div>
                    </div>
                    <div onClick={closeModal} className="fixed top-0 left-0 w-full h-full z-[-2]"></div>
                </div>
            )}
        </>
    )
};

export default function Topbar() {
    return (
        <Suspense>
            <TopbarContent />
        </Suspense>
    );
}