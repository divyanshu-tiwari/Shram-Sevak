import "./unauthorized.css"

export const Unauthorized = () => {
    return (
        <>
        <div className="AppUN">
             <body>
                <div class="error-container">
                    <div class="error-icon">&#9888;</div>
                    <div class="error-title">ERROR 401 - Unauthorized!</div>
                    <div class="error-message">You do not have permission to access this page.</div>
                    <a href="/" class="back-link">Go back to the homepage</a>
                </div>
             </body>
        </div>
            
        </>
    )
}