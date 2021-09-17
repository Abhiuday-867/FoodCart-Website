import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isCode = (value) => value.trim().length === 6;
const Checkout = (props) => {
  const [forminputvalidity, setforminputvalidity] = useState({
    name: true,
    postalcode: true,
    city: true,
    street: true,
  });
  const NameRef = useRef();
  const StreetRef = useRef();
  const PostalRef = useRef();
  const CityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const EnteredName = NameRef.current.value;
    const EnteredStreet = StreetRef.current.value;
    const EnteredPostal = PostalRef.current.value;
    const EnteredCity = CityRef.current.value;

    const NameValidity = !isEmpty(EnteredName);
    const StreetValidity = !isEmpty(EnteredStreet);
    const PostalValidity = isCode(EnteredPostal);
    const CityValidity = isEmpty(EnteredCity);

    setforminputvalidity({
      name: NameValidity,
      postalcode: PostalValidity,
      city: CityValidity,
      street: StreetValidity,
    });
    const FormValidity =
      NameValidity && StreetValidity && PostalValidity && CityValidity;
    if (!FormValidity) {
      return;
    }
  };
  const nameClasses = `${classes.control} ${
    !forminputvalidity.name ? classes.invalid : ""
  }`;
  const postalcodeClasses = `${classes.control} ${
    !forminputvalidity.postalcode ? classes.invalid : ""
  }`;
  const cityClasses = `${classes.control} ${
    !forminputvalidity.city ? classes.invalid : ""
  }`;
  const streetClasses = `${classes.control} ${
    !forminputvalidity.street ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={NameRef} />
        {!forminputvalidity.name && <p>Enter a valid name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={StreetRef} />
        {!forminputvalidity.street && <p>Enter a valid street</p>}
      </div>
      <div className={postalcodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={PostalRef} />
        {!forminputvalidity.postalcode && <p>Enter a valid postalcode</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={CityRef} />
        {!forminputvalidity.street && <p>Enter a valid Street</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
