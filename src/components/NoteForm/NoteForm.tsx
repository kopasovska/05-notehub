import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import { useId } from "react";
import { NoteTag } from "../../types/note";
import * as Yup from "yup";

interface NoteFormProps {
  onSubmit: (values: FormValues) => void;
  onClose: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialValues: FormValues = {
  title: "Add note title...",
  content: "Add note description...",
  tag: NoteTag.Todo,
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required()
    .min(3, "Title must have at least 3 characters.")
    .max(50, "Title must have less then 50 characters."),
  content: Yup.string().max(500, "Max limit 500 characters is reached!"),
  tag: Yup.string()
    .oneOf(
      [
        NoteTag.Todo,
        NoteTag.Personal,
        NoteTag.Work,
        NoteTag.Meeting,
        NoteTag.Shopping,
      ],
      "Invalid tag selected"
    )
    .required("Tag is required"),
});

export default function NoteForm({ onSubmit, onClose }: NoteFormProps) {
  const fieldId = useId();

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    onSubmit(values);
    actions.resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className={css.form}
    >
      <Form>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value={NoteTag.Todo}>Todo</option>
            <option value={NoteTag.Work}>Work</option>
            <option value={NoteTag.Personal}>Personal</option>
            <option value={NoteTag.Meeting}>Meeting</option>
            <option value={NoteTag.Shopping}>Shopping</option>
            <option value="error">Error</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
