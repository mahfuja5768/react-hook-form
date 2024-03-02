import { useFieldArray, useForm } from "react-hook-form";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: "socials",
    control,
  });

  const submitForm = (formData) => {
    console.log(formData);
    const user = { email: "asd@a.com", password: "12345678" };
    const found =
      formData.email === user.email && formData.password === user.password;
    if (!found) {
      setError("root.random", {
        message: `User with email '${formData.email}' is not found`,
        type: "random",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-12">
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldSet label="Enter Yours Details">
          <Field label="Email" error={errors.email}>
            <input
              {...register("email", { required: "Email is required." })}
              className={`p-2 border box-border w-[300px] rounded-md ${
                !!errors.email ? "border-red-500" : "border-gray-200"
              }`}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
            />
          </Field>
          <Field label="Password" error={errors.password}>
            <input
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "Yous password must be at least 8 characters!",
                },
              })}
              className={`p-2 border box-border w-[300px] rounded-md ${
                !!errors.password ? "border-red-500" : "border-gray-200"
              }`}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
            />
          </Field>
          <Field label="Full Name" error={errors.fName}>
            <input
              {...register("fName", {
                required: "Full Name is required.",
              })}
              className={`p-2 border box-border w-[300px] rounded-md ${
                !!errors.fName ? "border-red-500" : "border-gray-200"
              }`}
              type="text"
              name="fName"
              id="fName"
              placeholder="Enter your full name"
            />
          </Field>

          <Field label="Age" error={errors.age}>
            <input
              {...register("age", {
                required: "Age is required.",
                max: {
                  value: 100,
                  message: "Age must be between 0 to 100",
                },
              })}
              className={`p-2 border box-border w-[300px] rounded-md ${
                !!errors.age ? "border-red-500" : "border-gray-200"
              }`}
              type="number"
              name="age"
              id="age"
              placeholder="Enter your Age"
            />
          </Field>
        </FieldSet>

        <FieldSet label="Enter Social Handles">
          {fields.map((field, idx) => {
            return <div key={field.id} className="">
                {field}
            </div>;
          })}
          <button
            className="mt-8 text-md text-white cursor-pointer border rounded-lg bg-gray-500 p-1 m-auto"
            onClick={() => append({ name: "", url: "" })}
          >
            Add A Social Handle
          </button>
        </FieldSet>

        <div>{errors?.root?.random?.message}</div>
        <Field>
          <button className=" text-md text-white text-md cursor-pointer p-1 border rounded-lg bg-purple-500 m-auto">
            Register{" "}
          </button>
        </Field>
      </form>
    </div>
  );
}
