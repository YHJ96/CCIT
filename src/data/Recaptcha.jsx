import React, { PureComponent } from "react";
import ReCAPTCHA from "react-google-recaptcha";

//"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
const GOOGLE_CAPTCHA_KEY = '6LdjD6kaAAAAAA6FDkbni7AX8VTjRcdPkkeFQfon'

class Recaptcha extends PureComponent {

  componentDidMount() {
    const { reCaptchaGet } = this.props;
    reCaptchaGet();
  }

  render() {
    console.log('Recaptcha');
    const { 
      reCaptchaLoad,
      handleChange,
      asyncScriptOnLoad,
      reCaptchaRef,
     } = this.props || {};
    return (
      <>
        {reCaptchaLoad && (
          <ReCAPTCHA
            ref={reCaptchaRef}
            sitekey={GOOGLE_CAPTCHA_KEY}
            onChange={handleChange}
            asyncScriptOnLoad={asyncScriptOnLoad}
          />
        )}
        </>
    );
  }
}

export default Recaptcha;