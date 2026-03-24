export const getCookie = (name, defaultValue = '') => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift() || defaultValue;
};

export const setCookie = (key, value, options = {}) => {
    let cookieString = `${key}=${value}; path=/; SameSite=Strict`;
    
    // Only add Secure if explicitly requested and on HTTPS
    if (options.secure && typeof window !== 'undefined' && window.location.protocol === 'https:') {
        cookieString += '; Secure';
    }
    
    if (options.expires) {
        const expires = new Date(Date.now() + options.expires * 864e5).toUTCString();
        cookieString += `; expires=${expires}`;
    }
    document.cookie = cookieString;
}


export const removeCookie = (name) => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
