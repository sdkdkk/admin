export function logoutIfInvalidToken(errorMessage) {
    const { error } = errorMessage.data
    if (error.toLowerCase().includes("token")) {
        console.log('Invalid token detected, logging out...');
        window.location.replace("/logout");
    }
}