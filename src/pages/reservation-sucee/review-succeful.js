import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";



const ReviewSuccessful = () => {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    useEffect(() => {
        const timer = setTimeout(() => {
            history.push(
                `/trips`
            );
        }, 2000);
        
        // return () => clearInterval(interval);
    }, []);
    return <>
        <div className="row d-flex flex-row justify-content-center">
            <div className="rsp-card text-center" >
                <div style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto" }}>
                    <i className="checkmark rsp-i">✓</i>
                </div>
                <h1 className="rsp-h1">{t("Review Successful")}</h1>
                
                
            </div>
        </div>
    </>;

}

export default ReviewSuccessful;