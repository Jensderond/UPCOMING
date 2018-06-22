export function isLoggedIn(): boolean {
    const jwt = localStorage.getItem("jwtToken");
    if ( jwt !== null && jwt !== "" ){
        return true;
    }
    return false;
}

export function logOut(): void {
    localStorage.removeItem("jwtToken");
}