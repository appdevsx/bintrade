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
export const loginAPI = (email, password) => {
    return apiClient.post('/login', { email, password },);
};

// Register API (post)
export const registerAPI = (formData) => {
    return apiClient.post('/register', formData);
};

// Logout API (post)
export const logoutAPI = () => {
    const token = getToken();
    if (token) {
        return apiClient.post('/user/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        throw new Error('No token found. Please log in.');
    }
};

// Get User Data API (get)
export const getUserDataAPI = () => {
    const token = getToken();
    if (token) {
        return apiClient.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        throw new Error('No token found. Please log in.');
    }
};

// User Data Update API (put)
export const userDataUpdateAPI = (formData) => {
    const token = getToken();
    if (token) {
        return apiClient.post("/user/profile/update", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    } else {
        throw new Error("No token found. Please log in.");
    }
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
export const sendOtpVerificationAPI = (email) => {
    return apiClient.post("/password/forgot/find/user", { email });
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


// Update Password API (put)
export const updatePasswordAPI = (currentPassword, newPassword, passwordConfirmation) => {
    const token = getToken();
    if (token) {
        return apiClient.put("/user/profile/password-update", {
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
    return apiClient.post("/user/authorization/verify/code", {
        token,
        code
    });
};

// Resend Authorization Code API (get)
export const resendAuthorizationCodeAPI = (token) => {
    return apiClient.get(`/user/authorization/resend/code`, {
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