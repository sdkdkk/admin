export function logoutIfInvalidToken(errorMessage) {
    const { error } = errorMessage.data
    if (error.toLowerCase().includes("token")) {
        // window.location.replace("/logout");
    }
}