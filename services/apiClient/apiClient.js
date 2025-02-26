// Packages
import axios from 'axios';
import toast from 'react-hot-toast';

// App Version
const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;
// API base url
const apiURL = process.env.NEXT_PUBLIC_API_URL;

// API Client Base (axios) without version
const apiClientBase = axios.create({
    baseURL: `${apiURL}`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// API Client (axios) with version
const apiClient = axios.create({
    baseURL: `${apiURL}/${appVersion}`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Helper function to retrieve token from localStorage or sessionStorage
const getToken = () => {
    return localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
};

// Interceptor for handling 401 Unauthorized responses
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("jwtToken");
            sessionStorage.removeItem("jwtToken");
            toast.error("Unauthenticated");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

// Login API (post)
export const loginAPI = (credentials, password) => {
    return apiClient.post('/login', { credentials, password },);
};

// Register API (post)
export const registerAPI = (formData, type) => {
    return apiClient.post(`/register?type=${type}`, formData);
};

// Logout API (post)
export const logoutAPI = () => {
    const token = getToken();
    if (token) {
        return apiClient.post('/user/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        throw new Error('No token found. Please log in.');
    }
};

// Switch Account API (post)
export const switchAccountAPI = (switcher) => {
    return apiClient.post('/user/switch/account', { switcher });
};

// Get User Data API (get)
export const getUserDataAPI = () => {
    const token = getToken();
    if (token) {
        return apiClient.get('/user/profile/info', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        throw new Error('No token found. Please log in.');
    }
};

// User Data Update API (post)
export const userDataUpdateAPI = (formData) => {
    const token = getToken();
    if (token) {
        return apiClient.post("/user/profile/info/update", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    } else {
        throw new Error("No token found. Please log in.");
    }
};

// Get KYC Fields API (get)
export const getKycAPI = () => {
    const token = getToken();
    if (token) {
        return apiClient.get('/authorize/kyc/input-fields', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        throw new Error('No token found. Please log in.');
    }
};

// KYC Update API (post)
export const kycUpdateAPI = (idType, frontFile, backFile) => {
    const token = getToken();
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    const formData = new FormData();
    formData.append("id_type", idType);
    if (frontFile) formData.append("front", frontFile);
    if (backFile) formData.append("back", backFile);

    return apiClient.post("/authorize/kyc/submit", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};

// Get Deposit Fields API (get)
export const getDepositAPI = () => {
    const token = getToken();
    if (token) {
        return apiClient.get('/user/add-money/payment-gateways', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        throw new Error('No token found. Please log in.');
    }
};

// Submit Automatic Deposit Fields API (post)
export const automaticDepositAPI = (selectedCurrency, amount, baseCurrency) => {
    const token = getToken();
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    const formData = new FormData();
    formData.append("currency", selectedCurrency);
    formData.append("amount", parseFloat(amount));
    formData.append("wallet_currency", baseCurrency);

    return apiClient.post("/user/add-money/automatic/submit", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};

// Submit Manual Deposit Fields API (post)
export const manualDepositAPI = (selectedCurrency, amount, baseCurrency, fullName, transactionId, screenshot) => {
    const token = getToken();
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    const formData = new FormData();
    formData.append("currency", selectedCurrency);
    formData.append("amount", parseFloat(amount));
    formData.append("wallet_currency", baseCurrency);
    formData.append("full_name", fullName);
    formData.append("transaction_id", transactionId);
    formData.append("screenshoot", screenshot);

    return apiClient.post("/user/add-money/manual/submit", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Get Withdraw Fields API (get)
export const getWithdrawAPI = () => {
    const token = getToken();
    if (token) {
        return apiClient.get('/user/withdraw/get-info', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        throw new Error('No token found. Please log in.');
    }
};

// Withdraw Request API (post)
export const withdrawRequestAPI = (gatewayCurrencyId, amount) => {
    const token = getToken();
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    const formData = new FormData();
    formData.append("amount", parseFloat(amount));
    formData.append("gateway_currency", gatewayCurrencyId);

    console.log([...formData.entries()]);

    return apiClient.post("/user/withdraw/make-request", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Get Exchange Fields API (get)
export const getExchangeAPI = () => {
    const token = getToken();
    if (token) {
        return apiClient.get('/user/exchange-money/get-info', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        throw new Error('No token found. Please log in.');
    }
};

// Submit Exchange API (post)
export const submitExchangeAPI = (exchangeId) => {
    const token = getToken();
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    const formData = new FormData();
    formData.append("exchange_currency_id", exchangeId);

    return apiClient.post("/user/exchange-money/exchange", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Exchange Charge API (post)
export const exchangeChargeAPI = (walletId, exchangeId) => {
    const token = getToken();
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    const formData = new FormData();
    formData.append("wallet_currency_id", walletId);
    formData.append("exchange_currency_id", exchangeId);

    return apiClient.post("/user/exchange-money/get-charges", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Ticket API (get)
export const getSupportTicketsAPI = (page = 1) => {
    const token = getToken();
    if (token) {
        return apiClient.get(`/user/support/ticket/get?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        throw new Error('No token found. Please log in.');
    }
};

// Renew Ticket API (for INTERNAL payment type)
export const renewTicketAPI = (ticketId, successUrl, cancelUrl) => {
    const token = getToken();
    if (token) {
        return apiClient.post(
            `/user/support/ticket/renew/${ticketId}`,
            { success_url: successUrl, cancel_url: cancelUrl },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } else {
        throw new Error("No token found. Please log in.");
    }
};

// Function for payment success GET request
export const getPaymentSuccess = (trxRef) => {
    const token = getToken();
    if (token) {
        return apiClient.get(`/user/support/ticket/renew/payment/success/${trxRef}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        throw new Error("Payment failed.");
    }
};

// Function for payment cancel GET request
export const getPaymentCancel = (trxRef) => {
    const token = getToken();
    if (token) {
        return apiClient.get(`/user/support/ticket/renew/payment/cancel/${trxRef}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        throw new Error("Payment cancellation failed.");
    }
};


// Fetch conversation data API (get)
export const getConversationDataAPI = (id) => {
    const token = getToken();
    if (token) {
        return apiClient.get(`/user/support/ticket/conversation/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        throw new Error("No token found. Please log in.");
    }
};


// File Upload API (post)
export const uploadFileAPI = (formData, onUploadProgress) => {
    return apiClient.post("/conversation/file/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};


// Send Message API (post)
export const sendMessageAPI = (supportToken, message, files = []) => {
    const token = getToken();
    if (token) {
        const formData = new FormData();
        formData.append("support_token", supportToken);
        formData.append("message", message);
        
        // Add files array to the request
        files.forEach((devPath, index) => {
            formData.append(`files[]`, devPath);
        });

        return apiClient.post("/user/support/ticket/conversation/send-message", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    } else {
        throw new Error("No token found. Please log in.");
    }
};


// Get Dashboard Data API (get)
export const getDashboardDataAPI = () => {
    const token = getToken();
    if (token) {
        return apiClient.get("/user/dashboard/get", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        throw new Error('No token found. Please log in.');
    }
};


// Fetch Basic Settings API (get)
export const getBasicSettingsAPI = () => {
    return apiClient.get('/settings/basic-settings');
};


// Send OTP Verification API (post)
export const sendOtpVerificationAPI = (credentials) => {
    return apiClient.post("/password/forgot/find/user", { credentials });
};


// Resend Verification Code API (get)
export const resendVerificationCodeAPI = (token) => {
    return apiClient.get(`/password/forgot/resend/code`, {
        params: { token }
    });
};


// Verify OTP API (post)
export const verifyOtpAPI = (token, code) => {
    return apiClient.post("/password/forgot/verify/code", {
        token, code
    });
};


// Reset Password API (post)
export const resetPasswordAPI = (token, password, passwordConfirmation) => {
    return apiClient.post("/password/forgot/reset", {
        token,
        password,
        password_confirmation: passwordConfirmation
    });
};


// Update Password API (post)
export const updatePasswordAPI = (currentPassword, newPassword, passwordConfirmation) => {
    const token = getToken();
    if (token) {
        return apiClient.post("/user/profile/password/update", {
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: passwordConfirmation
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        throw new Error("No token found. Please log in.");
    }
};


// Authorization API (post)
export const authorizationCodeAPI = (token, code) => {
    return apiClient.post("/authorize/mail/verify/code", {
        token,
        code
    });
};

// 2FA API (post)
export const twoFactorVerifyAPI = (code) => {
    const token = getToken();
    if (token) {
        return apiClient.post("/authorize/google/2fa/verify", {
            code
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        throw new Error("No token found. Please log in.");
    }
};

// Resend Authorization Code API (get)
export const resendAuthorizationCodeAPI = (token) => {
    return apiClient.get(`/authorize/mail/resend/code`, {
        params: { token },
    });
};


// Google Social Auth API (post)
export const googleSocialAuthAPI = (customRedirectUrl) => {
    const formData = new FormData();
    formData.append("redirect_url", customRedirectUrl);
    return apiClient.post("/user/social/auth/redirect/google", formData);
}

// Google Social Response API (post)
export const googleSocialResponseAPI = (data) => {
    return apiClient.post("/user/social/auth/redirect/response/google", data);
};


// Mark Ticket as Solved API (post)
export const markTicketAsSolvedAPI = (tokenData) => {
    const token = getToken();
    if (token) {
        return apiClient.post("/user/support/ticket/mark-solve", { token: tokenData }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        throw new Error("No token found. Please log in.");
    }
};


// Installations Store API (post)
export const installationStore = (installationID) => {
    const token = getToken();
    if (token) {
        return apiClient.post("/user/installations/store", { installation_id: installationID }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        throw new Error("No token found. Please log in.");
    }
};

// Get Installations API (get)
export const getInstallationAPI = (page = 1) => {
    const token = getToken();
    if (token) {
        return apiClient.get(`/user/installations/get?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        throw new Error("No token found. Please log in.");
    }
};


// Fetch Installations conversation data API (get)
export const getInstallationsConversationDataAPI = (id) => {
    const token = getToken();
    if (token) {
        return apiClient.get(`/user/installations/conversation/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        throw new Error("No token found. Please log in.");
    }
};


// Installation Send Message API (post)
export const installationSendMessageAPI = (installationToken, message, files = []) => {
    const token = getToken();
    if (token) {
        const formData = new FormData();
        formData.append("token", installationToken);
        formData.append("message", message);

        // Add files array to the request
        files.forEach((devPath) => {
            formData.append(`files[]`, devPath);
        });

        return apiClient.post("/user/installations/conversation/send-message", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            },
        );
    } else {
        throw new Error("No token found. Please log in.");
    }
};


// Google Social Auth API (post)
export const envatoSocialAuthAPI = (customRedirectUrl) => {
    const formData = new FormData();
    formData.append("redirect_url", customRedirectUrl);
    return apiClient.post("/user/social/auth/redirect/envato", formData);
}


// Google Social Response API (post)
export const envatoSocialResponseAPI = (data) => {
    return apiClient.post("/user/social/auth/redirect/response/envato", data);
};


// File Remove API (post)
export const removeFileAPI = (path) => {
    return apiClient.post("/conversation/file/remove", { path });
};

// Fetch Resources API (get)
export const getResourcesAPI = () => {
    return apiClient.get('/support/ticket/get-resources');
};

// Store Support Ticket API (post)
export const storeSupportTicketAPI = (formData) => {
    const token = getToken();
    if (token) {
        return apiClient.post("/user/support/ticket/store", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    } else {
        throw new Error("No token found. Please log in.");
    }
};

// Validate Purchase Code API (POST) - v2
export const validatePurchaseCodeAPI = (purchaseCode) => {
    return apiClientBase.post("/validate/purchase-code", { purchase_code: purchaseCode });
};

// Create Customization API (post)
export const createCustomizationAPI = (formData) => {
    return apiClient.post("/customization/store", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Generate Product Key API (post)
export const generateProductKeyAPI = (formData) => {
    return apiClient.post("/product-key/store", formData);
};

// Google Recaptcha VerificationAPI API (post)
export const recaptchaVerificationAPI = (token) => {
    return apiClient.post("/security/google/verify-recaptcha", { token: token });
};

// Newsletter Subscribe API (post)
export const newsletterSubscribeAPI = (formData) => {
    return apiClientBase.post("/newsletter/store", formData);
};

// Fetch featured products API (get)
export const getFeaturedProductsAPI = () => {
    return apiClient.get('/products/envato/featured-products');
};

// Fetch featured products API (get)
export const getEnvatoCategoriesAPI = () => {
    return apiClient.get('/products/envato/categories');
};

// Fetch Products API (get)
export const getProductsAPI = (pageSize, currentPage, searchQuery, queryParams) => {
    return apiClient.get(`/products/envato?page_size=${pageSize}&page=${currentPage}&term=${searchQuery}${queryParams}`);
};

// Fetch Blog Categories API (get)
export const getBlogCategoriesAPI = (language) => {
    return apiClient.get(`/blogs/categories?local=${language}`);
};

// Fetch Blogs API (get)
export const getBlogsAPI = (language, currentPage, selectedCategory, searchQuery) => {
    return apiClient.get(`/blogs?local=${language}&page=${currentPage}&category=${selectedCategory}&search=${searchQuery}`);
};

// Fetch Blog Details API (get)
export const getBlogDetailsAPI = (slug, language) => {
    return apiClient.get(`/blogs/details/${slug}?lang=${language}`);
};

// Fetch Gateway Info API (get)
export const getGatewayInfoAPI = () => {
    return apiClient.get("/installation/gateway-info");
};

// Installation Update API (post)
export const installationUpdateAPI = (trxRef, quantity, couponCode, buyerMail) => {
    return apiClient.post(`/installation/update/${trxRef}`, {
        qty: quantity,
        coupon_code: couponCode,
        ...(buyerMail &&
            {buyer_mail: buyerMail}
        ),
    });
};

// Installation Get API (get)
export const installationGetAPI = (trxRef) => {
    return apiClient.get(`/installation/get/${trxRef}`);
};