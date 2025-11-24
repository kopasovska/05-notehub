import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div className={css.errorMessageWrapper}>
      <p className={css.errorMessage}>
        Oops... Something went wrong! Try again later!
      </p>
    </div>
  );
}
